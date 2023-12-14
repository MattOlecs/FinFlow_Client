<script>
	import './app.css';
	import Bar from '../lib/bar/bar.svelte';
	import { isMenuOpen } from '../stores/navigationStore';
</script>

<Bar />

<main class:menu-open={$isMenuOpen}>
	<slot />
</main>
