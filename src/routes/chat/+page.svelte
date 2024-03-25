<script lang="ts">
	import raportGenerator from '$lib/data/raportGenerator';

	interface ISuggestionsResult {
	id: number;
	text: string;
	similarity: number;
	}

	interface IAIResult {
		answer: string;
		gotFromCache: boolean;
	}

	interface IMessage {
		text: string,
		sender: string
	}
	
	let suggestionsResult: ISuggestionsResult[] = [];
	let message = "";
	let messages: IMessage[] = [];

	let aiPrompt = "Jesteś doradcą finansowym w aplikacji. Będzie teraz prowadził rozmowę z użytkownikiem na podstawie jego raportu wydatków i przychodów za wskazany miesiąc. Nie możesz rozmawiać na inne tematy niż porady finansowe. Jako odpowiedź na to pytanie, oceń jego raport wydatków. Nie odnoś się do tej wstępnej instrukcji. Oto raport: "

	let isInFirstAnswer: boolean = true;
	let isInSuggestionMode: boolean = false;
	let isInGptMode: boolean = false;
  
	async function sendMessage() {
	  	if (message.trim() === "") return;
  
		if (isInFirstAnswer) {
			let chatGptResponse = fetchGptResponse(aiPrompt + raportGenerator.getRaport())
			messages = [...messages, { text: (await chatGptResponse).answer, sender: "api" }];
			isInFirstAnswer = false;
		}
		else{
			const userMessage = { text: message, sender: "user" };
			messages = [...messages, userMessage];
		
			const apiResponse = await fetchSuggestions(message);
		}
		
		message = ""; // Reset input after sending
	}
  

	async function fetchGptResponse(userMessage: string): Promise<IAIResult> {
		
		let aiResult;
		try {
			const response = await fetch('http://localhost:5295/Broker/chat-gpt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: userMessage
				})
			});

			if (response.ok) {
				aiResult = await response.json();
				return aiResult;
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		}

		return aiResult;
	}

	async function fetchSuggestions(userMessage: string) {
	  	try {
			const response = await fetch('http://localhost:5295/Sentences/similar/suggestions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					request: userMessage,
					length: userMessage.length
				})
			});

			if (response.ok) {
				suggestionsResult = await response.json();
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error("Error fetching API:", error);
			return "Failed to get response.";
	  }
	}
</script>
  
<main>
	<div class="chat-container">
		{#each messages as { text, sender }}
		<div class={sender}>
			{text}
		</div>
		{/each}
	</div>
	<div class="input-container">
		<input
			type="text"
			bind:value={message}
			on:keydown={e => e.key === 'Enter' && sendMessage()}
		/>
		<button on:click={sendMessage}>Send</button>
	</div>
</main>
  
<style>
	.chat-container {
		max-width: 100%;
		margin: 20px auto;
		padding: 10px;
		height: 300px;
		overflow-y: auto;
		color: black;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(201, 199, 199, 0.1);
		background-color: #b6b5b5;
	}
	.user {
		text-align: right;
		padding: 5px;
		margin: 2px;
		background-color: #f0f0f0;
		border-radius: 8px;
		width: 49%;
		margin-inline-start: auto;
	}
	.api {
		text-align: left;
		padding: 5px;
		margin: 2px;
		background-color: #d1e7dd;
		border-radius: 8px;
		width: 49%;
		margin-inline-end: auto;
	}
	.input-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input, button {
		margin: 10px 15px;
		padding: 10px;
		width: 75%;
	}
	button {
		width: 10%;
	}
</style>
  