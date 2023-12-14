<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { BarChartSimple, DonutChart } from '@carbon/charts-svelte';
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
				height: '100%',
				width: '100%',
				theme: 'g100'
			}}
		/>
	</div>
</div>
