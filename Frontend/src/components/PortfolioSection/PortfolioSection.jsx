import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
import GradualBlur from '../GradualBlur';
import './PortfolioSection.css';

const PortfolioSection = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'EcoVision Brand Identity',
      category: 'design',
      image: '/api/placeholder/400/300',
      description: 'Complete brand identity design for sustainable energy company',
      tags: ['Branding', 'Logo Design', 'UI/UX'],
      year: '2024'
    },
    {
      id: 2,
      title: 'TechFlow Dashboard',
      category: 'web',
      image: '/api/placeholder/400/300',
      description: 'Modern admin dashboard with real-time analytics',
      tags: ['React', 'Dashboard', 'Analytics'],
      year: '2024'
    },
    {
      id: 3,
      title: 'Cinematic Product Launch',
      category: 'video',
      image: '/api/placeholder/400/300',
      description: 'High-end product launch video with motion graphics',
      tags: ['Video Editing', 'Motion Graphics', 'Color Grading'],
      year: '2024'
    },
    {
      id: 4,
      title: 'Artisan Coffee Website',
      category: 'web',
      image: '/api/placeholder/400/300',
      description: 'E-commerce website for premium coffee brand',
      tags: ['E-commerce', 'Responsive', 'SEO'],
      year: '2023'
    },
    {
      id: 5,
      title: 'Fashion Week Campaign',
      category: 'video',
      image: '/api/placeholder/400/300',
      description: 'Fashion week promotional video series',
      tags: ['Video Production', 'Fashion', 'Social Media'],
      year: '2023'
    },
    {
      id: 6,
      title: 'Minimalist App Design',
      category: 'design',
      image: '/api/placeholder/400/300',
      description: 'Mobile app UI/UX design for productivity tool',
      tags: ['Mobile App', 'UI/UX', 'Prototyping'],
      year: '2023'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'design', label: 'Design', count: projects.filter(p => p.category === 'design').length },
    { id: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
    { id: 'video', label: 'Video Editing', count: projects.filter(p => p.category === 'video').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
    <section id="portfolio" className="portfolio-section" style={{ background: '#000000' }}>
      
      
      <div className="portfolio-section__container">
        <motion.div
          className="portfolio-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="portfolio-section__title">Our Portfolio</h2>
          <p className="portfolio-section__subtitle">
            Explore our latest creative projects and see how we bring ideas to life
          </p>
        </motion.div>

        <motion.div
          className="portfolio-section__filters"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`portfolio-section__filter ${activeFilter === filter.id ? 'portfolio-section__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="portfolio-section__filter-label">{filter.label}</span>
              <span className="portfolio-section__filter-count">({filter.count})</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio-section__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="portfolio-section__projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="portfolio-section__project"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  layout
                >
                  <div className="portfolio-section__project-image">
                    {/* Video Player for Video Editing Projects */}
                    {project.category === 'video' && (
                      <div className="portfolio-section__video-container">
                        {/* TODO: Replace video source with your actual video files */}
                        <video
                          className="portfolio-section__project-video"
                          controls
                          poster={project.image}
                          aria-label={`${project.title} video preview`}
                        >
                          {/* Add your video sources here - MP4 and WebM formats supported */}
                          <source src="/videos/sample-video.mp4" type="video/mp4" />
                          <source src="/videos/sample-video.webm" type="video/webm" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Image Gallery for Design Projects */}
                    {project.category === 'design' && (
                      <div className="portfolio-section__image-gallery">
                        {/* TODO: Replace with your actual design images */}
                        <img 
                          src={project.image} 
                          alt={`${project.title} - Main design showcase`}
                          className="portfolio-section__project-main-image"
                          loading="lazy"
                        />
                        <div className="portfolio-section__image-grid">
                          {/* Additional image placeholders for design gallery */}
                          <div 
                            className="portfolio-section__gallery-image"
                            style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}
                            aria-label="Design showcase image 1 - Replace with your design work"
                          />
                          <div 
                            className="portfolio-section__gallery-image"
                            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                            aria-label="Design showcase image 2 - Replace with your design work"
                          />
                          <div 
                            className="portfolio-section__gallery-image"
                            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}
                            aria-label="Design showcase image 3 - Replace with your design work"
                          />
                        </div>
                      </div>
                    )}

                    {/* Website Preview for Web Development Projects */}
                    {project.category === 'web' && (
                      <div className="portfolio-section__website-preview">
                        {/* Browser frame mockup */}
                        <div className="portfolio-section__browser-frame">
                          <div className="portfolio-section__browser-header">
                            <div className="portfolio-section__browser-dots">
                              <span className="portfolio-section__browser-dot portfolio-section__browser-dot--red"></span>
                              <span className="portfolio-section__browser-dot portfolio-section__browser-dot--yellow"></span>
                              <span className="portfolio-section__browser-dot portfolio-section__browser-dot--green"></span>
                            </div>
                            <div className="portfolio-section__browser-address-bar">
                              {/* TODO: Replace with your actual website URL or use static image */}
                              <span>your-website-url.com</span>
                            </div>
                          </div>
                          <div className="portfolio-section__browser-content">
                            {/* TODO: Replace with your actual website screenshot or live preview */}
                            <img 
                              src={project.image} 
                              alt={`${project.title} - Website preview`}
                              className="portfolio-section__website-screenshot"
                              loading="lazy"
                            />
                            {/* Alternative: Use iframe for live preview (uncomment below and comment out img above) */}
                            {/* <iframe 
                              src="https://your-website-url.com" 
                              className="portfolio-section__website-iframe"
                              title={`${project.title} live preview`}
                              loading="lazy"
                            ></iframe> */}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="portfolio-section__project-overlay">
                      <div className="portfolio-section__project-overlay-content">
                        <h3 className="portfolio-section__project-title">
                          {project.title}
                        </h3>
                        <p className="portfolio-section__project-description">
                          {project.description}
                        </p>
                        <div className="portfolio-section__project-tags">
                          {project.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="portfolio-section__project-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="portfolio-section__project-actions">
                          <motion.button
                            className="portfolio-section__project-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`View ${project.title} project details`}
                          >
                            View Project
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-section__project-info">
                    <div className="portfolio-section__project-meta">
                      <span className="portfolio-section__project-year">{project.year}</span>
                      <span className="portfolio-section__project-category">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="portfolio-section__cta"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="portfolio-section__cta-text">
            Interested in working together? Let's create something amazing.
          </p>
          <motion.button
            className="portfolio-section__cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
      
      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={0.6}
      />
    </section>
  );
};

export default PortfolioSection;
