import Cursor from './components/Cursor';
import Background from './components/Background';
import Navbar from './components/Navbar';
import ScrollBar from './components/ScrollBar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <ScrollBar />
      <Cursor />
      <Background />
      <Navbar />

      <Hero />
      <Marquee />
      <About />
      <Projects />
      <TechStack />
      <Certifications />
      <Contact />
      
      <Footer />
    </>
  );
}

export default App;
