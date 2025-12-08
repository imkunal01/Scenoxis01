import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
// We will style the button directly in CSS to match the specific form aesthetic, 
// but you can keep GlowButton if you prefer. I've used a custom one here.
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

  // const backendBaseUrl =  'http://localhost:5000';

  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const structuredMessage = `
Company: ${formData.company || 'N/A'}
Service: ${formData.service || 'N/A'}

Project Details:
${formData.message}
      `.trim();

      const res = await fetch(`${backendBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: structuredMessage
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
      console.error('Network Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const services = [
    'Web Development',
    'Video Production',
    'UI/UX Design',
    'Brand Identity',
    'SEO & Marketing',
    'Consultation',
  ];

  const contactDetails = [
    { label: 'Email', value: 'scenoxis@gmail.com', href: 'mailto:scenoxis@gmail.com' },
    { label: 'Phone', value: '+91 62660 89196', href: 'tel:+916266089196' },
    { label: 'Location', value: 'Punjab, India', href: '#' },
  ];

  return (
    <section id="contact" className="contact-section">
      {/* Background Ambient Glow */}
      <div className="contact-bg-glow"></div>
      
      <div className="contact-container">
        
        <div className="contact-grid">
          {/* LEFT SIDE: Typography & Info */}
          <motion.div 
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-header">
              <span className="contact-label">Start a Project</span>
              <h2 className="contact-heading">
                Let’s build <br />
                the <span className="text-outline">future.</span>
              </h2>
            </div>

            <div className="contact-info-list">
              {contactDetails.map((item, index) => (
                <div key={index} className="contact-info-item">
                  <span className="info-label">{item.label}</span>
                  <a href={item.href} className="info-value">{item.value}</a>
                </div>
              ))}
            </div>

            <div className="contact-socials">
               {/* Example Social Icons */}
               <a href="#" className="social-link">LinkedIn</a>
               <a href="#" className="social-link">Instagram</a>
               <a href="#" className="social-link">Twitter</a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: The Interface Form */}
          <motion.div 
            className="contact-right"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="form-card">
              <div className="form-header">
                <div className="form-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="form-title">New Message</div>
              </div>

              <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Your Name"
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Scenoxis123@gmail.com"
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Company (Optional)</label>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                      placeholder="Agency Ltd."
                    />
                  </div>
                  <div className="input-group">
                    <label>Service</label>
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleInputChange}
                      className="modern-select"
                    >
                      <option value="">Select a Service</option>
                      {services.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Tell us about your project</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    rows="4" 
                    placeholder="Tell us a brief about Project goals, timeframe, budget we will get in touch..."
                    required
                  ></textarea>
                </div>

                <div className="form-footer">
                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="btn-content">Sending...</span>
                    ) : submitStatus === 'success' ? (
                      <span className="btn-content">Message Sent ✓</span>
                    ) : submitStatus === 'error' ? (
                      <span className="btn-content">Try Again ✕</span>
                    ) : (
                      <span className="btn-content">Send Message &rarr;</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;