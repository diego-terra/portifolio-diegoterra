import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FlyingCube — abstract 3D background.
 * - Wireframe/edge cube with orbiting fragments in neon green.
 * - Rotates continuously on all axes.
 * - Mouse position tilts/rotates; page scroll drives fragment "disassembly".
 * - Dark theme, transparent canvas, blends over the section's radial glow.
 */

const GREEN = new THREE.Color("#16a34a");
const GREEN_BRIGHT = new THREE.Color("#22c55e");

function CubeEdges({ size = 1.6 }: { size?: number }) {
  const geo = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  return (
    <lineSegments geometry={edges}>
      <lineBasicMaterial
        color={GREEN_BRIGHT}
        transparent
        opacity={0.45}
        toneMapped={false}
      />
    </lineSegments>
  );
}

function InnerLayers() {
  return (
    <>
      {[0.9, 1.2, 1.55].map((s, i) => (
        <mesh key={i} rotation={[i * 0.3, i * 0.5, 0]}>
          <boxGeometry args={[s, s, s]} />
          <meshBasicMaterial
            color={GREEN}
            wireframe
            transparent
            opacity={0.08 - i * 0.02}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function Fragments({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    const arr: {
      basePos: THREE.Vector3;
      orbit: THREE.Vector3;
      speed: number;
      scale: number;
      phase: number;
    }[] = [];
    const count = 22;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = 1.4 + Math.random() * 0.8;
      arr.push({
        basePos: new THREE.Vector3(
          Math.cos(theta) * r,
          (Math.random() - 0.5) * 1.8,
          Math.sin(theta) * r,
        ),
        orbit: new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
        ).normalize(),
        speed: 0.3 + Math.random() * 0.6,
        scale: 0.08 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current; // 0..1
    g.children.forEach((child, i) => {
      const it = items[i];
      // "Disassembly" scales with scroll: 0 = attached, 1 = flown out.
      const spread = 0.4 + scroll * 1.8;
      const wobble = Math.sin(t * it.speed + it.phase) * 0.25;
      child.position.set(
        it.basePos.x * spread + it.orbit.x * wobble,
        it.basePos.y * spread + it.orbit.y * wobble,
        it.basePos.z * spread + it.orbit.z * wobble,
      );
      child.rotation.x = t * it.speed;
      child.rotation.y = t * it.speed * 0.7;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} scale={it.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? GREEN_BRIGHT : GREEN}
            wireframe
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({
  mouseRef,
  scrollRef,
  reducedMotion,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    if (reducedMotion) {
      g.rotation.y += delta * 0.05;
      return;
    }
    const t = state.clock.getElapsedTime();
    // continuous rotation on all axes
    g.rotation.y += delta * 0.18;
    g.rotation.x = Math.sin(t * 0.2) * 0.15 + mouseRef.current.y * 0.4;
    g.rotation.z = Math.cos(t * 0.15) * 0.08;
    // mouse tilt
    g.rotation.y += mouseRef.current.x * delta * 0.6;
  });

  return (
    <group ref={root}>
      <CubeEdges size={1.6} />
      <InnerLayers />
      <Fragments scrollRef={scrollRef} />
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={GREEN}
        size={0.03}
        transparent
        opacity={0.25}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

export default function FlyingCube( {
    className = "",
  }: {
    className ?: string;
  }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.x = (e.clientX - cx) / window.innerWidth;
      mouseRef.current.y = (e.clientY - cy) / window.innerHeight;
    };
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section enters bottom, 1 when it exits top
      const p = 1 - (rect.bottom) / (vh + rect.height);
      scrollRef.current = Math.max(0, Math.min(1, p));
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 ${className || ""}`}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene
            mouseRef={mouseRef}
            scrollRef={scrollRef}
            reducedMotion={reducedMotion}
          />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
