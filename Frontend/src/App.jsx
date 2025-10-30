import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import CardNav from './components/CardNav';
import logo from './assets/logo2.png';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import './styles/global.css';

function App() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "#about" },
        { label: "Careers", ariaLabel: "About Careers", href: "#careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#portfolio" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#case-studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "#contact" },
        { label: "Twitter", ariaLabel: "Twitter", href: "#twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#linkedin" }
      ]
    }
  ];

  return (
    <ThemeProvider>
      <div className="app">
        {/* <CursorGlow /> */}
        <CardNav
          logo={logo}
          logoAlt="Scenoxis Logo"
          items={items}
          ease="power3.out"
        />
        <main>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <ContactSection />
          <TestimonialsSection />
          <ProcessSection />
          <AboutSection />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
