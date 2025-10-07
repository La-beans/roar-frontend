"use client";

import { Target, Users, TrendingUp, BookOpen, Mic, Share2, Paintbrush } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-serif text-[#2C3E50] mb-8 leading-tight">
          This Is ROAR
        </h1>

        <div className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          <p>
            Founded in 2023, ROAR Digital Media Hub is a student-led creative organisation built 
            to amplify student voices through stories, podcasts, and digital media.
          </p>

          <p>
            We are more than a magazine. More than a podcast. 
            We are a community of storytellers, dreamers, and creators shaping culture on campus and beyond.
          </p>

          <p>
            Born from a desire to showcase untold stories and explore student creativity, 
            ROAR has grown into a multimedia platform that bridges the gap between campus 
            expression and professional media standards.
          </p>

          <p>
            Our motto, “Vox Veritatis” Voice of Truth, captures our mission: to amplify 
            student voices, celebrate campus culture, and inspire creative exploration.
          </p>

        </div>
      </section>

      {/* Mission, Community, Impact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Our Mission */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-serif text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To amplify student voices and create authentic content that reflects the diverse
                experiences of our generation.
              </p>
            </div>

            {/* Our Community */}
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-serif text-slate-800 mb-4">Our Community</h2>
              <p className="text-slate-600 leading-relaxed">
                An inclusive space where creators from all backgrounds can share their stories and
                connect with like-minded individuals.
              </p>
            </div>

            {/* Our Vision */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-serif text-slate-800 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To become the go-to creative media hub for Lancaster students —
                a space where every voice has power, and every story can ROAR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Teams Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-slate-800 text-center mb-16">Our Teams</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Magazine Team */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-slate-800 mb-3">Magazine Editorial</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our editorial team scouts stories, writes features, and conducts interviews that capture 
                the heart of student life, culture, and creativity.
              </p>
            </div>

            {/* Podcast Team */}
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-slate-800 mb-3">Podcast</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The podcast team produces authentic conversations and fun episodes that give 
                students a platform to share their voices and perspectives.
              </p>
            </div>

            {/* Social Media Team */}
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-slate-800 mb-3">Media and Marketing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our media and marketing team drives engagement through creative campaigns, 
                social media content, and interactive experiences that amplify ROAR&apos;s stories.
              </p>
            </div>

            {/* Marketing Team */}
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Paintbrush className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-slate-800 mb-3">Design and Layout</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The design and layout team shapes ROAR&apos;s bold visual identity, crafting 
                layouts, graphics, and branded content that bring every story to life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
