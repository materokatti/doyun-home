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

  const cities = [
    { name: 'Seoul', position: new THREE.Vector3(0.8, 0.5, 0.3) },
    { name: 'San Francisco', position: new THREE.Vector3(-0.8, 0.3, 0.5) },
    { name: 'London', position: new THREE.Vector3(0.2, 0.4, -0.8) },
    { name: 'Tokyo', position: new THREE.Vector3(0.9, 0.2, 0.3) }
  ];

  onMount(() => {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Globe creation
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load('/earth-texture.jpg');
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      specular: new THREE.Color(0x333333),
      shininess: 5
    });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add city markers
    cities.forEach(city => {
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(city.position);
      scene.add(marker);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

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
      globe.rotation.y += 0.001;
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