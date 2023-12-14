<script lang="ts" context="module">
	import { BarChartSimple, DonutChart, type ChartTabularData } from '@carbon/charts-svelte';
	import type { BaseChartOptions } from '@carbon/charts';
	import type { SvelteComponent, SvelteComponentTyped } from 'svelte';

	export enum ChartType {
		Donut,
		Bar
	}

	export interface ChartDefinition {
		ChartType: ChartType;
		Data: ChartTabularData;
	}

	let chartsDefinitions: ChartDefinition[] = [];

	export function addChart(chartDef: ChartDefinition) {
		console.log(chartDef);
		chartsDefinitions = [...chartsDefinitions, chartDef];
		console.log(chartsDefinitions);
	}

	function generateChartType(chartDef: ChartDefinition) {
		console.log('jestem tu');
		switch (chartDef.ChartType) {
			case ChartType.Donut:
				return DonutChart;

			case ChartType.Bar:
				return BarChartSimple;
			default:
				return undefined;
		}
	}

	function generateChartOptions(chartDef: ChartDefinition): BaseChartOptions {
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
</div>

<!-- <div class="chart-container">
	{#each chartsDefinitions as chart}
		<div class="chart-container">
			<svelte:component
				this={generateChartType(chart)}
				data={chart.Data}
				options={generateChartOptions(chart)}
			/>
		</div>
	{/each}
</div> -->

<p>{chartsDefinitions}</p>

<style>
	@import 'grid.css';
</style>
