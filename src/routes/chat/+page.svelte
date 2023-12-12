<script lang="ts">
	interface ISuggestionsResult {
		id: number;
		text: string;
		similarity: number;
	}
	interface IAIReuslt {
		answer: string;
		gotFromCache: boolean;
	}

	let suggestionsRequest = {
		request: '',
		length: 3
	};
	let aiRequest = {
		prompt: '',
		similarity: 1
	};

	let suggestionsResult: ISuggestionsResult[] = [];
	let aiResult: IAIReuslt;
	let isSuggestionLoading = false;
	let isGtpRequestLoading = false;
	let showSuggestionsResult = false;

	async function handleSuggestionsRequest() {
		isSuggestionLoading = true;
		try {
			const response = await fetch('https://localhost:7253/Sequences/similar/suggestions', {
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

	async function handleGtpRequest() {
		try {
			isGtpRequestLoading = true;
			const response = await fetch('https://localhost:7253/Broker/chat-gpt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: suggestionsRequest.request,
					similarity: aiRequest.prompt
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
</script>

<h1>COLLM communication</h1>

<form on:submit|preventDefault={handleSuggestionsRequest}>
	<label for="prompt">Enter a prompt:</label>
	<input
		type="text"
		id="prompt"
		bind:value={suggestionsRequest.request}
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
				<li>{item.text} (similarity = {item.similarity})</li>
			{/each}
		</ul>
	</div>

	<form on:submit|preventDefault={handleGtpRequest}>
		<button type="submit" disabled={isGtpRequestLoading}>
			{isGtpRequestLoading ? 'Loading...' : 'Suggestions do not match request'}
		</button>
		<span>{aiResult.answer}</span>
	</form>
{/if}
