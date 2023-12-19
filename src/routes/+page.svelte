<script lang="ts">
	import ChartsGrid, { addChart } from '$lib/grid/grid.svelte';
	import { ChartType, type ChartDefinition } from '$lib/grid/grid.svelte';
	import DataGrid from '$lib/data-grid/data-grid.svelte';

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

<DataGrid />
