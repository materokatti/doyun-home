<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';

    let titleElement: HTMLElement;
    let contentElement: HTMLElement;

    onMount(() => {
        gsap.from(titleElement, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from(contentElement, {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });
    });
</script>

<section id="about" class="about">
    <div class="container">
        <h2 bind:this={titleElement}>About Me</h2>
        <div class="content" bind:this={contentElement}>
            <p>
                안녕하세요! 저는 프론트엔드 개발자로서 사용자 경험을 중요시하며, 
                창의적인 웹 솔루션을 만드는 것을 좋아합니다.
            </p>
            <p>
                새로운 기술을 배우는 것을 즐기며, 특히 웹 개발의 최신 트렌드와 
                사용자 인터페이스 디자인에 관심이 많습니다.
            </p>
        </div>
    </div>
</section>

<style>
    .about {
        min-height: 100vh;
        padding: 6rem 2rem;
        background: linear-gradient(to bottom, #000, #fff);
        color: white;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    h2 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 2rem;
        background: linear-gradient(45deg, #ffd24c, #ffb925);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    }

    .content {
        font-size: 1.2rem;
        line-height: 1.8;
        opacity: 0.9;
    }

    p {
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .about {
            padding: 4rem 1.5rem;
        }

        h2 {
            font-size: 2.5rem;
        }

        .content {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 480px) {
        .about {
            padding: 3rem 1rem;
        }

        h2 {
            font-size: 2rem;
        }

        .content {
            font-size: 1rem;
        }
    }
</style>
