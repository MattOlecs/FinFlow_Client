<script lang="ts" context="module">
	import type { ChartTabularData } from '@carbon/charts-svelte';
	import { type BaseChartOptions, Alignments, ChartTheme } from '@carbon/charts';
	import { chartsDefinitions } from '../../stores/chartsStore';
	import '@carbon/charts-svelte/styles.css';

	export enum ChartType {
		Donut,
		Bar,
		Gauge
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
		chartsDefinitions.update((charts) => [...charts, chartDef]);
		console.log(chartsDefinitions);
	}

	export function refreshCharts(data: ChartTabularData) {
		chartsDefinitions.update(charts =>
			charts.map(chart => {
				if (chart.ChartType != ChartType.Gauge) {
					// Spread the chart object and update Data property
					return { ...chart, Data: data };
				} else {
					// Return the chart as is if the condition is not met
					return chart;
				}
			})
    );
}

	function generateChartType(chartDef: ChartDefinition) {
		switch (chartDef.ChartType) {
			case ChartType.Donut:
				return chartsImport.DonutChart;
			case ChartType.Bar:
				return chartsImport.BarChartSimple;
			case ChartType.Gauge:
				return chartsImport.GaugeChart;
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
						alignment: Alignments.CENTER
					},
					donut: {
						center: {
							label: 'Wydatki',
							numberFormatter: ((value) => value.toFixed(2) + " zł")
						},
						alignment: 'center'
					},
					height: '100%',
					width: '100%',
					theme: ChartTheme.WHITE
				};

			case ChartType.Bar:
				return {
					theme: ChartTheme.WHITE,
					title: 'Simple bar (discrete)',
					height: '400px',
					axes: {
						left: { mapsTo: 'value' },
						bottom: { mapsTo: 'group', scaleType: 'labels' }
					}
				};

			case ChartType.Gauge:
				return {
					theme: ChartTheme.WHITE,
					title: 'Gauge',
					resizable: true,

					gauge: {
						type: 'semi',
						alignment: 'center'
					},
					color: {
						scale: {
							value: '#FFE5B4'
						}
					}
				};

			default:
				return {};
				break;
		}
	}
</script>

<div class="grid-container">
	{#each $chartsDefinitions as chart, i (i)}
		<div class="chart-container">
			<svelte:component
				this={generateChartType(chart)}
				data={chart.Data}
				options={generateChartOptions(chart)}
			/>
		</div>
	{/each}
</div>

<style>
	@import 'grid.css';
</style>
