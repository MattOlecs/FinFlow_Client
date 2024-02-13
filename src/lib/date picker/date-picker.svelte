<script lang="ts">
	export let initialYear = new Date().getFullYear();
	export let initialMonth = new Date().getMonth();
	export let yearRange = 20; // Default range of years to display

	let years = Array.from({ length: yearRange }, (_, i) => initialYear - i);
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let selectedMonth = initialMonth;
	let selectedYear = initialYear;

	function navigateMonth(direction: String) {
		if (direction === 'next') {
			if (selectedMonth === 11) {
				selectedMonth = 0;
				navigateYear('next');
			} else {
				selectedMonth++;
			}
		} else if (direction === 'prev') {
			if (selectedMonth === 0) {
				selectedMonth = 11;
				navigateYear('prev');
			} else {
				selectedMonth--;
			}
		}
	}

	function navigateYear(direction: String) {
		if (direction === 'next') {
			selectedYear++;
		} else if (direction === 'prev') {
			selectedYear--;
		}
	}
</script>

<div class="date-picker-main">
	<button on:click={() => navigateMonth('prev')}>{'<'}</button>
	<select bind:value={selectedMonth}>
		{#each months as month, index}
			<option value={index}>{month}</option>
		{/each}
	</select>
	<select bind:value={selectedYear}>
		{#each years as year}
			<option value={year}>{year}</option>
		{/each}
	</select>
	<button
		on:click={() => navigateMonth('next')}
		disabled={selectedYear == initialYear && selectedMonth == 11}>{'>'}</button
	>
</div>

<svelte:component this={null} bind:selectedMonth bind:selectedYear />

<style>
	@import 'date-picker.css';
</style>
