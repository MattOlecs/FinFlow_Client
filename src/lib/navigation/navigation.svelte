<script lang="ts">
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<button class="menu-button" on:click={toggleMenu}>
	<span class="menu-icon">☰</span>
</button>

<div class="left-side-nav" class:open={isOpen}>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
			<li><a href="/chat">Chat</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</nav>
</div>

<style>
	@import 'navigation.css';
</style>
