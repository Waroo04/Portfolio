import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.skills-stack', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-stack', start: 'top 82%' }
      });

      document.querySelectorAll('.s-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.pill'), {
          opacity: 0, scale: 0.88, stagger: 0.03, duration: 0.4, ease: 'power1.out',
          scrollTrigger: { trigger: row, start: 'top 88%' }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="divider"></div>
      <section id="experience" ref={containerRef} className="sec" style={{maxWidth: '1300px', margin: '0 auto', padding: '9rem 3.5rem'}}>
        <div className="section-inner" style={{padding: '0'}}>
          <div className="sec-eyebrow" style={{display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--mono)', fontSize: '.68rem', color: 'var(--green)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '1.75rem', overflow: 'hidden'}}>
            <div className="sec-eyebrow-inner" style={{display: 'flex', alignItems: 'center', gap: '1rem', transform: 'translateY(110%)'}}>
               <span>03</span><span>—</span><span>Tech Stack</span>
            </div>
          </div>
          <h2 className="sec-heading" data-split="true" style={{fontFamily: 'var(--display)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: '.92', letterSpacing: '.01em', marginBottom: '6rem'}}>
            WHAT I USE
          </h2>
          
          <div className="skills-stack">
            <div className="s-row">
              <div className="s-row-label">Security</div>
              <div className="pills">
                <span className="pill">OWASP</span><span className="pill">Burp Suite</span><span className="pill">APK Analysis</span><span className="pill">Reverse Eng.</span><span className="pill">Phishing Detection</span><span className="pill">Splunk</span><span className="pill">Browser Security</span>
              </div>
            </div>
            <div className="s-row">
              <div className="s-row-label">Languages</div>
              <div className="pills">
                <span className="pill">Python</span><span className="pill">Kotlin</span><span className="pill">C++</span><span className="pill">TypeScript</span><span className="pill">JavaScript</span><span className="pill">Solidity</span>
              </div>
            </div>
            <div className="s-row">
              <div className="s-row-label">Platforms &amp; Tools</div>
              <div className="pills">
                <span className="pill">Android NDK</span><span className="pill">Firebase</span><span className="pill">Supabase</span><span className="pill">AWS</span><span className="pill">Web3.js</span><span className="pill">Arduino</span><span className="pill">Three.js</span>
              </div>
            </div>
            <div className="s-row">
              <div className="s-row-label">ML &amp; Data</div>
              <div className="pills">
                <span className="pill">scikit-learn</span><span className="pill">TensorFlow</span><span className="pill">PyTorch</span><span className="pill">Pandas</span><span className="pill">NumPy</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
