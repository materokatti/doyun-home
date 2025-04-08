<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  let container: HTMLDivElement;
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let globe: THREE.Mesh;
  let controls: OrbitControls;

  onMount(() => {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Globe creation
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const texture = new THREE.TextureLoader().load('/profile.png');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.7,
      roughness: 0.1,
      envMapIntensity: 1.0
    });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4.0);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // 추가 조명
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, -3, -5);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 3;

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      globe.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {});
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  });
</script>

<div bind:this={container} class="globe-container" />

<style>
  .globe-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style> 