import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
import './ProcessSection.css';

const ProcessSection = () => {
  const { theme } = useTheme();

  const processSteps = [
    {
      id: 1,
      title: 'Concept',
      description: 'We start by understanding your vision, goals, and requirements through detailed discussions and research.',
      icon: '💡',
      details: ['Initial Consultation', 'Project Analysis', 'Strategy Planning', 'Timeline Creation']
    },
    {
      id: 2,
      title: 'Design',
      description: 'Our creative team develops stunning visual concepts and prototypes that align with your brand identity.',
      icon: '🎨',
      details: ['Visual Concepts', 'Prototyping', 'Brand Integration', 'Client Feedback']
    },
    {
      id: 3,
      title: 'Develop',
      description: 'We bring your ideas to life using cutting-edge technologies and best practices for optimal performance.',
      icon: '⚡',
      details: ['Technical Implementation', 'Quality Assurance', 'Performance Optimization', 'Testing']
    },
    {
      id: 4,
      title: 'Deliver',
      description: 'We launch your project and provide ongoing support to ensure continued success and growth.',
      icon: '🚀',
      details: ['Project Launch', 'Training & Documentation', 'Ongoing Support', 'Future Enhancements']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
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

  return (
    <section className="process-section" style={{ background: '#000000' }}>
      
      
      <div className="process-section__container">
        <motion.div
          className="process-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="process-section__title">Our Process</h2>
          <p className="process-section__subtitle">
            We follow a proven methodology to ensure every project exceeds expectations
          </p>
        </motion.div>

        <motion.div
          className="process-section__timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="process-section__step"
              variants={stepVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="process-section__step-number">
                <span className="process-section__step-icon">{step.icon}</span>
                <div className="process-section__step-pulse"></div>
              </div>
              
              <div className="process-section__step-content">
                <h3 className="process-section__step-title">{step.title}</h3>
                <p className="process-section__step-description">
                  {step.description}
                </p>
                
                <div className="process-section__step-details">
                  {step.details.map((detail, detailIndex) => (
                    <span
                      key={detailIndex}
                      className="process-section__step-detail"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="process-section__connector">
                  <div className="process-section__connector-line"></div>
                  <div className="process-section__connector-dot"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="process-section__cta"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="process-section__cta-content">
            <h3 className="process-section__cta-title">Ready to Start Your Project?</h3>
            <p className="process-section__cta-text">
              Let's discuss your ideas and create something extraordinary together.
            </p>
            <motion.button
              className="process-section__cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
