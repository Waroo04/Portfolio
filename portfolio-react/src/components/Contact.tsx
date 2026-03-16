import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.sec-eyebrow-inner', {
        y: '0%', duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#contact .sec-eyebrow-inner', start: 'top 88%' }
      });

      const cBig = document.querySelector('.c-big');
      if (cBig) {
        // Simple manual split for "LET'S TALK SECURITY"
        const spans = cBig.querySelectorAll('span:not(.c-green-span)');
        spans.forEach(span => {
          const text = span.textContent || '';
          span.textContent = '';
          [...text].forEach(ch => {
            const charSpan = document.createElement('span');
            charSpan.className = 'ch';
            charSpan.textContent = ch === ' ' ? '\u00a0' : ch;
            charSpan.style.display = 'inline-block';
            span.appendChild(charSpan);
          });
        });

        gsap.from('#contact .ch', {
          y: '110%', stagger: 0.02, duration: 0.9, ease: 'power4.out',
          scrollTrigger: { trigger: cBig, start: 'top 80%' }
        });
      }

      gsap.to('.c-sub', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.c-sub', start: 'top 85%' }
      });
      
      gsap.to('.c-link', {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.c-links', start: 'top 82%' }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" style={{position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)'}} ref={containerRef}>
      <div className="contact-inner">
        <div>
          <div className="sec-eyebrow" style={{marginBottom: '1.5rem'}}>
            <div className="sec-eyebrow-inner"><span>05</span><span>—</span><span>Contact</span></div>
          </div>
          <div className="c-big">
            <span>LET'S </span><span style={{color: 'var(--green)'}} className="c-green-span">TALK</span><br />
            <span>SECURITY.</span>
          </div>
          <p className="c-sub">
            Open to cybersecurity internships, research collaborations, and CTF team opportunities. Let's build something that fights back.
          </p>
          <a href="/resume.pdf" download="Swaroop_Supal_Resume.pdf" className="btn-a">Download Resume</a>
        </div>
        <div className="c-links">
          <a href="mailto:swaroopsupal05@gmail.com" className="c-link">
            <span className="c-link-label">Email</span>
            <span className="c-link-val">swaroopsupal05@gmail.com</span>
          </a>
          <a href="https://linkedin.com/in/swaroop-supal" target="_blank" rel="noreferrer" className="c-link">
            <span className="c-link-label">LinkedIn</span>
            <span className="c-link-val">linkedin.com/in/swaroop-supal</span>
          </a>
          <a href="https://github.com/Waroo04" target="_blank" rel="noreferrer" className="c-link">
            <span className="c-link-label">GitHub</span>
            <span className="c-link-val">github.com/Waroo04</span>
          </a>
          <a href="https://instagram.com/swaroop__supal" target="_blank" rel="noreferrer" className="c-link">
            <span className="c-link-label">Instagram</span>
            <span className="c-link-val">@swaroop__supal</span>
          </a>
        </div>
      </div>
    </section>
  );
}
