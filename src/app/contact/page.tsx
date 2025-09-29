// src/app/contact/page.tsx
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-blue-900 mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-lg text-slate-800 max-w-2xl mx-auto leading-relaxed">
            Have a story to share? Want to collaborate? Need to get in touch? 
            We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Get In Touch Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-serif text-slate-800">Get In Touch</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">General Inquiries</h3>
                <a
                  href="mailto:hello@roardigitalmedia.com"
                  className="text-gray-600 hover:text-slate-800 transition-colors"
                >
                  roardigitalmediahub@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">For Students</h3>
                <a
                  href="mailto:podcast@roardigitalmedia.com"
                  className="text-gray-600 hover:text-slate-800 transition-colors"
                >
                  roarmagazine@student.lancaster.edu.gh
                </a>
              </div>
            </div>
          </div>

          {/* Find Us Online Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-serif text-slate-800">Find Us Online</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/roardigitalhub/"
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href="https://open.spotify.com/show/5vB1eGq8saZY3bQx8ddKl5"
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Spotify"
                >
                  {/* Spotify Icon (inline SVG) */}
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/roar-digital-media-hub-652a35325/"
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Follow us on social media for the latest updates, behind-the-scenes content, 
                and community highlights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
