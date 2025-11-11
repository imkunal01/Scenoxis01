import React from 'react';
import { motion } from 'framer-motion';
import Aurora from '../Aurora';
import './HeroSection.css';
import image1 from '../../assets/ui611.png';
const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.4
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 1
      }
    },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section id="home" className="hero-section">
      {/* Aurora Background - always enabled, blue + violet palette */}
      <Aurora
        colorStops={["#3A29FF", "#8A2BE2", "#3A29FF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      
      <div className="hero-section__container">
        <div className="hero-section__content">
          {/* Left Side - Text Content */}
          <motion.div
            className="hero-section__left"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top Banner */}
            <motion.div
              className="hero-section__banner"
              variants={titleVariants}
            >
              <span className="hero-section__banner-text">Get special offers for small business</span>
              <span className="hero-section__banner-emoji">😉</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="hero-section__title"
              variants={titleVariants}
            >
              You think we build {' '}
              <span className="hero-section__title-highlight">
                Scenoxis
                <svg className="hero-section__title-underline" viewBox="0 0 200 20" fill="none">
                  <path d="M5 10 Q50 5 95 10 T185 10" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              className="hero-section__description"
              variants={subtitleVariants}
            >
              Scenoxis is helping small and big brands to grow and achieve their goals.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div
              className="hero-section__actions"
              variants={buttonVariants}
            >
              <button className="hero-section__cta-primary" onClick={scrollToContact} aria-label="Get started - scroll to contact form">
                Get Started
              </button>
              
              <button className="hero-section__cta-secondary" onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                <svg className="hero-section__play-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
                Watch Our Journey Of Building Brands
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            className="hero-section__right"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Image Grid */}
            <div className="hero-section__image-grid">
              {/* Top Left Image - Image Placeholder */}
              <motion.div
                className="hero-section__image hero-section__image--1"
                variants={titleVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="hero-section__image-placeholder">
                  {/* TODO: Replace with actual image - Recommended: 400x300px, 16:9 aspect ratio */}
                  <div 
                    className="hero-section__placeholder-image"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  />
                </div>
                <div className="hero-section__logo-overlay hero-section__logo-overlay--slack">
                  <span>CLEAN & SIMPLE</span>
                </div>
              </motion.div>

              {/* Main Center Image - Image Placeholder */}
              <motion.div
                className="hero-section__image hero-section__image--2"
                variants={subtitleVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="hero-section__image-placeholder">
                  {/* TODO: Replace with actual image - Recommended: 600x400px, 3:2 aspect ratio */}
                  <img 
                    src={image1} 
                    alt="Hero showcase image 2 - Replace with your main brand imagery"
                    className="hero-section__placeholder-image"
                    loading="lazy"
                  />
                </div>
                <div className="hero-section__logo-overlay hero-section__logo-overlay--slack">
                  <span>KEEN DESIGN</span>
                </div>
                <div className="hero-section__logo-overlay hero-section__logo-overlay--mandiri">
                  <span>UI/UX</span>
                </div>
                <div className="hero-section__logo-overlay hero-section__logo-overlay--boxes">
                  <div className="hero-section__boxes-icon"></div>
                </div>
              </motion.div>

              {/* Bottom Left Image - Image Placeholder */}
              <motion.div
                className="hero-section__image hero-section__image--3"
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="hero-section__image-placeholder">
                  {/* TODO: Replace with actual image - Recommended: 400x300px, 4:3 aspect ratio */}
                  <div 
                    className="hero-section__placeholder-image"
                    style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                  />
                </div>
                <div className="hero-section__logo-overlay hero-section__logo-overlay--security">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="currentColor"/>
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Floating Icons */}
            <div className="hero-section__floating-icons">
              <motion.div
                className="hero-section__floating-icon hero-section__floating-icon--chart"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 9L12 6L16 10L20 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </motion.div>

              <motion.div
                className="hero-section__floating-icon hero-section__floating-icon--heart"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" fill="currentColor"/>
                </svg>
              </motion.div>

              <motion.div
                className="hero-section__floating-icon hero-section__floating-icon--play"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="currentColor"/>
                  <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                </svg>
              </motion.div>

              <motion.div
                className="hero-section__floating-icon hero-section__floating-icon--check"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
