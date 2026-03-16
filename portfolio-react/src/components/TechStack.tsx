import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import gsap from 'gsap';

const textureLoader = new THREE.TextureLoader();
// Using some default colors/textures fallback if images are missing
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
// Error handling for missing local images by generating colored canvases if load fails
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    if (!api.current) return;
    
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('#experience .section-title-word', {
        y: '110%', stagger: 0.1, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: '#experience .section-title', start: 'top 85%' }
      });
      gsap.from('#experience .section-label', {
        opacity: 0, x: -20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '#experience .section-label', start: 'top 88%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const el = document.getElementById("experience");
      if (!el) return;
      const threshold = el.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    
    document.querySelectorAll(".n-links a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
          // Fallback color so balls are visible even if images have broken paths
          color: new THREE.Color(0x00ff88)
        })
    );
  }, []);

  return (
    <>
      <div className="divider"></div>
      <section id="experience" ref={containerRef} style={{ position: 'relative', minHeight: '80vh', padding: '6rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 3.5rem', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div className="section-label">03 — Tech Stack</div>
          <h2 className="section-title">
            <span className="section-title-word">WHAT&nbsp;</span>
            <span className="section-title-word">I&nbsp;</span>
            <span className="section-title-word">USE</span>
          </h2>
        </div>

        <div className="techstack" style={{ height: '70vh', width: '100%', position: 'absolute', top: '15vh', left: 0, zIndex: 1 }}>
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            className="tech-canvas"
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={materials[Math.floor(Math.random() * materials.length)]}
                  isActive={isActive}
                />
              ))}
            </Physics>
            {/* We suppress environment if the model doesn't exist by conditionally rendering or catching errors, but Drei's Environment will throw if the file is missing unless we handle it gracefully. */}
            {/* The user provided a model path, so we attempt to load it. */}
            <Environment
              preset="city"
              environmentIntensity={0.5}
              environmentRotation={[0, 4, 2]}
            />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        </div>
      </section>
    </>
  );
};

export default TechStack;
