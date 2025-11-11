import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
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
      year: '2024',
      behanceUrl: 'https://www.behance.net/embed/project/238365077?ilo0=1',
      behanceEmbedSrc: 'https://www.behance.net/embed/project/238365077?ilo0=1'
    },
    {
      id: 2,
      title: 'TechFlow Dashboard',
      category: 'web',
      image: '/api/placeholder/400/300',
      description: 'Modern admin dashboard with real-time analytics',
      tags: ['React', 'Dashboard', 'Analytics'],
      year: '2024',
      url: 'https://example.com/techflow'
    },
    {
      id: 3,
      title: 'Cinematic Product Launch',
      category: 'video',
      image: '/api/placeholder/400/300',
      description: 'High-end product launch video with motion graphics',
      tags: ['Video Editing', 'Motion Graphics', 'Color Grading'],
      year: '2024',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Artisan Coffee Website',
      category: 'web',
      image: '/api/placeholder/400/300',
      description: 'E-commerce website for premium coffee brand',
      tags: ['E-commerce', 'Responsive', 'SEO'],
      year: '2023',
      url: 'https://example.com/artisan-coffee'
    },
    {
      id: 5,
      title: 'Fashion Week Campaign',
      category: 'video',
      image: '/api/placeholder/400/300',
      description: 'Fashion week promotional video series',
      tags: ['Video Production', 'Fashion', 'Social Media'],
      year: '2023',
      youtubeUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0'
    },
    {
      id: 6,
      title: 'Minimalist App Design',
      category: 'design',
      image: '/api/placeholder/400/300',
      description: 'Mobile app UI/UX design for productivity tool',
      tags: ['Mobile App', 'UI/UX', 'Prototyping'],
      year: '2023',
      figmaUrl: 'https://www.figma.com/design/3X4LDeFadKoiCbNQU0fZ9h/Untitled?node-id=0-1&m=dev&t=dIBXPi3LCnVqR4i6-1',
      figmaEmbedSrc: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F3X4LDeFadKoiCbNQU0fZ9h%2FUntitled%3Fnode-id%3D0-1%26m%3Ddev%26t%3DdIBXPi3LCnVqR4i6-1'
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
                  className={`portfolio-section__project portfolio-section__project--${project.category}`}
                  variants={itemVariants}
                  whileHover={project.category === 'web' ? { y: -10, transition: { duration: 0.3 } } : undefined}
                  layout
                >
                  <div className="portfolio-section__project-image">
                    {/* Video Player for Video Editing Projects */}
                    {project.category === 'video' && (
                      <div className="portfolio-section__video-container">
                        <iframe
                          className="portfolio-section__project-video"
                          src={project.youtubeUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                          title={`${project.title} YouTube video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* Design Projects: Behance or Figma embed (if provided) or image gallery */}
                    {project.category === 'design' && (
                      project.behanceEmbedSrc ? (
                        <div className="portfolio-section__design-embed">
                          <iframe
                            className="portfolio-section__project-embed"
                            src={project.behanceEmbedSrc}
                            height="316"
                            width="404"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                            allow="clipboard-write"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title={`${project.title} Behance embed`}
                          />
                        </div>
                      ) : project.figmaEmbedSrc ? (
                        <div className="portfolio-section__design-embed">
                          <iframe
                            className="portfolio-section__project-embed"
                            src={project.figmaEmbedSrc}
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title={`${project.title} Figma embed`}
                          />
                        </div>
                      ) : (
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
                      )
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
                              <span>{project.url || 'your-website-url.com'}</span>
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

                    {project.category === 'web' && (
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
                            {project.category === 'web' && project.url ? (
                              <motion.button
                                className="portfolio-section__project-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Visit ${project.title} website`}
                                onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                              >
                                Visit Website
                              </motion.button>
                            ) : (
                              <motion.button
                                className="portfolio-section__project-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`View ${project.title} project details`}
                              >
                                View Project
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="portfolio-section__project-info">
                    <div className="portfolio-section__project-meta">
                      <span className="portfolio-section__project-year">{project.year}</span>
                      <span className="portfolio-section__project-category">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>
                    {project.category === 'design' && (
                      <div style={{ marginTop: 'var(--space-md)' }}>
                        <h3 className="portfolio-section__project-title">{project.title}</h3>
                        <p className="portfolio-section__project-description">{project.description}</p>
                        <div className="portfolio-section__project-tags">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="portfolio-section__project-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.category === 'web' && project.url && (
                      <div className="portfolio-section__project-actions" style={{ marginTop: 'var(--space-md)' }}>
                        <motion.button
                          className="portfolio-section__project-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Visit ${project.title} website`}
                          onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                        >
                          Visit Website
                        </motion.button>
                      </div>
                    )}
                    {project.category === 'design' && (project.behanceUrl || project.figmaUrl) && (
                      <div className="portfolio-section__project-actions" style={{ marginTop: 'var(--space-md)' }}>
                        {project.behanceUrl && (
                          <motion.button
                            className="portfolio-section__project-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`View ${project.title} on Behance`}
                            onClick={() => window.open(project.behanceUrl, '_blank', 'noopener,noreferrer')}
                          >
                            View on Behance
                          </motion.button>
                        )}
                        {project.figmaUrl && (
                          <motion.button
                            className="portfolio-section__project-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`View ${project.title} on Figma`}
                            onClick={() => window.open(project.figmaUrl, '_blank', 'noopener,noreferrer')}
                          >
                            View on Figma
                          </motion.button>
                        )}
                      </div>
                    )}
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
