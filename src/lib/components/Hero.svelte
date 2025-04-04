<script lang="ts">
    import { onMount } from 'svelte';
    import Globe from './Globe.svelte';
    import gsap from 'gsap';
  
    let titleElement: HTMLElement;
    let subtitleElement: HTMLElement;
    let buttonElement: HTMLElement;
  
    onMount(() => {
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
  
      gsap.to(buttonElement, {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: .7,
        ease: 'power3.out',
      });
    });
  
    function scrollToAbout() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  </script>
  
  <section class="hero">
    <Globe />
    
    <div class="content">
      <h1 bind:this={titleElement} class="initial-state">Curious mind with a global soul.</h1>
      <p bind:this={subtitleElement} class="initial-state">A frontend developer exploring the world through code and culture.</p>
    </div>
  </section>
  
  <style>
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(to bottom, #0f172a, #1e293b);
    }
  
    .content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: white;
      padding: 2rem;
      pointer-events: none;
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
  
  </style>