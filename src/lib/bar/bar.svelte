<script>
	import Navigation from '../navigation/navigation.svelte';
	import UserIcon from '../../../src/assets/userIcon.svg';
</script>

<div class="top-bar">
	<div class="menu-container">
		<Navigation />
	</div>
	<div class="user-info">
		<img src={UserIcon} alt="user icon" />
		<span>Mateusz Oleksik</span>
	</div>
</div>

<style>
	@import 'bar.css';
</style>
