import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.section-label', {
        opacity: 0, x: -20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact .section-label', start: 'top 88%' }
      });

      gsap.from('#contact .section-title-word', {
        y: '110%', stagger: 0.1, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: '#contact .section-title', start: 'top 80%' }
      });

      gsap.from('.c-sub', {
        opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.c-sub', start: 'top 85%' }
      });
      
      gsap.from('.c-link', {
        opacity: 0, x: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.c-links', start: 'top 82%' }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" style={{position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)'}} ref={containerRef}>
      <div className="contact-inner">
        <div>
          <div className="section-label">05 — Contact</div>
          <h2 className="section-title" style={{marginBottom: '1.5rem', lineHeight: '0.9', fontSize: 'clamp(3rem, 7vw, 6.5rem)', overflow: 'hidden'}}>
            <span className="section-title-word">LET'S&nbsp;</span>
            <span className="section-title-word" style={{color: 'var(--green)'}}>TALK</span><br />
            <span className="section-title-word">SECURITY.</span>
          </h2>
          <p className="c-sub" style={{color: 'var(--muted)', fontSize: '.96rem', lineHeight: 1.9, marginBottom: '2.5rem'}}>
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
