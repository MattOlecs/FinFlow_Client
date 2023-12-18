<script lang="ts">
	import Grid from 'gridjs-svelte';
	import { onMount } from 'svelte';

	let grid: Grid;

	const data = [
		{ name: 'John', email: 'john@example.com' },
		{ name: 'Mark', email: 'mark@gmail.com' }
	];

	onMount(() => {
		let instance = grid.instance;
		instance.forceRender();
	})

</script>

<div>
	<Grid bind:instance={grid} {data} />
</div>

<style>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>
