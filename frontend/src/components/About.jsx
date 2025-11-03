import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                  Bintang Solusindo Abadi
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                CV. Bintang Solusindo Abadi is a leading event organizer and multimedia production company specializing in creating exceptional experiences. With over a decade of expertise, we deliver world-class events with precision, creativity, and professionalism.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-amber-500">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be a company that always satisfies all client's requisites by high quality services as well as serving the opportunities, ideas and innovation for the next development projects, through performing high commitments, responsibilities, and professionalism.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Items */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <div className="grid gap-4">
                <div className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="text-amber-600" size={18} />
                  </div>
                  <p className="text-gray-700">
                    Develop qualified and experienced expert teams dedicated to excellence
                  </p>
                </div>
                <div className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="text-amber-600" size={18} />
                  </div>
                  <p className="text-gray-700">
                    Ensure high output quality with accountability and professionalism
                  </p>
                </div>
                <div className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="text-amber-600" size={18} />
                  </div>
                  <p className="text-gray-700">
                    Establish wide relations and networks at national and international levels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Stats & Features */}
          <div className="space-y-6">
            {/* Large Stats Card */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl p-10 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Why Choose Us?</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold mb-2">10+</div>
                  <div className="text-amber-100 text-lg">Years of Industry Excellence</div>
                </div>
                <div className="h-px bg-amber-500/30"></div>
                <div>
                  <div className="text-5xl font-bold mb-2">500+</div>
                  <div className="text-amber-100 text-lg">Successful Events Delivered</div>
                </div>
                <div className="h-px bg-amber-500/30"></div>
                <div>
                  <div className="text-5xl font-bold mb-2">100+</div>
                  <div className="text-amber-100 text-lg">Satisfied Corporate Clients</div>
                </div>
              </div>
            </div>

            {/* Client Types */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-amber-600 mb-2">B2B</div>
                <div className="text-gray-600 text-sm">Corporate Events</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-amber-600 mb-2">B2G</div>
                <div className="text-gray-600 text-sm">Government Projects</div>
              </div>
            </div>

            {/* Key Strengths */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Key Strengths</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span>Strategic event planning & execution</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span>State-of-the-art multimedia equipment</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span>Experienced professional team</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span>End-to-end project management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
