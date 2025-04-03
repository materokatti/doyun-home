<script lang="ts">
  import { onMount } from 'svelte';
  import Globe from './Globe.svelte';
  import gsap from 'gsap';

  let titleElement: HTMLElement;
  let subtitleElement: HTMLElement;
  let buttonElement: HTMLElement;

  onMount(() => {
    // Fade in animations
    gsap.from(titleElement, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from(subtitleElement, {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.5,
      ease: 'power3.out'
    });

    gsap.from(buttonElement, {
      duration: 1,
      y: 20,
      opacity: 0,
      delay: 1,
      ease: 'power3.out'
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
    <h1 bind:this={titleElement}>Curious mind with a global soul.</h1>
    <p bind:this={subtitleElement}>A frontend developer exploring the world through code and culture.</p>
    <button bind:this={buttonElement} on:click={scrollToAbout} class="cta-button">
      Discover More
    </button>
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
  }

  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #60a5fa, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: transparent;
    border: 2px solid #60a5fa;
    color: #60a5fa;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .cta-button:hover {
    background: #60a5fa;
    color: white;
    transform: translateY(-2px);
  }

  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  .cta-button:hover::before {
    left: 100%;
  }
</style> 