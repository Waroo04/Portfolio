import { useEffect } from 'react';


export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cur || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    };

    let reqId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      reqId = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', onMouseMove);
    animRing();

    // Attach hover effects to links and buttons
    const attachHover = () => {
      document.querySelectorAll('a, button, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const handleMouseEnter = () => {
      cur.style.width = '14px';
      cur.style.height = '14px';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.opacity = '0.5';
    };

    const handleMouseLeave = () => {
      cur.style.width = '8px';
      cur.style.height = '8px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.opacity = '1';
    };

    // Need a slight delay to allow React to render DOM nodes
    setTimeout(attachHover, 100);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(reqId);
      document.querySelectorAll('a, button, .magnetic').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
    </>
  );
}
