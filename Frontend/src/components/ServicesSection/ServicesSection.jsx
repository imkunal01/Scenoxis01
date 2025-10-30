import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
import './ServicesSection.css';

const ServicesSection = () => {
  const { theme, changeTheme, themes } = useTheme();

  const services = [
    {
      id: 'video',
      title: 'Video Editing',
      description: 'Professional video editing and post-production services that bring your stories to life with stunning visuals and seamless transitions.',
      icon: '🎥',
      features: ['Color Grading', 'Motion Graphics', 'Audio Sync', '4K Processing'],
      theme: themes.video
    },
    {
      id: 'web',
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies and optimized for performance.',
      icon: '💻',
      features: ['React/Next.js', 'Responsive Design', 'SEO Optimization', 'Performance'],
      theme: themes.web
    },
    {
      id: 'design',
      title: 'Graphic Design',
      description: 'Creative visual solutions including branding, UI/UX design, and digital artwork that captures your brand essence.',
      icon: '🎨',
      features: ['Brand Identity', 'UI/UX Design', 'Print Design', 'Digital Art'],
      theme: themes.design
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleServiceClick = (serviceId) => {
    changeTheme(serviceId);
  };

  return (
    <section id="services" className="services-section" style={{ background: '#000000' }}>
      
      
      <div className="services-section__container">
        <motion.div
          className="services-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="services-section__title">Our Services</h2>
          <p className="services-section__subtitle">
            We offer comprehensive creative solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          className="services-section__grid"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`services-section__card ${theme.name === service.theme.name ? 'services-section__card--active' : ''}`}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleServiceClick(service.id)}
              style={{
                '--service-accent': service.theme.accent,
                '--service-glow': service.theme.accentGlow,
                '--service-bg': service.theme.cardBg,
                '--service-border': service.theme.border
              }}
            >
              <div className="services-section__card-header">
                <div className="services-section__card-icon">
                  {service.icon}
                </div>
                <h3 className="services-section__card-title">
                  {service.title}
                </h3>
              </div>
              
              <p className="services-section__card-description">
                {service.description}
              </p>
              
              <div className="services-section__card-features">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="services-section__card-feature"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="services-section__card-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="services-section__cta"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="services-section__cta-text">
            Ready to bring your vision to life? Let's discuss your project.
          </p>
          <motion.button
            className="services-section__cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
