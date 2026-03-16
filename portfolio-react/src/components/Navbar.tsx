import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.nav-logo', { opacity: 1, duration: 0.6, ease: 'power2.out' })
      .to('.nav-links a', { opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, '-=0.3');

    // ScrollSpy logic for setting active links
    const setActive = (id: string) => {
      document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === '#' + id) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    };

    const sections = document.querySelectorAll('section[id]');
    const scrollTriggers: ScrollTrigger[] = [];

    sections.forEach(sec => {
      const st = ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActive(sec.id),
        onEnterBack: () => setActive(sec.id)
      });
      scrollTriggers.push(st);
    });

    return () => {
      scrollTriggers.forEach(st => st.kill());
    };
  }, []);

  return (
    <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo magnetic">&gt;_swaroop_supal</div>
      <ul className="nav-links">
        <li><a href="#about" className="magnetic">About</a></li>
        <li><a href="#projects" className="magnetic">Projects</a></li>
        <li><a href="#experience" className="magnetic">Experience</a></li>
        <li><a href="#certs" className="magnetic">Certs</a></li>
        <li><a href="#contact" className="magnetic">Contact</a></li>
      </ul>
    </nav>
  );
}
