import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
// Replace with your actual screenshot/image paths
import showcaseImageMain from '../../assets/3Uiplaceholder.png'; 

const AgencyLandingPage = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Data for Services ---
  const services = [
    {
      id: 'video',
      title: 'Video Production',
      description: 'Cinematic storytelling through high-end editing, color grading, and motion graphics that captivate your audience.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 10l5 5-5 5" />
          <path d="M4 4v16" />
          <path d="M9 4v16" />
          <path d="M14 4v16" />
          <path d="M19 4v16" />
        </svg>
      ),
      features: ['4K Editing', 'VFX & Motion', 'Sound Design', 'Color Grading']
    },
    {
      id: 'web',
      title: 'Web Development',
      description: 'Blazing fast, SEO-optimized websites built on modern stacks like React and Next.js. Built for scale and performance.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      features: ['Full Stack', 'E-Commerce', 'Performance', 'SEO']
    },
    {
      id: 'design',
      title: 'UI/UX Design',
      description: 'User-centric interfaces that convert. We craft design systems, logos, and brand identities that stand out.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      features: ['Brand Identity', 'Prototyping', 'Mobile Apps', 'Design Systems']
    }
  ];

  // --- Animation Variants ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Slower reveal for large images
  const imageReveal = {
    hidden: { opacity: 0, y: 60, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="agency-landing">
      <div className="agency-spotlight"></div>
      <div className="agency-bg-glow-bottom"></div>

      <div className="agency-container">
        
        {/* ================= 1. HERO CONTENT ================= */}
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="hero-badge" variants={fadeInUp}>
            <span className="hero-badge__icon">✨</span>
            Agency Portfolio Kit
          </motion.div>

          <motion.div className="hero-icon-box" variants={fadeInUp}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </motion.div>
          
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Build stunning digital <br />
            experiences <span className="text-highlight">faster.</span>
          </motion.h1>

          <motion.p className="hero-desc" variants={fadeInUp}>
            Scenoxis is a premium agency delivering high-converting websites and 
            applications. We turn complex challenges into elegant solutions.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeInUp}>
            <button className="agency-btn primary-btn" onClick={scrollToContact}>
              Start a Project
            </button>
            <button className="agency-btn secondary-btn">
              View Case Studies
            </button>
          </motion.div>

          <motion.div className="hero-features" variants={fadeInUp}>
            <div className="feature-item"><span className="icon">⚡</span><span>Rapid Delivery</span></div>
            <div className="feature-item"><span className="icon">📱</span><span>Fully Responsive</span></div>
            <div className="feature-item"><span className="icon">💎</span><span>Premium Design</span></div>
            <div className="feature-item"><span className="icon">🛡️</span><span>Scalable Tech</span></div>
          </motion.div>
        </motion.div>

        {/* ================= 2. IMAGE LOCATION 1 (Hero Bridge) ================= */}
        <motion.div 
          className="showcase-wrapper showcase-wrapper--hero"
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="showcase-inner">
            <img src={showcaseImageMain} alt="Main Agency Work Showcase" className="showcase-img" />
            <div className="showcase-overlay"></div>
          </div>
        </motion.div>

        {/* ================= 3. SERVICES SECTION ================= */}
        <div className="services-wrapper">
          <motion.div 
            className="services-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Expertise</span>
            <h2 className="section-title">
              Solutions that <span className="text-highlight">scale.</span>
            </h2>
            <p className="section-subtitle">
              We combine technical precision with creative flair to deliver digital products that leave a lasting impact.
            </p>
          </motion.div>

          <motion.div 
            className="services-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service) => (
              <motion.div 
                key={service.id} 
                className="service-card"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="service-icon-box">
                  {service.icon}
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                
                <div className="service-tags">
                  {service.features.map((feature, i) => (
                    <span key={i} className="service-tag">{feature}</span>
                  ))}
                </div>
                <div className="card-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= 4. IMAGE LOCATION 2 (Featured Project) ================= */}
        {/* Placed AFTER services to break the rhythm */}
        {/* <motion.div 
          className="showcase-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="showcase-header-small">
            <span className="section-label">Featured Project</span>
            <h3>E-Commerce Dashboard</h3>
          </div>
          <motion.div 
            className="showcase-wrapper showcase-wrapper--interstitial"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="showcase-inner">
              <img src={showcaseImageTwo} alt="Featured Project One" className="showcase-img" />
              <div className="showcase-overlay"></div>
            </div>
          </motion.div>
        </motion.div> */}

        {/* ================= 5. IMAGE LOCATION 3 (Final Visual) ================= */}
        {/* Placed before Footer to encourage contact */}
        {/* <motion.div 
          className="showcase-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="showcase-header-small">
            <span className="section-label">Latest Work</span>
            <h3>Mobile Application Design</h3>
          </div>
          <motion.div 
            className="showcase-wrapper showcase-wrapper--interstitial"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="showcase-inner">
              <img src={showcaseImageThree} alt="Featured Project Two" className="showcase-img" />
              <div className="showcase-overlay"></div>
            </div>
          </motion.div>
        </motion.div> */}


        {/* ================= 6. FOOTER CTA ================= */}
        <motion.div 
          className="services-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p>Want to reach to us..</p>
          <button 
            className="footer-link"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let get in touch &rarr;
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default AgencyLandingPage;