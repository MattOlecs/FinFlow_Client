<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { GridApi, createGrid } from 'ag-grid-community';
	import type { GridOptions } from 'ag-grid-community';
	import '@ag-grid-community/styles/ag-grid.css';
	import '@ag-grid-community/styles/ag-theme-alpine.css';
	import '@ag-grid-community/styles/ag-theme-quartz.css';
	import dataStoreInstance, { type GridData } from '$lib/data/dataStore';

	let gridDiv: HTMLDivElement;
	export let gridApi: GridApi;

	const columnDefs = [
		{ headerName: 'Description', field: 'Description', filter: true },
		{ headerName: 'Category', field: 'Category' },
		{ headerName: 'Type', field: 'Type' },
		{ headerName: 'Amount', field: 'Amount' }
	];

	let gridOptions: GridOptions = {
		columnDefs,
		rowData: []
	};

	async function initializeGridData() {
		const rowData = await dataStoreInstance.getGridData();
		console.log("2 --" + rowData[0].Amount);
		gridOptions.rowData = rowData;
		gridApi = createGrid(gridDiv, gridOptions);
		gridApi.sizeColumnsToFit();
	}

	export async function refreshGrid(): Promise<void> {
		let data = await dataStoreInstance.getGridData();
		console.log("1 " + data);
        gridOptions.rowData = data
		gridApi.updateGridOptions(gridOptions);
    }

	onMount(() => {
		initializeGridData(); 
	});

	onDestroy(() => {
		if (gridApi) {
			gridApi.destroy();
		}
	});
</script>

<div class="ag-theme-quartz" bind:this={gridDiv} style="height: 500px; width: 100%"></div>
