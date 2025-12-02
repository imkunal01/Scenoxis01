import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused useTheme import
import GradualBlur from '../GradualBlur';
import './PortfolioSection.css';

// --- Project Data ---
const projects = [
  {
    id: 1,
    title: 'EcoVision Brand Identity',
    category: 'design',
    image: '/api/placeholder/800/600',
    description: 'Complete brand identity design for sustainable energy company',
    tags: ['Branding', 'Logo Design', 'UI/UX'],
    year: '2024',
    embedSrc: 'https://www.behance.net/embed/project/238365077?ilo0=1',
    externalUrl: 'https://www.behance.net/gallery/238365077'
  },
  {
    id: 2,
    title: 'TechFlow Dashboard',
    category: 'web',
    image: '/api/placeholder/800/600?text=TechFlow+Dashboard+Screenshot',
    description: 'Modern admin dashboard with real-time analytics',
    tags: ['React', 'Dashboard', 'Analytics'],
    year: '2024',
    externalUrl: 'https://my-portfolio-two-cyan-79.vercel.app/'
  },
  {
    id: 3,
    title: 'Cinematic Product Launch',
    category: 'video',
    image: '/api/placeholder/800/600',
    description: 'High-end product launch video with motion graphics',
    tags: ['Video Editing', 'Motion Graphics', 'Color Grading'],
    year: '2024',
    embedSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Mc Donalds E-commerce',
    category: 'web',
    image: '/api/placeholder/800/600?text=McDonalds+E-commerce+Screenshot',
    description: 'E-commerce website for a fast-food brand concept',
    tags: ['E-commerce', 'Responsive', 'Next.js'],
    year: '2023',
    externalUrl: 'https://petv-88-g8qr.vercel.app/'
  },
  {
    id: 5,
    title: 'Fashion Week Campaign',
    category: 'video',
    image: '/api/placeholder/800/600',
    description: 'Fashion week promotional video series',
    tags: ['Video Production', 'Fashion', 'Social Media'],
    year: '2023',
    embedSrc: 'https://player.vimeo.com/video/899121855?h=b1368940e4'
  },
  {
    id: 6,
    title: 'Minimalist App UI/UX',
    category: 'design',
    image: '/api/placeholder/800/600',
    description: 'Mobile app UI/UX design for productivity tool',
    tags: ['Mobile App', 'UI/UX', 'Figma'],
    year: '2023',
    embedSrc: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F3X4LDeFadKoiCbNQU0fZ9h%2FUntitled%3Fnode-id%3D0-1%26m%3Ddev%26t%3DdIBXPi3LCnVqR4i6-1',
    externalUrl: 'https://www.figma.com/file/3X4LDeFadKoiCbNQU0fZ9h/Untitled?type=design&node-id=0-1&mode=design&t=dIBXPi3LCnVqR4i6-1'
  }
];

const filters = [
  { id: 'web', label: 'Web Development', icon: '💻' },
  { id: 'design', label: 'Design & Branding', icon: '🎨' },
  { id: 'video', label: 'Video Production', icon: '🎬' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// --- Sub-Components ---
const VideoProject = ({ project }) => (
  <motion.div className="project-card video-card" variants={itemVariants} layout>
    <div className="video-card__media-container">
      <iframe
        className="video-card__iframe"
        src={project.embedSrc}
        title={project.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <div className="project-card__info">
      <div className="project-card__meta">
        <span className="project-card__year">{project.year}</span>
        <span className="project-card__category">Video Editing</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag, i) => <span key={i} className="project-card__tag">{tag}</span>)}
      </div>
      <motion.button
        className="project-card__button"
        onClick={() => window.open(project.externalUrl || project.embedSrc, '_blank')}
      >
        View Source
      </motion.button>
    </div>
  </motion.div>
);

const DesignProject = ({ project }) => (
  <motion.div className="project-card design-card" variants={itemVariants} layout>
    <div className="design-card__embed-container">
      <iframe
        className="design-card__iframe"
        src={project.embedSrc}
        title={project.title}
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <div className="project-card__info">
      <div className="project-card__meta">
        <span className="project-card__year">{project.year}</span>
        <span className="project-card__category">Design</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag, i) => <span key={i} className="project-card__tag">{tag}</span>)}
      </div>
      <motion.button
        className="project-card__button"
        onClick={() => window.open(project.externalUrl, '_blank')}
      >
        View Full Case Study
      </motion.button>
    </div>
  </motion.div>
);

const WebProject = ({ project }) => (
  <motion.div className="project-card web-card" variants={itemVariants} layout>
    <div className="web-card__screenshot-container">
      <img src={project.image} alt={project.title} className="web-card__screenshot" loading="lazy" />
    </div>
    <div className="project-card__info">
      <div className="project-card__meta">
        <span className="project-card__year">{project.year}</span>
        <span className="project-card__category">Web Development</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag, i) => <span key={i} className="project-card__tag">{tag}</span>)}
      </div>
      <motion.button
        className="project-card__button project-card__button--primary"
        onClick={() => window.open(project.externalUrl, '_blank')}
      >
        Visit Live Site
      </motion.button>
    </div>
  </motion.div>
);

const PortfolioSection = () => {
  // Removed unused theme hook
  const [activeFilter, setActiveFilter] = useState('web');

  const filteredProjects = projects.filter(project => project.category === activeFilter);

  const getGridClass = (filter) => {
    switch (filter) {
      case 'video': return 'portfolio-grid--video';
      case 'design': return 'portfolio-grid--design';
      default: return 'portfolio-grid--web';
    }
  };

  const renderProject = (project) => {
    switch (project.category) {
      case 'video': return <VideoProject key={project.id} project={project} />;
      case 'design': return <DesignProject key={project.id} project={project} />;
      default: return <WebProject key={project.id} project={project} />;
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
          <h2 className="portfolio-section__title">Creative Works Showcase</h2>
          <p className="portfolio-section__subtitle">
            A curated look at our expertise across development, design, and motion.
          </p>
        </motion.div>

        <motion.div
          className="portfolio-section__tabs"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`portfolio-section__tab ${activeFilter === filter.id ? 'portfolio-section__tab--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="portfolio-section__tab-icon">{filter.icon}</span>
              <span className="portfolio-section__tab-label">{filter.label}</span>
              <span className="portfolio-section__tab-count">
                ({projects.filter(p => p.category === filter.id).length})
              </span>
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={`portfolio-section__grid ${getGridClass(activeFilter)}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map(renderProject)}
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="portfolio-section__cta"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="portfolio-section__cta-text">
            Ready for a custom solution? Let's discuss your next breakthrough project.
          </p>
          <motion.button
            className="portfolio-section__cta-button"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Conversation
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