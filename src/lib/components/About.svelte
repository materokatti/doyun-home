<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { t, loadTranslations } from '$lib/utils/translations';
    import { language } from '$lib/stores/language';

    let titleElement: HTMLElement;
    let contentElement: HTMLElement;
    let profileElement: HTMLElement;
    let cardElement: HTMLElement;
    let isVisible = false;
    let currentTitle = '';
    let currentSubtitle = '';
    let currentDescription = '';
    let currentRole = '';
    let currentResume = '';
    let currentProjects = '';

    async function updateTranslations() {
        await loadTranslations();
        currentTitle = t('about.title');
        currentSubtitle = t('about.subtitle');
        currentDescription = t('about.description');
        currentRole = t('about.role');
        currentResume = t('about.resume');
        currentProjects = t('about.projects');
    }

    // Subscribe to language changes
    $: {
        $language;  // Subscribe to the store
        if (typeof window !== 'undefined') {  // Only run on client side
            updateTranslations();
        }
    }

    onMount(async () => {
        await updateTranslations();
        
        // 초기 상태 설정
        gsap.set([profileElement, titleElement, contentElement], {
            opacity: 0,
            y: 20
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    isVisible = true;
                    animateElements();
                }
            });
        }, {
            threshold: 0.2
        });

        if (cardElement) {
            observer.observe(cardElement);
        }

        return () => {
            if (cardElement) {
                observer.unobserve(cardElement);
            }
        };
    });

    function animateElements() {
        gsap.to(profileElement, {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.to(titleElement, {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            delay: 0.4
        });

        gsap.to(contentElement, {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            delay: 0.6
        });
    }
</script>

<section class="about" id="about">
    <div class="container">
        <div class="layout">
            <div class="card" bind:this={cardElement}>
                <div class="profile-image" bind:this={profileElement}>
                    <img src="doyun.png" alt="Profile" />
                </div>
                <h1>Doyun Hwang</h1>
                <h2>{currentRole}</h2>
                <div class="divider"></div>
                <div class="social-links">
                    <a href="https://github.com/materokatti" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/doyun-hwang-397855214/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.youtube.com/channel/UCNF2FGsT3y6Xvbqv_9KJ0pA" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>

            <div class="right-section">
                <div class="content-wrapper">
                    <h2 bind:this={titleElement}>{currentTitle}</h2>
                    <h3>{currentSubtitle}</h3>
                    
                    <div class="buttons">
                        <a href="/resume.pdf" download>
                            <button class="btn primary">{currentResume}</button>
                        </a>
                        <a href="https://devstory.vercel.app/" target="_blank" rel="noopener noreferrer">
                            <button class="btn secondary">{currentProjects}</button>
                        </a>
                    </div>

                    <div class="content" bind:this={contentElement}>
                        <p>{currentDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .about {
        min-height: 100vh;
        padding: 2rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to right, #E6D9CD 30%, #FFF 30%);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        width: 100%;
        position: relative;
        z-index: 1;
    }

    .layout {
        display: flex;
        gap: 4rem;
        align-items: center;
        margin-left: -2rem;
    }

    .card {
        background: white;
        border-radius: 0;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        padding: 3rem 2rem;
        text-align: center;
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f9f5f1;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 1s ease forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .profile-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 2rem;
        background-color: #e0e0e0;
    }

    .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        color: #000;
        font-family: 'Arial', sans-serif;
    }

    .card h2 {
        font-size: 1rem;
        font-weight: 400;
        margin: 0.5rem 0 1.5rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .divider {
        width: 40px;
        height: 2px;
        background-color: #4169E1;
        margin: 1rem 0;
    }

    .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .social-links a {
        color: var(--text-color);
        font-size: 1.5rem;
        transition: color 0.3s ease;
    }

    .social-links a:hover {
        color: var(--accent-color);
    }

    .right-section {
        flex: 1;
    }

    .content-wrapper {
        max-width: 600px;
    }

    .right-section h2 {
        font-size: 5rem;
        font-weight: 900;
        margin: 0;
        color: #000;
        line-height: 1;
    }

    .right-section h3 {
        font-size: 1.5rem;
        font-weight: 400;
        margin: 1rem 0 2rem;
        color: #666;
    }

    .buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .btn {
        padding: 0.8rem 2.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .primary {
        background-color: #4169E1;
        color: white;
        border: none;
    }

    .primary:hover {
        background-color: #3154b3;
    }

    .secondary {
        background-color: transparent;
        color: #333;
        border: 1.5px solid #ddd;
    }

    .secondary:hover {
        border-color: #4169E1;
        color: #4169E1;
    }

    .content {
        color: #666;
        line-height: 1.8;
    }

    .content p {
        margin-bottom: 1rem;
    }

    @media (max-width: 1024px) {
        .layout {
            flex-direction: column;
            gap: 2rem;
            margin-left: 0;
        }

        .card {
            width: 100%;
            max-width: 400px;
            padding: 2rem;
        }

        .right-section {
            width: 100%;
            text-align: center;
        }

        .content-wrapper {
            margin: 0 auto;
        }

        .right-section h2 {
            font-size: 4rem;
        }

        .about {
            background: linear-gradient(to bottom, #E6D9CD 40%, #FFF 40%);
        }
    }

    @media (max-width: 768px) {
        .container {
            padding: 1rem;
        }

        .buttons {
            flex-direction: column;
        }

        .btn {
            width: 100%;
        }

        .right-section h2 {
            font-size: 3rem;
        }
    }
</style>
