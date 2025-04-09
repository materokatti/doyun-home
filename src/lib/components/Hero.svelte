<script lang="ts">
    import { onMount } from 'svelte';
    import Globe from './Globe.svelte';
    import gsap from 'gsap';
    import { t, loadTranslations } from '$lib/utils/translations';
    import { language } from '$lib/stores/language';
  
    let titleElement: HTMLElement;
    let subtitleElement: HTMLElement;
    let scrollArrow: HTMLElement;
    let isScrolling = false;
    let showContent = false;
    let currentTitle = '';
    let currentSubtitle = '';

    async function updateTranslations() {
      await loadTranslations();
      currentTitle = t('hero.title');
      currentSubtitle = t('hero.subtitle');
      showContent = true;
    }

    // Subscribe to language changes
    $: {
      $language;  // Subscribe to the store
      if (typeof window !== 'undefined') {  // Only run on client side
        updateTranslations();
      }
    }
  
    onMount(async () => {
      // Initial translation load
      await updateTranslations();
      
      // Fade in animations
      gsap.to(titleElement, {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.out',
      });
  
      gsap.to(subtitleElement, {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 0.7,
        ease: 'power3.out',
      });

      // Scroll arrow animation
      gsap.to(scrollArrow, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });
  
    function scrollToNextSection() {
      if (isScrolling) return;
      
      isScrolling = true;
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isScrolling = false;
        }, 1500);
      } else {
        isScrolling = false;
      }
    }
  </script>
  
  <section class="hero">
    <Globe />
    
    <div class="content">
      {#if showContent}
        <h1 bind:this={titleElement} class="initial-state">{currentTitle}</h1>
        <p bind:this={subtitleElement} class="initial-state">{currentSubtitle}</p>
      {/if}
    </div>

    <div class="scroll-arrow" 
         bind:this={scrollArrow} 
         on:click={scrollToNextSection}
         role="button"
         tabindex="0"
         on:keydown={(e) => e.key === 'Enter' && scrollToNextSection()}
    >
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 26L24 36L34 26M14 12L24 22L34 12" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </section>
  
  <style>
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;
      background: linear-gradient(to bottom, #222, #222);
    }
  
    .content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: white;
      padding: 2rem;
      padding-bottom: 6rem;
      pointer-events: none;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .initial-state {
      opacity: 0;
      transform: translateY(20px);
    }
  
    h1 {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      position: relative;
      background: linear-gradient(45deg, #ffd24c, #ffb925);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.9));
    }
  
    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .scroll-arrow {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      cursor: pointer;
      z-index: 2;
      opacity: 0.8;
      transition: opacity 0.3s ease;
      background: none;
      border: none;
      padding: 0;
    }

    .scroll-arrow:hover {
      opacity: 1;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
        padding: 0 1rem;
      }

      p {
        font-size: 1.2rem;
        padding: 0 1rem;
      }

      .content {
        padding: 1rem;
      }

      .scroll-arrow {
        bottom: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
      }

      .scroll-arrow {
        bottom: 1rem;
      }
    }
  </style>