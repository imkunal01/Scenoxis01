import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundEffects from '../BackgroundEffects';
import './TeamSection.css';

const TeamSection = () => {
  const { theme } = useTheme();
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Creative Director',
      image: '/api/placeholder/300/300',
      bio: 'Visionary leader with 10+ years in creative direction',
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Lead Developer',
      image: '/api/placeholder/300/300',
      bio: 'Full-stack developer passionate about cutting-edge technology',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      role: 'Video Editor',
      image: '/api/placeholder/300/300',
      bio: 'Award-winning video editor and motion graphics specialist',
      social: {
        linkedin: '#',
        vimeo: '#',
        instagram: '#'
      }
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'UI/UX Designer',
      image: '/api/placeholder/300/300',
      bio: 'User experience designer focused on creating intuitive interfaces',
      social: {
        linkedin: '#',
        dribbble: '#',
        behance: '#'
      }
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

  const memberVariants = {
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
    <section className="team-section" style={{ background: '#000000' }}>
      
      <div className="team-section__container">
        <motion.div
          className="team-section__header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="team-section__title">Meet Our Team</h2>
          <p className="team-section__subtitle">
            The creative minds behind Scenoxis - passionate professionals dedicated to excellence
          </p>
        </motion.div>

        <motion.div
          className="team-section__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="team-section__member"
              variants={memberVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <div className="team-section__member-image">
                <img 
                  src={member.image} 
                  alt={member.name}
                  loading="lazy"
                />
                <div className="team-section__member-overlay">
                  <div className="team-section__member-social">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <motion.a
                        key={platform}
                        href={url}
                        className="team-section__social-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className={`team-section__social-icon team-section__social-icon--${platform}`}>
                          {platform === 'linkedin' && '💼'}
                          {platform === 'twitter' && '🐦'}
                          {platform === 'github' && '🐙'}
                          {platform === 'dribbble' && '🏀'}
                          {platform === 'vimeo' && '🎬'}
                          {platform === 'instagram' && '📷'}
                          {platform === 'behance' && '🎨'}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="team-section__member-info">
                <h3 className="team-section__member-name">{member.name}</h3>
                <p className="team-section__member-role">{member.role}</p>
                <p className="team-section__member-bio">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
