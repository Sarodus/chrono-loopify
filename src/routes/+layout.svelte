<script>
	import Header from '$lib/Header.svelte';
	import '../app.css';
</script>

<div class="grid grid-rows-[auto_1fr] w-full h-screen">
	<Header />
	<div>
		<slot />
	</div>
</div>
