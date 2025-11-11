import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
import GlowButton from '../GlowButton';
import './ContactSection.css';

const ContactSection = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🧠 UPDATED handleSubmit with backend + mailer integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch( 'http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `
            Company: ${formData.company || 'N/A'}
            Service: ${formData.service || 'N/A'}
            Project Details: ${formData.message}
          `
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const services = [
    'Video Editing',
    'Web Development',
    'Graphic Design',
    'Consultation',
    'Social Media',
    'SEO',
    'Web Design',
    'Web Development',
    'Web Hosting',
    'Web Maintenance',
    'Web Hosting',
  ];
  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'scenoxis@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '*916266089196',
      description: 'Call us during business hours'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'PHAGWARA, PUNJAB',
      description: 'Visit our creative studio'
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
    <section id="contact" className="contact-section">
      <BackgroundEffects type="particles" intensity="medium" />
      
      <div className="contact-section__container">
        <motion.div
          className="contact-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-section__title">Get In Touch</h2>
          <p className="contact-section__subtitle">
            Ready to start your next project? Let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <div className="contact-section__content">
          <motion.div
            className="contact-section__info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="contact-section__info-title">Let's Connect</h3>
            <p className="contact-section__info-description">
              We're always excited to hear about new projects and opportunities. 
              Reach out to us and let's create something amazing together.
            </p>
            
            <div className="contact-section__info-items">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-section__info-item"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="contact-section__info-icon">
                    {info.icon}
                  </div>
                  <div className="contact-section__info-content">
                    <h4 className="contact-section__info-item-title">
                      {info.title}
                    </h4>
                    <p className="contact-section__info-item-value">
                      {info.value}
                    </p>
                    <p className="contact-section__info-item-description">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-section__form-container"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-section__form" onSubmit={handleSubmit}>
              <div className="contact-section__form-row">
                <div className="contact-section__form-group">
                  <label htmlFor="name" className="contact-section__form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="contact-section__form-input"
                    required
                  />
                </div>
                
                <div className="contact-section__form-group">
                  <label htmlFor="email" className="contact-section__form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact-section__form-input"
                    required
                  />
                </div>
              </div>

              <div className="contact-section__form-row">
                <div className="contact-section__form-group">
                  <label htmlFor="company" className="contact-section__form-label">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="contact-section__form-input"
                  />
                </div>
                
                <div className="contact-section__form-group">
                  <label htmlFor="service" className="contact-section__form-label">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="contact-section__form-select"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-section__form-group">
                <label htmlFor="message" className="contact-section__form-label">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="contact-section__form-textarea"
                  rows="5"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  required
                />
              </div>

              <GlowButton
                type="submit"
                variant="primary"
                size="lg"
                className="contact-section__form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </GlowButton>

              {submitStatus === 'success' && (
                <motion.div
                  className="contact-section__success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="contact-section__error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ❌ Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
