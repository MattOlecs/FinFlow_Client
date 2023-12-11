<script lang="ts">
	interface ResultItem {
		id: number;
		text: string;
		similarity: number;
	}
	let prompt = {
		request: '',
		length: 3
	};
	let result: ResultItem[] = [];
	let isLoading = false;

	async function handleSubmit() {
		isLoading = true;
		try {
			const requestData = {
				request: prompt.request,
				length: prompt.length
			};

			const response = await fetch('https://localhost:7253/Sequences/similar/suggestions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ request: prompt.request, length: prompt.length })
			});

			if (response.ok) {
				result = await response.json();
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<h1>COLLM communication</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label for="prompt">Enter a prompt:</label>
	<input type="text" id="prompt" bind:value={prompt.request} placeholder="Type your prompt here" />
	<button type="submit" disabled={isLoading}>
		{isLoading ? 'Loading...' : 'Submit'}
	</button>
</form>

{#if result.length > 0}
	<div>
		<h2>Did you mean?:</h2>
		<ul>
			{#each result as item (item)}
				<li>{item.text} (similarity = {item.similarity})</li>
			{/each}
		</ul>
	</div>
{/if}
