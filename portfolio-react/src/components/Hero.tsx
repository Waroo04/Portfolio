import { useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  useEffect(() => {
    // We already have a global setup for Hero Entrance, let's trigger it when component mounts
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .to('.hero-eyebrow-inner', { y: '0%', duration: 0.8, ease: 'power3.out' })
      .to('.hero-name-word', { y: '0%', stagger: 0.15, duration: 1, ease: 'power4.out' }, '-=0.5')
      .to('.hero-role-inner', { y: '0%', duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to('.hero-bio', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to('.scroll-line', { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.2')
      .to('.hero-scroll-hint', { opacity: 1, duration: 0.4 }, '-=0.4');

    return () => { heroTl.kill(); };
  }, []);

  return (
    <section id="hero">
      <div className="hero-eyebrow"><div className="hero-eyebrow-inner">Cybersecurity Enthusiast &amp; Researcher</div></div>
      <h1 className="hero-name">
        <span className="hero-name-line"><span className="hero-name-word">Swaroop</span></span>
        <span className="hero-name-line"><span className="hero-name-word outline">Supal</span></span>
      </h1>
      <div className="hero-role"><div className="hero-role-inner">&gt; Application Security &amp; Ethical Hacking</div></div>
      <p className="hero-bio">Building at the intersection of security research, mobile forensics, and AI-driven threat detection. I design systems that are intentionally vulnerable — because understanding how things break is the fastest way to build them unbreakable.</p>
      <div className="hero-cta">
        <a href="#projects" className="btn-primary magnetic">View Projects</a>
        <a href="mailto:swaroopsupal05@gmail.com" className="btn-ghost magnetic">Contact Me</a>
      </div>
      <div className="hero-scroll-hint"><div className="scroll-line"></div>Scroll to explore</div>
    </section>
  );
}
