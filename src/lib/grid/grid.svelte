<script lang="ts" context="module">
	import type { ChartTabularData } from '@carbon/charts-svelte';
	import type { BaseChartOptions } from '@carbon/charts';
	import { chartsDefinitions } from '../../stores/chartsStore';
	import '@carbon/charts-svelte/styles.css';

	export enum ChartType {
		Donut,
		Bar
	}

	export interface ChartDefinition {
		ChartType: ChartType;
		Data: ChartTabularData;
	}

	let data = [
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	];

	const chartsImport = await import('@carbon/charts-svelte');

	export function addChart(chartDef: ChartDefinition) {
		chartsDefinitions.console.log(chartDef);
		console.log(chartsDefinitions);
	}

	function generateChartType(chartDef: ChartDefinition) {
		console.log('jestem tu generateChartType');
		switch (chartDef.ChartType) {
			case ChartType.Donut:
				return chartsImport.DonutChart;

			case ChartType.Bar:
				return chartsImport.BarChartSimple;
			default:
				return chartsImport.DonutChart;
		}
	}

	function generateChartOptions(chartDef: ChartDefinition): BaseChartOptions {
		console.log('jestem tu generateChartOptions');
		switch (chartDef.ChartType) {
			case ChartType.Donut:
				return {
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
				};

			case ChartType.Bar:
				return {
					theme: 'g90',
					title: 'Simple bar (discrete)',
					height: '400px',
					axes: {
						left: { mapsTo: 'value' },
						bottom: { mapsTo: 'group', scaleType: 'labels' }
					}
				};

			default:
				return {};
				break;
		}
	}
</script>

<div class="grid-container">
	{#each chartsDefinitions as chart, i (i)}
		<div class="chart-container">
			<svelte:component
				this={generateChartType(chart)}
				data={chart.Data}
				options={generateChartOptions(chart)}
			/>
		</div>
	{/each}
</div>

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
				height: '400px',
				width: '400px',
				theme: 'g100'
			}}
		/>
	</div>
</div> -->

<style>
	@import 'grid.css';
</style>
