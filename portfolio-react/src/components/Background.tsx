import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background() {
  const mountRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const canvas = mountRef.current;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Particles
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const alphas = new Float32Array(COUNT);
    
    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 22;
      positions[i*3+1] = (Math.random() - 0.5) * 16;
      positions[i*3+2] = (Math.random() - 0.5) * 8;
      sizes[i] = Math.random() * 2.5 + 0.5;
      alphas[i] = Math.random() * 0.6 + 0.1;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Lines connecting nearby particles (sparse grid feel)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.06 });
    const lineGeo = new THREE.BufferGeometry();
    const lineVerts = [];
    for (let i = 0; i < 120; i++) {
      const a = Math.floor(Math.random() * COUNT) * 3;
      const b = Math.floor(Math.random() * COUNT) * 3;
      lineVerts.push(positions[a], positions[a+1], positions[a+2]);
      lineVerts.push(positions[b], positions[b+1], positions[b+2]);
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(lineVerts), 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse parallax
    let targetX = 0, targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    document.addEventListener('mousemove', onMouseMove);

    // Scroll drift
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let frame = 0;
    let reqId: number;
    
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      frame += 0.004;
      particles.rotation.y = frame * 0.05 + targetX;
      particles.rotation.x = frame * 0.02 + targetY;
      particles.position.y = -scrollY * 0.0015;
      mat.opacity = 0.35 - scrollY * 0.00012;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(reqId);
      
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="bg-canvas" ref={mountRef}></canvas>;
}
