<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { GridApi, createGrid } from 'ag-grid-community';
	import type { GridOptions } from 'ag-grid-community';
	import '@ag-grid-community/styles/ag-grid.css';
	import '@ag-grid-community/styles/ag-theme-alpine.css';
	import '@ag-grid-community/styles/ag-theme-quartz.css';
	import dataStoreInstance from '$lib/data/dataStore';

	let gridDiv: HTMLDivElement;
	export let gridApi: GridApi;

	const columnDefs = [
		{ headerName: 'Description', field: 'Description', filter: true },
		{ headerName: 'Category', field: 'Category' },
		{ headerName: 'Type', field: 'Type' },
		{ headerName: 'Amount', field: 'Amount' }
	];

	let rowData = dataStoreInstance.getGridData();
	let gridOptions: GridOptions = {
		columnDefs,
		rowData
		// Add other grid options as needed
	};

	export function refreshGrid(): void {
		let test = dataStoreInstance.getGridData();
        gridOptions.rowData = dataStoreInstance.getGridData();
		gridApi.updateGridOptions(gridOptions);
    }

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

<div class="ag-theme-quartz" bind:this={gridDiv} style="height: 500px; width: 100%"></div>
