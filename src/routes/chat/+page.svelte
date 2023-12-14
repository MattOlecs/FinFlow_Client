<script lang="ts">
	interface ISuggestionsResult {
		id: number;
		text: string;
		similarity: number;
	}
	interface IAIResult {
		answer: string;
		gotFromCache: boolean;
	}

	let suggestionsRequest = {
		request: '',
		length: 3
	};

	let suggestionsResult: ISuggestionsResult[] = [];
	let aiResult: IAIResult = {
		answer: '',
		gotFromCache: false
	};

	let isSuggestionLoading = false;
	let isGtpRequestLoading = false;
	let showSuggestionsResult = false;

	async function handleSuggestionsRequestAsync() {
		isSuggestionLoading = true;
		try {
			const response = await fetch('https://localhost:7253/Sentences/similar/suggestions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					request: suggestionsRequest.request,
					length: suggestionsRequest.length
				})
			});

			if (response.ok) {
				suggestionsResult = await response.json();
				showSuggestionsResult = true;
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isSuggestionLoading = false;
		}
	}

	async function handleGtpRequestAsync() {
		try {
			isGtpRequestLoading = true;
			const response = await fetch('https://localhost:7253/Broker/chat-gpt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: suggestionsRequest.request
				})
			});

			if (response.ok) {
				aiResult = await response.json();
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isGtpRequestLoading = false;
		}
	}

	async function getSuggestedAnswerAsync(item: ISuggestionsResult) {
		try {
			const response = await fetch(`https://localhost:7253/Sentences/${item.id}`, {
				method: 'GET'
			});

			let parsedResponse = await response.json();
			aiResult.answer = parsedResponse.text;
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<h1>COLLM communication</h1>

<form on:submit|preventDefault={handleSuggestionsRequestAsync}>
	<label for="prompt">Enter a prompt:</label>
	<input
		type="text"
		id="prompt"
		bind:value={suggestionsRequest.request}
		on:keypress={() => {
			showSuggestionsResult = false;
			suggestionsResult = [];
		}}
		placeholder="Type your prompt here"
	/>
	<button type="submit" disabled={isSuggestionLoading}>
		{isSuggestionLoading ? 'Loading...' : 'Submit'}
	</button>
</form>

{#if showSuggestionsResult}
	<div>
		<h2>Did you mean?:</h2>
		<ul>
			{#each suggestionsResult as item (item)}
				<li>
					<a href="/" on:click|preventDefault={() => getSuggestedAnswerAsync(item)}>
						{item.text} (similarity = {item.similarity})
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<form on:submit|preventDefault={handleGtpRequestAsync}>
		<button type="submit" disabled={isGtpRequestLoading}>
			{isGtpRequestLoading ? 'Loading...' : 'Suggestions do not match request'}
		</button>
	</form>

	<div>
		<h3>Answer:</h3>
		<span>{aiResult.answer}</span>
	</div>
{/if}
