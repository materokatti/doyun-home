<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { language } from '$lib/stores/language';
  import { fade } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  let isOpen = false;
  
  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'es', name: 'ESP' }
  ];
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function selectLanguage(code: string) {
    language.set(code);
    isOpen = false;
    dispatch('change', { code });
  }
</script>

<div class="language-selector">
  <button class="language-button" on:click={toggleDropdown}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  </button>
  
  {#if isOpen}
    <div class="language-dropdown" transition:fade>
      {#each languages as lang}
        <button 
          class="language-option {lang.code === $language ? 'active' : ''}"
          on:click={() => selectLanguage(lang.code)}
        >
          {lang.name}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-selector {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .language-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.3s;
  }
  
  .language-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    overflow: hidden;
  }
  
  .language-option {
    display: block;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.3s;
  }
  
  .language-option:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .language-option.active {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style> 