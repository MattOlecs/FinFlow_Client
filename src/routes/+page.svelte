<script lang="ts">
	import type { GridApi } from 'ag-grid-community';
	import ChartsGrid, { addChart, refreshCharts } from '$lib/grid/grid.svelte';
	import { ChartType, type ChartDefinition } from '$lib/grid/grid.svelte';
	import DataGrid from '$lib/data-grid/data-grid.svelte';
	import { onMount } from 'svelte';
	import DatePicker from '$lib/date picker/date-picker.svelte';
	import AddMenu from '$lib/add-menu/add-menu.svelte';
	import dataStoreInstance from '$lib/data/dataStore';
	import type { ChartTabularData } from '@carbon/charts-svelte';
	import { get } from 'svelte/store';

	let gridComponent: ChartsGrid;
	let dataGridApi: GridApi;
	let refreshGrid: () => void;

	function getData() {
		let data: ChartTabularData = dataStoreInstance.getAggregatedData().map(data => {
			return {
				group: data.Group,
				value: data.Value
			};
		});
		return data
	}


	let gaugeData = [
		{
			group: 'value',
			value: 67
		}
	];

	function addDonutChart() {
		addChart({ ChartType: ChartType.Donut, Data: getData() });
	}

	function addBarChart() {
		addChart({ ChartType: ChartType.Bar, Data: getData() });
	}

	function addGaugeChart() {
		addChart({ ChartType: ChartType.Gauge, Data: gaugeData });
	}

	function refreshGrids() {
		refreshCharts(getData());
	}

	onMount(() => {
		addGaugeChart();
		addDonutChart();
		addBarChart();
	});
</script>

<DatePicker yearRange={30} />

<ChartsGrid bind:this={gridComponent} />

<!-- <button on:click|preventDefault={addDonutChart}>add donut</button>
<button on:click|preventDefault={addBarChart}>add bar</button> -->

<DataGrid bind:gridApi={dataGridApi} bind:refreshGrid={refreshGrid}/>

<AddMenu actionOnsubmit={() => {refreshGrid(); refreshGrids();}}/>
