<script lang="ts">
	import ChartsGrid, { addChart } from '$lib/grid/grid.svelte';
	import { ChartType, type ChartDefinition } from '$lib/grid/grid.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { GridApi, createGrid } from 'ag-grid-community';
	import type { GridOptions } from 'ag-grid-community';
	import '@ag-grid-community/styles/ag-grid.css';
	import '@ag-grid-community/styles/ag-theme-alpine.css';
	import '@ag-grid-community/styles/ag-theme-quartz.css';

	let gridDiv: HTMLDivElement;
	let gridApi: GridApi;

	const columnDefs = [
		{ headerName: 'Make', field: 'make' },
		{ headerName: 'Model', field: 'model' },
		{ headerName: 'Price', field: 'price' }
	];

	const rowData = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 72000 }
	];

	let gridOptions: GridOptions = {
		columnDefs,
		rowData
		// Add other grid options as needed
	};

	onMount(() => {
		gridApi = createGrid(gridDiv, gridOptions);
	});

	onDestroy(() => {
		if (gridApi) {
			gridApi.destroy();
		}
	});

	let gridComponent: ChartsGrid;
	let data = [
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	];

	function addDonutChart() {
		addChart({ ChartType: ChartType.Donut, Data: data });
	}

	function addBarChart() {
		addChart({ ChartType: ChartType.Bar, Data: data });
	}
</script>

<ChartsGrid bind:this={gridComponent} />

<button on:click|preventDefault={addDonutChart}>add donut</button>
<button on:click|preventDefault={addBarChart}>add bar</button>

<div
	class="ag-theme-quartz-auto-dark"
	bind:this={gridDiv}
	style="height: 500px; width: 600px;"
></div>
