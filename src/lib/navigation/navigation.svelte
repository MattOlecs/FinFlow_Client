<script lang="ts">
	import { isMenuOpen } from '../../stores/navigationStore';
	import { onMount } from 'svelte';

	function toggleMenu() {
		$isMenuOpen = !$isMenuOpen;
	}

	let fontSize = '0.1em'; // Initial font size

	onMount(() => {
		const leftSideNav = document.querySelector('.left-side-nav') as Element;
		const content = document.querySelector('.main') as Element;

		// Listen for changes in the .left-side-nav width
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				fontSize = `${0.1 + width / 200}em`; // Adjust the multiplier as needed
			}
		});

		// Observe the .left-side-nav and .content elements
		observer.observe(leftSideNav);
		observer.observe(content);
	});
</script>

<button class="menu-button" on:click={toggleMenu}>
	<span class="menu-icon">☰</span>
</button>

<div class="left-side-nav" class:open={$isMenuOpen}>
	<nav>
		<ul>
			<li><a href="/" style="font-size: {fontSize};">Home</a></li>
			<li><a href="/about" style="font-size: {fontSize};">About</a></li>
			<li><a href="/chat" style="font-size: {fontSize};">Chat</a></li>
			<li><a href="/contact" style="font-size: {fontSize};">Contact</a></li>
		</ul>
	</nav>
</div>

<style>
	@import 'navigation.css';
</style>
