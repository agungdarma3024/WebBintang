import React from 'react';
import { Users, Video, Palette, Camera, Award, Megaphone, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const services = [
  {
    icon: Users,
    title: 'MICE Event Organizer',
    description: 'Complete management of Meetings, Incentives, Conventions, and Exhibitions with meticulous attention to every detail.',
    features: ['Strategic Planning', 'Venue Management', 'Logistics Coordination', 'On-site Support']
  },
  {
    icon: Video,
    title: 'Multimedia Production',
    description: 'State-of-the-art multimedia production services bringing your events to life with cutting-edge technology.',
    features: ['Video Production', 'Live Streaming', 'Audio Engineering', 'Technical Direction']
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Creative design solutions that capture your brand essence and make lasting impressions on your audience.',
    features: ['Event Branding', 'Print Materials', 'Digital Graphics', 'Signage Design']
  },
  {
    icon: Camera,
    title: 'Photography Services',
    description: 'Professional photography capturing every memorable moment with artistic excellence and technical precision.',
    features: ['Event Coverage', 'Portrait Photography', 'Product Shoots', 'Post-Production']
  },
  {
    icon: Award,
    title: 'Ceremonies & Awards',
    description: 'Flawless execution of ceremonies and award shows that celebrate achievements with elegance and impact.',
    features: ['Show Production', 'Talent Coordination', 'Stage Management', 'Awards Logistics']
  },
  {
    icon: Megaphone,
    title: 'Marketing & Branding',
    description: 'Strategic marketing solutions and branding services to elevate your events and maximize audience engagement.',
    features: ['Campaign Strategy', 'Brand Activation', 'Promotional Materials', 'Social Media']
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Confidence in every{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
              detail
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With so much on the line, ensure that small issues don't become big problems. Rely on our expertise to anticipate and plan for every possibility.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-amber-200 bg-white"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-amber-600" size={28} />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              From vision to execution, we've got your back
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to create an unforgettable event? Let's discuss how we can bring your vision to life.
            </p>
            <Button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg group"
              size="lg"
            >
              Get in touch
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
