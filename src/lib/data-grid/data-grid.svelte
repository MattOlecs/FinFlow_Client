<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { GridApi, createGrid } from 'ag-grid-community';
	import type { GridOptions } from 'ag-grid-community';
	import '@ag-grid-community/styles/ag-grid.css';
	import '@ag-grid-community/styles/ag-theme-alpine.css';
	import '@ag-grid-community/styles/ag-theme-quartz.css';

	let gridDiv: HTMLDivElement;
	let gridApi: GridApi;

	const columnDefs = [
		{ headerName: 'Description', field: 'description', filter: true },
		{ headerName: 'Category', field: 'category' },
		{ headerName: 'Type', field: 'type' },
		{ headerName: 'Amount', field: 'amount' }
	];

	const rowData = [
		{ description: 'Groceries', category: 'Basic expanses', type: 'Expenditure', amount: 240.16 },
		{ description: 'University tuition', category: 'Education', type: 'Expenditure', amount: 2000 },
		{ description: 'Paycheck', category: 'Basic income', type: 'Income', amount: 6598.34 },
		{
			description: 'Car payment',
			category: 'Car and transportation',
			type: 'Expenditure',
			amount: 829.22
		}
	];

	let gridOptions: GridOptions = {
		columnDefs,
		rowData
		// Add other grid options as needed
	};

	onMount(() => {
		gridApi = createGrid(gridDiv, gridOptions);
		gridApi.sizeColumnsToFit();
	});

	onDestroy(() => {
		if (gridApi) {
			gridApi.destroy();
		}
	});
</script>

<div class="ag-theme-quartz-dark" bind:this={gridDiv} style="height: 500px; width: 100%"></div>
