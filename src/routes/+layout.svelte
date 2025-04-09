<script lang="ts">
	import '../app.css';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';

	let { children } = $props();
</script>

<LanguageSelector />

<slot />
