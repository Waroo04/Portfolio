import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    num: "001",
    name: "WEBSEC 1.0 — Phishing Detection Extension",
    desc: "Browser extension identifying phishing websites in real time via URL pattern analysis, DOM inspection, and threat signature matching. Cross-browser, zero-config, instant warnings before harm is done.",
    link: "https://github.com/Waroo04/Webesec-1-0",
    tags: [
      { name: "Threat Detection", type: "g" },
      { name: "Browser Security", type: "g" },
      { name: "JavaScript", type: "" },
      { name: "HTML / CSS", type: "" }
    ]
  },
  {
    num: "002",
    name: "Hasira Puzzle — CTF Android APK",
    desc: "Signed Kotlin Android puzzle game engineered as a CTF challenge. Intentional obfuscation layers and hidden flags for realistic reverse engineering scenarios.",
    link: "https://github.com/Waroo04/apk1",
    tags: [
      { name: "Android CTF", type: "r" },
      { name: "Reverse Eng.", type: "r" },
      { name: "Kotlin", type: "" },
      { name: "Gradle", type: "" }
    ]
  },
  {
    num: "003",
    name: "Native Encryption Mishap — CTF APK",
    desc: "Android CTF challenge with deliberately flawed native C++ encryption via NDK. Tests JNI bridge analysis and broken cryptographic pattern recognition at the binary level.",
    link: "https://github.com/Waroo04/apk2",
    tags: [
      { name: "Native Crypto", type: "r" },
      { name: "NDK / JNI", type: "r" },
      { name: "Kotlin", type: "" },
      { name: "C++", type: "" },
      { name: "CMake", type: "" }
    ]
  },
  {
    num: "004",
    name: "Track-Meds — Medication Tracker",
    desc: "Full-stack web app for medication inventory management. Barcode scanning, expiry reminders, real-time notifications. React + TypeScript + Vite, live on Netlify.",
    link: "https://trackmeds2024.netlify.app/",
    tags: [
      { name: "React", type: "" },
      { name: "TypeScript", type: "" },
      { name: "Vite", type: "" },
      { name: "Live Demo", type: "c" }
    ]
  },
  {
    num: "005",
    name: "Career Advisor AI",
    desc: "ML-powered career path recommender. Analyzes user skills and interests against real-world demand data using scikit-learn to generate personalized career guidance.",
    link: "https://github.com/Waroo04/CarrerAdvisorAI",
    tags: [
      { name: "ML / AI", type: "c" },
      { name: "Python", type: "" },
      { name: "scikit-learn", type: "" },
      { name: "Jupyter", type: "" }
    ]
  },
  {
    num: "006",
    name: "PetMate — AI Pet Care Platform",
    desc: "Full-stack platform with Supabase auth, Gemini AI chat (text + image), appointment scheduling, and pet profile management. React + TypeScript, deployed on Netlify.",
    link: "https://github.com/Waroo04",
    tags: [
      { name: "Gemini AI", type: "c" },
      { name: "React", type: "" },
      { name: "Supabase", type: "" },
      { name: "TypeScript", type: "" }
    ]
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('#projects .section-title-word', {
        y: '110%', stagger: 0.1, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: '#projects .section-title', start: 'top 85%' }
      });

      gsap.from('.section-label', {
        opacity: 0, x: -20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '#projects .section-label', start: 'top 88%' }
      });

      gsap.to('.proj-item', {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.proj-list', start: 'top 82%' }
      });

      // Horizontal parallax
      gsap.to('.proj-item:nth-child(odd)', {
        x: -8,
        scrollTrigger: { trigger: '.proj-list', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
      gsap.to('.proj-item:nth-child(even)', {
        x: 8,
        scrollTrigger: { trigger: '.proj-list', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="proj-bg">
      <section id="projects" className="sec" ref={containerRef}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="section-label">02 — Projects</div>
          <h2 className="section-title">
            <span className="section-title-word">SELECTED&nbsp;</span>
            <span className="section-title-word">WORK</span>
          </h2>
        </div>
        <div className="proj-list">
          {projectsData.map((proj, idx) => (
            <a href={proj.link} target="_blank" rel="noreferrer" className="proj-item" key={idx}>
              <span className="p-num">{proj.num}</span>
              <div className="p-info">
                <div className="p-name">{proj.name}</div>
                <div className="p-desc">{proj.desc}</div>
                <div className="p-tags">
                  {proj.tags.map((tag, tIdx) => (
                    <span className={`p-tag ${tag.type}`} key={tIdx}>{tag.name}</span>
                  ))}
                </div>
              </div>
              <div className="p-right"><span className="p-arrow">→</span></div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

