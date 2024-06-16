<script lang="ts">
	import raportGenerator from '$lib/data/raportGenerator';

	interface ISuggestionsResult {
		id: number;
		text: string;
		response: string,
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

	interface ICreateChatResponse {
		uId: string;
		response: string;
	}
	
	let suggestionsResult: ISuggestionsResult[] = [];
	let message = "";
	let messages: IMessage[] = [];
	let chatUid = "";
	let selectedSuggestionId = 0;
	let suggestionValue = '';

	let aiPrompt = "Jesteś doradcą finansowym w aplikacji. Będzie teraz prowadził rozmowę z użytkownikiem na podstawie jego raportu wydatków i przychodów za wskazany miesiąc. Nie możesz rozmawiać na inne tematy niż porady finansowe. Jako odpowiedź na to pytanie, oceń jego raport wydatków. Nie odnoś się do tej wstępnej instrukcji. Oto raport: "

	let isInFirstAnswer: boolean = true;
	let isInSuggestionMode: boolean = false;
	let isInGptMode: boolean = false;
  
	async function sendMessage() {
	  	if (!isInFirstAnswer && message.trim() === "") return;
  
		if (isInFirstAnswer) {
			let chatResponse = await createConveration(raportGenerator.getRaport())
			console.log('uiud:  ' + chatResponse!.uId)
			chatUid = chatResponse!.uId;
			messages = [...messages, { text: chatResponse!.response, sender: "api" }];
			isInFirstAnswer = false;
		}
		else{
			const userMessage = { text: message, sender: "user" };
			messages = [...messages, userMessage];
		
			let response = await getConversationAnswer(message);
			console.log('response:  ' + response)
			messages = [...messages, { text: response, sender: "api" }];
		}
		
		message = ""; // Reset input after sending
	}

	async function getSuggestions() {
	  	if (!isInFirstAnswer && message.trim() === "") return;
  
		await fetchSuggestions(message);
	}

	async function selectSuggestion(id: number) {
		if (selectedSuggestionId == id){
			selectedSuggestionId = 0;
			return;
		}
		selectedSuggestionId = id;
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

	async function fetchSuggestions(userMessage: string): Promise<ISuggestionsResult[] | undefined> {
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
	  }
	  return undefined;
	}

	async function createConveration(userMessage: string): Promise<ICreateChatResponse | undefined>  {
	  	try {
			const response = await fetch('http://localhost:5295/Chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					context: aiPrompt,
					firstMessage: userMessage
				})
			});

			if (response.ok) {
				return await response.json();
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error("Error fetching API:", error);
	  }
	
	  return undefined;
	}

	async function getConversationAnswer(userMessage: string): Promise<string> {
	  	try { 
			const response = await fetch('http://localhost:5295/Chat/' + chatUid, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: userMessage
				})
			});

			if (response.ok) {
				return await response.text();
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error("Error fetching API:", error);
	  }
	
	  return "";
	}

	async function getSuggestion(id: number): Promise<string> {
		try { 
			const response = await fetch('http://localhost:5295/Sentences/' + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				let result = await response.json();
				return result.text;
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error("Error fetching API:", error);
	  }
	
	  return "";
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
			disabled={isInFirstAnswer}
			type="text"
			bind:value={message}
			on:keydown={e => e.key === 'Enter' && sendMessage()}
		/>
		<button on:click={sendMessage}>{isInFirstAnswer ? "Start conversation" : "Send"}</button>
		<button on:click={getSuggestions}>Get suggestions</button>
	</div>
	<ul>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#each suggestionsResult as item}
		<li on:click={async () => await selectSuggestion(item.id)} style="cursor: pointer;">
			&#x2022; {item.text}
		</li>
		{#if item.id == selectedSuggestionId}
		<div class="detail">
			{item.response}
		</div>	
		{/if}
	  	{/each}
	</ul>
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
  	.detail {
		margin-top: 8px;
		background-color: #f0f0f0;
		padding: 10px;
		border-radius: 5px;
		color: black;
		transition: ease-in-out;
  	}
	li {
		color: black;
	}
</style>
  