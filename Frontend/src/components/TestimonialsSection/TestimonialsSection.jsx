import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      image: '/api/placeholder/80/80',
      quote: 'Scenoxis transformed our brand identity completely. Their attention to detail and creative vision exceeded our expectations. The team delivered beyond what we imagined.',
      rating: 5,
      project: 'Brand Identity & Web Design'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Director',
      company: 'Creative Agency',
      image: '/api/placeholder/80/80',
      quote: 'The video production quality is outstanding. They captured our vision perfectly and delivered a cinematic experience that elevated our product launch.',
      rating: 5,
      project: 'Product Launch Video'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'EcoVision',
      image: '/api/placeholder/80/80',
      quote: 'Working with Scenoxis was a game-changer. Their web development skills and design expertise helped us create a platform that truly represents our mission.',
      rating: 5,
      project: 'E-commerce Platform'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Creative Director',
      company: 'Fashion Forward',
      image: '/api/placeholder/80/80',
      quote: 'The team\'s creativity and technical expertise are unmatched. They brought our fashion campaign to life with stunning visuals and seamless execution.',
      rating: 5,
      project: 'Fashion Campaign'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonialVariants = {
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
    <section className="testimonials-section" style={{ background: '#000000' }}>
      
      <div className="testimonials-section__container">
        <motion.div
          className="testimonials-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="testimonials-section__title">What Our Clients Say</h2>
          <p className="testimonials-section__subtitle">
            Don't just take our word for it - hear from the amazing clients we've worked with
          </p>
        </motion.div>

        <motion.div
          className="testimonials-section__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="testimonials-section__carousel">
            <motion.div
              className="testimonials-section__testimonial"
              key={currentTestimonial}
              variants={testimonialVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="testimonials-section__quote-container">
                <div className="testimonials-section__quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <blockquote className="testimonials-section__quote">
                  {testimonials[currentTestimonial].quote}
                </blockquote>
                <div className="testimonials-section__rating">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="testimonials-section__star">★</span>
                  ))}
                </div>
              </div>
              
              <div className="testimonials-section__author">
                <div className="testimonials-section__author-image">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                  />
                </div>
                <div className="testimonials-section__author-info">
                  <h4 className="testimonials-section__author-name">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="testimonials-section__author-role">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="testimonials-section__author-company">
                    {testimonials[currentTestimonial].company}
                  </p>
                  <div className="testimonials-section__project">
                    {testimonials[currentTestimonial].project}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="testimonials-section__controls">
            <motion.button
              className="testimonials-section__nav-button"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            
            <div className="testimonials-section__dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`testimonials-section__dot ${index === currentTestimonial ? 'testimonials-section__dot--active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
            
            <motion.button
              className="testimonials-section__nav-button"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
