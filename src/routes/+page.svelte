<script lang="ts">
	import Grid, { addChart } from '$lib/grid/grid.svelte';
	import { ChartType, type ChartDefinition } from '$lib/grid/grid.svelte';
	import { onMount } from 'svelte';

	let gridComponent: Grid;
	// let addDonutChart:;
	// let addBarChart;

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

<Grid bind:this={gridComponent} />

<button on:click|preventDefault={addDonutChart}>add donut</button>
<button on:click|preventDefault={addBarChart}>add bar</button>

<!-- <div class="grid-container">
	<div class="chart-container">
		<BarChartSimple
			data={[
				{ group: 'Qty', value: 65000 },
				{ group: 'More', value: 29123 },
				{ group: 'Sold', value: 35213 },
				{ group: 'Restocking', value: 51213 },
				{ group: 'Misc', value: 16932 }
			]}
			options={{
				theme: 'g90',
				title: 'Simple bar (discrete)',
				height: '400px',
				axes: {
					left: { mapsTo: 'value' },
					bottom: { mapsTo: 'group', scaleType: 'labels' }
				}
			}}
		/>
	</div>

	<div class="chart-container">
		<DonutChart
			data={[
				{ group: 'Qty', value: 65000 },
				{ group: 'More', value: 29123 },
				{ group: 'Sold', value: 35213 },
				{ group: 'Restocking', value: 51213 },
				{ group: 'Misc', value: 16932 }
			]}
			options={{
				title: 'Donut',
				resizable: true,
				legend: {
					alignment: 'center'
				},
				donut: {
					center: {
						label: 'Browsers'
					},
					alignment: 'center'
				},
				height: '100%',
				width: '100%',
				theme: 'g100'
			}}
		/>
	</div>
</div> -->
