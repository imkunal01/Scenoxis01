import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();

  const footerLinks = {
    services: [
      { name: 'Video Editing', href: '#services' },
      { name: 'Web Development', href: '#services' },
      { name: 'Graphic Design', href: '#services' },
      { name: 'Brand Identity', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Dribbble', href: '#', icon: '🏀' },
    { name: 'GitHub', href: '#', icon: '🐙' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <footer className="footer">
      <div className="footer__container">
        <motion.div
          className="footer__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="footer__main">
            <motion.div
              className="footer__brand"
              variants={itemVariants}
            >
              <div className="footer__logo">
                <span className="footer__logo-text">Scenoxis</span>
                <span className="footer__logo-icon">{theme.icon}</span>
              </div>
              <p className="footer__description">
                Bringing visions to life through innovative design and cutting-edge technology. 
                We create extraordinary digital experiences that inspire and engage.
              </p>
              <div className="footer__social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="footer__social-link"
                    whileHover={{ 
                      scale: 1.2,
                      y: -2
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="footer__social-icon">{social.icon}</span>
                    <span className="footer__social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <div className="footer__links">
              <motion.div
                className="footer__link-group"
                variants={itemVariants}
              >
                <h4 className="footer__link-title">Services</h4>
                <ul className="footer__link-list">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer__link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="footer__link-group"
                variants={itemVariants}
              >
                <h4 className="footer__link-title">Company</h4>
                <ul className="footer__link-list">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer__link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="footer__link-group"
                variants={itemVariants}
              >
                <h4 className="footer__link-title">Resources</h4>
                <ul className="footer__link-list">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="footer__link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="footer__bottom"
            variants={itemVariants}
          >
            <div className="footer__bottom-content">
              <p className="footer__copyright">
                © 2024 Scenoxis. All rights reserved. Made with ❤️ by our creative team.
              </p>
              <div className="footer__legal">
                <a href="#" className="footer__legal-link">Privacy Policy</a>
                <a href="#" className="footer__legal-link">Terms of Service</a>
                <a href="#" className="footer__legal-link">Cookie Policy</a>
              </div>
            </div>
            
            <motion.button
              className="footer__scroll-top"
              onClick={scrollToTop}
              whileHover={{ 
                scale: 1.1,
                y: -2
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
