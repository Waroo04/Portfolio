import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.from('.section-title-word', {
        y: '110%',
        stagger: 0.1,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.section-title', start: 'top 85%' }
      });

      // Terminal fade in
      gsap.from('.about-terminal', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-terminal', start: 'top 85%' }
      });

      // Text fade in
      gsap.from('.about-text p, .about-focus li', {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%' }
      });

      // Profile image fade in
      gsap.to('.about-image-wrapper', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-image-wrapper', start: 'top 80%' }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef}>
      <div className="section-inner">
        <div className="section-label">01 — About</div>
        <h2 className="section-title">
          <span className="section-title-word">Who&nbsp;</span>
          <span className="section-title-word">I&nbsp;</span>
          <span className="section-title-word">Am</span>
        </h2>
        <div className="about-grid">
          <div className="about-text">
            <div className="about-terminal">
              <span className="dim">$ </span>whoami<br />
              swaroop_supal<br />
              <span className="dim">$ </span>cat role.txt<br />
              Aspiring cybersecurity professional<br />
              <span className="dim">$ </span>echo $LOCATION<br />
              Thane, Maharashtra, India<span className="cursor"></span>
            </div>
            <p>I'm <strong>Swaroop Supal</strong>, a developer-turned-security-researcher with a deep passion for understanding systems from the attacker's perspective.</p>
            <p>My work spans <strong>Android app vulnerability engineering</strong> for CTF challenges, <strong>browser-based phishing detection</strong>, <strong>AI-powered threat analysis</strong>, and full-stack applications built with security-first architecture.</p>
            <p>Every project I build is an exercise in that philosophy — intentionally designing weaknesses so others learn to find them, while hardening my own understanding of secure systems.</p>
            <ul className="about-focus">
              <li>Application Security &amp; Penetration Testing</li>
              <li>Android Reverse Engineering &amp; CTF Design</li>
              <li>AI-Driven Phishing &amp; Threat Detection</li>
              <li>Smart Contract Security (Web3 / Solidity)</li>
              <li>IoT Security Hardening &amp; Embedded Systems</li>
            </ul>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-inner">
              <img src="/images/profile.webp" alt="Swaroop Supal" className="about-image" />
              <div className="about-image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
