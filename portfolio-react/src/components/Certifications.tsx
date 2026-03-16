import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certsData = [
  {
    code: "[SEC-001]",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    year: "In Progress — 2025"
  },
  {
    code: "[NET-001]",
    name: "Network Security Fundamentals",
    issuer: "Cisco NetAcad",
    year: "2024"
  },
  {
    code: "[ML-001]",
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    year: "2024"
  },
  {
    code: "[WEB3-001]",
    name: "Web3 & Smart Contract Security",
    issuer: "Self-Study — Ethereum, Solidity",
    year: "2024 — Ongoing"
  },
  {
    code: "[AND-001]",
    name: "Android Security & CTF Design",
    issuer: "Independent Research",
    year: "2024"
  },
  {
    code: "[IOT-001]",
    name: "IoT Security Hardening",
    issuer: "Arduino / Embedded Systems",
    year: "2024 — Ongoing"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.cert-tile', {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.certs-grid', start: 'top 82%' }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certs" ref={containerRef}>
      <div className="section-inner">
        <div className="section-label">04 — Certifications</div>
        <h2 className="section-title">
          <span className="section-title-word">Learning&nbsp;</span>
          <span className="section-title-word">&amp;&nbsp;</span>
          <span className="section-title-word">Growth</span>
        </h2>
        <div className="certs-grid">
          {certsData.map((cert, idx) => (
            <div className="cert-tile" key={idx}>
              <div className="cert-code">{cert.code}</div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-year">{cert.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
