"use client";

import { useEffect, useState } from "react";
import type { SpotifyLink } from "@/types/spotify";
import { useUser } from "@/app/context/UserContext";

export default function SpotifyPage() {
  const [links, setLinks] = useState<SpotifyLink[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spotify`);
        if (res.ok) {
          const data = await res.json();
          setLinks(data);
        }
      } catch (err) {
        console.error("Error fetching spotify links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-serif font-bold text-[#2C3E50] mb-4">
            Podcasts
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Listen to the latest episodes and stories from our student voices and
            special guests.
          </p>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : links.length === 0 ? (
          <p className="text-center text-gray-500">No podcasts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white rounded-2xl shadow flex flex-col md:flex-row gap-6 p-6 hover:shadow-lg transition max-w-2xl"
              >
                {/* Cover Image */}
                <div className="relative w-full md:w-48 flex-shrink-0">
                  <img
                    src={
                      link.coverImage
                        ? `${process.env.NEXT_PUBLIC_API_URL}/covers/${link.coverImage}`
                        : "/covers/roar podcast.png"
                    }
                    alt={link.title}
                    
                    className="rounded-xl w-full h-40 object-cover"
                  />
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">{link.title}</h2>
                  <p className="text-gray-600 mb-4">{link.desc}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm mb-2">
                    {link.duration && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                        {link.duration}
                      </span>
                    )}
                    {(link.date || link.date) && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                        {new Date(link.date || link.date).toLocaleDateString("en-GB")}
                      </span>
                    )}
                  </div>
                  {link.guests && (
                    <div className="flex items-center gap-2 text-yellow-600 text-sm mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-3-3.87M9 21v-2a4 4 0 013-3.87M12 7a4 4 0 110-8 4 4 0 010 8z" /></svg>
                      Featuring:{" "}
                      <span className="text-blue-900 font-semibold ml-1">
                        {Array.isArray(link.guests) ? link.guests.join(", ") : link.guests}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-3 mt-auto">
                    {link.url && (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 transition"
                      >
                        Listen
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 3v4a1 1 0 001 1h4M5 12h14M12 5l7 7-7 7" /></svg>
                      </a>
                    )}
                    {link.videoLink && link.videoLink.trim() !== "" && (
                      <a
                        href={link.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-blue-900 text-blue-900 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition"
                      >
                        Watch
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
