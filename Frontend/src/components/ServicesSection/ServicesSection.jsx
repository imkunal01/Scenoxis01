import React from 'react';
import { motion } from 'framer-motion';
import './ServicesSection.css';

const ServicesSection = () => {
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
      description: 'Blazing fast, SEO-optimized websites built on modern stacks like React and Next.js. We build for scale and performance.',
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="services" className="services-section">
      {/* Background ambient glow to match Hero */}
      <div className="services-bg-glow"></div>

      <div className="services-container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="services-badge">Our Expertise</span>
          <h2 className="services-title">
            Solutions that <span className="text-highlight">scale.</span>
          </h2>
          <p className="services-subtitle">
            We combine technical precision with creative flair to deliver digital products that leave a lasting impact.
          </p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="service-card__icon-wrapper">
                {service.icon}
              </div>
              
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              
              <div className="service-card__features">
                {service.features.map((feature, i) => (
                  <span key={i} className="feature-tag">{feature}</span>
                ))}
              </div>

              {/* Decorative hover glow */}
              <div className="service-card__glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="services-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p>Got a specific challenge?</p>
          <button 
            className="services-cta-link"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's talk about it &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;