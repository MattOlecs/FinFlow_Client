<!-- AddExpenditure.svelte -->
<script lang="ts">
	import dataStoreInstance from '$lib/data/dataStore';
	export let actionOnsubmit: () => void;

	let showModal = false;
	let description = '';
	let type = '';
	let amount = '';
	let customCategoryEnabled = false;
	
	
	const types = ['Wydatek', 'Przychód'];
	let categories = dataStoreInstance.getCategories()

	let category = categories[0];

	function submitForm() {
		console.log({ description, category, type, amount });
		showModal = false;

		if (categories.find(x => x == category) == null){
			dataStoreInstance.addCategory(category)
		}

		dataStoreInstance.addGridData({Description: description, Category: category, Type: type, Amount: +amount})
		actionOnsubmit();
	}
</script>

<div class="add-button">
	<button on:click={() => (showModal = true)}> + </button>
</div>

{#if showModal}
	<div class="modal">
		<div class="modal-content">
			<span class="close-button" on:click={() => (showModal = false)}>&times;</span>
			<form on:submit|preventDefault={submitForm}>
				<label for="description">Description</label>
				<input id="description" type="text" bind:value={description} />

                <label for="category">Category</label>
                {#if !customCategoryEnabled}
                    <select id="category" bind:value={category}>
                        {#each categories as cat}
                            <option value={cat}>{cat}</option>
                        {/each}
                    </select>
                {:else}
                    <input id="category" type="text" bind:value={category} />
                {/if}
                <label>
                    <input type="checkbox" bind:checked={customCategoryEnabled} />
                    Custom Category
                </label>

				<label for="type">Type</label>
				<select id="type" bind:value={type}>
					{#each types as t}
						<option value={t}>{t}</option>
					{/each}
				</select>

				<label for="amount">Amount</label>
				<input id="amount" type="text" pattern="\d+(\.\d{1,2})?" bind:value={amount} />

				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
{/if}

<style>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000; /* Ensure it's above other content */
}

.modal-content {
	background: white;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	color: black;
	z-index: 1001; /* Above the modal overlay */
	display: flex; /* Added to ensure flex container for vertical layout */
	flex-direction: column; /* Stack children vertically */
}

.close-button {
	cursor: pointer;
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 1.5em;
}

.add-button {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-top: 1%;
	}

button, input, select, label {
	display: block; /* Ensure each element appears on its own line */
	width: 100%; /* Take the full width of the container */
	margin-top: 8px; /* Add space between elements */
}

input[type="checkbox"] {
	display: inline-block; /* Keep checkbox inline with its label */
	width: auto; /* Prevent the checkbox from taking the full width */
	margin-top: 0; /* Align better with its label */
}

button {
		/* Adjust these styles as needed */
		padding: 10px 15px; /* Give some padding inside the button */
		border: none; /* Remove default border */
		background-color: #b6b5b588; /* Example button color, change as needed */
		color: black; /* Text color inside the button */
		border-radius: 20px; /* This gives the button rounded edges */
		cursor: pointer; /* Changes the cursor on hover */
		outline: none; /* Removes the outline on focus for aesthetic purposes */
		font-size: 1.3em; /* Set the font size as needed */
	}

button:hover {
	background-color: #b6b5b5; /* Darker shade on hover for visual feedback */
}
</style>
