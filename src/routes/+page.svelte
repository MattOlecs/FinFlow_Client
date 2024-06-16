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
	import { selectedYear, selectedMonth } from '$lib/data/dateStore';

	let gridComponent: ChartsGrid;
	let dataGridApi: GridApi;
	let refreshGrid: () => Promise<void>;

	async function getData() {
		let aggData = await dataStoreInstance.getAggregatedData();
		let data: ChartTabularData = aggData.map(data => {
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

	async function addDonutChart() {
		addChart({ ChartType: ChartType.Donut, Data: await getData() });
	}

	async function addBarChart() {
		addChart({ ChartType: ChartType.Bar, Data: await getData() });
	}

	async function addGaugeChart() {
		addChart({ ChartType: ChartType.Gauge, Data: gaugeData });
	}

	async function refreshGrids() {
		refreshCharts(await getData());
	}

	onMount(() => {
		addGaugeChart();
		addDonutChart();
		addBarChart();
	});


	selectedYear.subscribe(value => {
		console.log('Refreshing components on year change', value);
		refreshGrids();
		if (refreshGrid) {
			refreshGrid();
		}
	});

	selectedMonth.subscribe(value => {
		console.log('Refreshing components on month change', value);
		refreshGrids();
		if (refreshGrid) {
			refreshGrid();
		}
	});
</script>

<DatePicker yearRange={30} />

<ChartsGrid bind:this={gridComponent} />

<DataGrid bind:gridApi={dataGridApi} bind:refreshGrid={refreshGrid}/>

<AddMenu actionOnsubmit={() => {refreshGrid(); refreshGrids();}}/>
