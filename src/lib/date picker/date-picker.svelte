<script lang="ts">
	import { selectedYear, selectedMonth } from '../data/dateStore'; // Adjust the path as needed
	import { get } from 'svelte/store';

	export let initialYear = get(selectedYear);
	export let initialMonth = get(selectedMonth);
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

	function navigateMonth(direction: string) {
		if (direction === 'next') {
			if (get(selectedMonth) === 11) {
				selectedMonth.set(0);
				navigateYear('next');
			} else {
				selectedMonth.update(n => n + 1);
			}
		} else if (direction === 'prev') {
			if (get(selectedMonth) === 0) {
				selectedMonth.set(11);
				navigateYear('prev');
			} else {
				selectedMonth.update(n => n - 1);
			}
		}
	}

	function navigateYear(direction: string) {
		if (direction === 'next') {
			selectedYear.update(n => n + 1);
		} else if (direction === 'prev') {
			selectedYear.update(n => n - 1);
		}
	}

	// Subscribe to store changes to trigger a function when they change
	selectedYear.subscribe(value => {
		console.log('Year changed:', value);
		// Trigger your function here
	});

	selectedMonth.subscribe(value => {
		console.log('Month changed:', value);
		// Trigger your function here
	});
</script>

<div class="date-picker-main">
	<button on:click={() => navigateMonth('prev')}>{'<'}</button>
	<select bind:value={$selectedMonth}>
		{#each months as month, index}
			<option value={index}>{month}</option>
		{/each}
	</select>
	<select bind:value={$selectedYear}>
		{#each years as year}
			<option value={year}>{year}</option>
		{/each}
	</select>
	<button
		on:click={() => navigateMonth('next')}
		disabled={$selectedYear == initialYear && $selectedMonth == 11}>{'>'}</button>
</div>

<style>
	@import 'date-picker.css';
</style>
