import React, { memo } from 'react';
import { BookOpen, Users, Award, Clock, Shield, Zap } from 'lucide-react';
import { Card, LazyImage } from './common/index.js';

/**
 * Feature section showcasing key platform benefits
 */
const FeatureSection = memo(() => {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Curated Content',
      description: 'Learn from industry professionals with real-world experience and proven track records.',
      image: '/images/photo-1522202176988-66273c2fd55f.jpg',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Interactive Learning',
      description: 'Engage with peers, join study groups, and participate in live Q&A sessions.',
      image: '/images/photo-1556761175-b413da4baf72.jpg',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Industry Certificates',
      description: 'Earn recognized certificates that boost your career and validate your skills.',
      image: '/images/photo-1434030216411-0b793f4b4173.jpg',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with lifetime access to all course materials.',
      image: '/images/photo-1506905925346-21bda4d32df4.jpg',
      color: 'orange'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and progress are protected with enterprise-grade security.',
      image: '/images/photo-1563013544-824ae1b704d3.jpg',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Fast-Track Learning',
      description: 'Accelerated learning paths designed to get you job-ready quickly.',
      image: '/images/photo-1553028826-f4804a6dba3b.jpg',
      color: 'yellow'
    }
  ];

  const colorClasses = {
    blue: 'bg-brand-500',
    green: 'bg-success',
    purple: 'bg-brand-600',
    orange: 'bg-warning',
    red: 'bg-error',
    yellow: 'bg-warning'
  };

  return (
    <section className="py-16 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Mentora?
          </h2>
          <p className="text-base text-ink-soft max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods 
            to deliver an unparalleled learning experience that fits your lifestyle.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              hover 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Feature Image */}
              <div className="relative h-48 -m-6 mb-6 overflow-hidden">
                <LazyImage
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover duration-500"
                />
                <div className="absolute inset-0 image-scrim" />
                <div className="absolute bottom-4 left-4">
                  <div className={`w-12 h-12 ${colorClasses[feature.color]} rounded-xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Feature Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-ink group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-ink-soft leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Join 50,000+ successful learners
          </div>
          <p className="text-ink-soft">
            Ready to your career? Start learning today with our expert-led courses.
          </p>
        </div>
      </div>
    </section>
  );
});

FeatureSection.displayName = 'FeatureSection';

export default FeatureSection;
