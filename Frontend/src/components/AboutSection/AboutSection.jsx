import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
import './AboutSection.css';

const AboutSection = () => {
  const { theme } = useTheme();

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'Every project is crafted with meticulous attention to detail and uncompromising quality standards.',
      icon: '✨'
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, ensuring their vision becomes our mission.',
      icon: '🤝'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from initial concept to final delivery.',
      icon: '🏆'
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <section id="about" className="about-section" style={{ background: '#000000' }}>
      
      
      <div className="about-section__container">
        <motion.div
          className="about-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-section__title">About Scenoxis</h2>
          <p className="about-section__subtitle">
            We are a creative agency passionate about bringing visions to life through innovative design and technology.
          </p>
        </motion.div>

        <div className="about-section__content">
          <motion.div
            className="about-section__story"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="about-section__story-title">Our Story</h3>
            <div className="about-section__story-content">
              <p>
                Founded in 2020, Scenoxis emerged from a simple belief: that great design and technology 
                can transform ideas into extraordinary experiences. We started as a small team of passionate 
                creators and have grown into a full-service creative agency.
              </p>
              <p>
                Our journey has been marked by continuous learning, innovation, and a commitment to 
                delivering exceptional results. We've had the privilege of working with startups, 
                established brands, and everything in between.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible, combining creativity 
                with cutting-edge technology to create solutions that not only meet but exceed our 
                clients' expectations.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-section__values"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="about-section__values-title">Our Values</h3>
            <div className="about-section__values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="about-section__value-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="about-section__value-icon">
                    {value.icon}
                  </div>
                  <h4 className="about-section__value-title">
                    {value.title}
                  </h4>
                  <p className="about-section__value-description">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about-section__stats"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about-section__stat">
            <div className="about-section__stat-number">50+</div>
            <div className="about-section__stat-label">Projects Completed</div>
          </div>
          <div className="about-section__stat">
            <div className="about-section__stat-number">30+</div>
            <div className="about-section__stat-label">Happy Clients</div>
          </div>
          <div className="about-section__stat">
            <div className="about-section__stat-number">4</div>
            <div className="about-section__stat-label">Years Experience</div>
          </div>
          <div className="about-section__stat">
            <div className="about-section__stat-number">100%</div>
            <div className="about-section__stat-label">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
