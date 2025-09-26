"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Headphones, Users } from "lucide-react";

interface Article {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
}

interface Podcast {
  id: number;
  title: string;
  description: string;
  url: string; // Spotify link
  duration?: string;
  episode_date?: string;
  coverImage?: string;
  guests?: string;
}

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestPodcast, setLatestPodcast] = useState<Podcast | null>(null);
  const [isFading, setIsFading] = useState(false);

  // Slideshow state
  const heroImages = [
    "/covers/1_optimized_.png",
    "/covers/2_optimized_.png",
    "/covers/3_optimized_.png",
    "/covers/4_optimized_.png",
    "/covers/5_optimized_.png",
    "/covers/6_optimized_.png",
    // Add more images as needed
  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
        const data = await res.json();
        // Show all published articles (not filtering by featured)
        const published = data.filter((a: any) => a.status === "published");
        setFeaturedArticles(published);
      } catch (err) {
        console.error("Error fetching featured articles:", err);
      }
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
    async function fetchLatestPodcast() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spotify-links?limit=1&sort=desc`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLatestPodcast(data[0]);
        }
      } catch (err) {
        console.error("Error fetching latest podcast:", err);
      }
    }
    fetchLatestPodcast();
  }, []);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % heroImages.length);
        setIsFading(false);
      }, 500);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-blue-900 text-white">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center overflow-hidden">
        {/* Slideshow background */}
        <div className="absolute inset-0 z-0 transition-all duration-1000">
          <Image
            src={heroImages[slideIndex]}
            alt="Hero background"
            fill
            priority
            className={`object-cover object-center absolute inset-0 transition-opacity duration-500 opacity-60 ${isFading ? "opacity-0" : "opacity-60"}`}
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800/60 to-blue-900/80" />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text animate-pulse">
            ROAR
          </h1>
          <div className="text-yellow-400 text-2xl md:text-3xl font-semibold mb-4">
            Digital Media Hub
          </div>
          <div className="text-gray-300 text-lg mb-6">{/*enter text you wanna use ontop here*/}</div>

          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            WELCOME TO ROAR! The Voice of Truth — step into a world where
            creativity comes alive through words and voices!
          </p>

          <Link href="/articles">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg">
              Explore Stories
            </Button>
          </Link>
        </div>
      </section>

      {/* Action Cards */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="bg-blue-800/50 border-blue-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Read the Magazine</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Dive into thought-provoking articles, student perspectives, and
                cultural commentary that shapes our generation.
              </p>
              <Link href="/articles">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full">
                  Explore Articles
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-blue-800/50 border-blue-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Listen to the Podcast</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Authentic conversations with student leaders, creators, and
                changemakers driving campus culture forward.
              </p>
              <Link href="/podcast">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full">
                  Listen Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-blue-800/50 border-blue-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Reach out to the Team</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Have a story you want to share? Write, create, produce, and
                amplify stories that matter to students everywhere.
              </p>
              <Link href="/contact">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full">
                  Get Involved
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="px-6 py-16 bg-blue-800/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Stories
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Discover the latest perspectives, insights, and creative
            expressions from our student community.
          </p>

          {featuredArticles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article, index) => {
                const colorSchemes = [
                  { bg: "bg-gradient-to-br from-pink-500 to-purple-600", tag: "bg-pink-500" },
                  { bg: "bg-gradient-to-br from-blue-500 to-indigo-600", tag: "bg-blue-500" },
                  { bg: "bg-gradient-to-br from-green-500 to-teal-600", tag: "bg-green-500" },
                  { bg: "bg-gradient-to-br from-orange-500 to-red-600", tag: "bg-orange-500" },
                  { bg: "bg-gradient-to-br from-purple-500 to-pink-600", tag: "bg-purple-500" },
                ];
                const colorScheme = colorSchemes[index % colorSchemes.length];

                return (
                  <Link key={article.id} href={`/articles/${article.id}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        {article.coverImage ? (
                          <div className="relative w-full h-full">
                            <div className={`absolute inset-0 ${colorScheme.bg} opacity-20`}></div>
                            <img
                              src={article.coverImage || "/placeholder.svg"}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className={`w-full h-full ${colorScheme.bg} flex items-center justify-center relative`}>
                            <div className="text-white text-6xl font-bold opacity-20">ROAR</div>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`${colorScheme.tag} text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide`}
                          >
                            Featured
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{article.title}</h2>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-gray-700 font-medium">By {article.author}</div>
                          <div className="text-gray-500 text-sm">5 min read</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-500 text-sm">Dec 18, 2024</div>
                          <span className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 flex items-center gap-1">
                            Read More
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No featured stories yet.</p>
          )}
        </div>
      </section>

      {/* Latest Podcast Section */}
      <section className="px-6 py-16 bg-blue-900 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Podcast Info */}
        <div className="flex-1 max-w-xl">
          <span className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full text-sm mb-4 inline-block">
            LATEST EPISODE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">ROAR Conversations</h2>
          {latestPodcast ? (
            <>
              <h3 className="text-xl font-semibold mb-2">
                Episode: {latestPodcast.title}
              </h3>
              <p className="text-gray-200 mb-6">{latestPodcast.description}</p>
              <div className="flex items-center gap-6 mb-8">
                {latestPodcast.duration && (
                  <span className="flex items-center gap-2 text-yellow-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeWidth="2" d="M12 6v6l4 2"/></svg>
                    {latestPodcast.duration}
                  </span>
                )}
                {/* Example rating, replace with real data if available */}
                <span className="flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" strokeWidth="2"/></svg>
                  4.9 rating
                </span>
              </div>
              <div className="flex gap-4">
                <a
                  href={latestPodcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-4 rounded-lg text-lg transition"
                >
                  Listen Now
                </a>
                <Link href="/podcast">
                  <span className="bg-blue-800 border border-blue-400 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition cursor-pointer flex items-center">
                    View All Episodes
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-400">No podcast episodes yet.</p>
          )}
        </div>
        {/* Podcast Player/Visual */}
        <div className="flex-1 max-w-lg w-full">
          <div className="bg-blue-800/60 rounded-2xl p-8 shadow-lg flex flex-col items-center">
            {/* Podcast cover or fallback */}
            {latestPodcast?.coverImage ? (
              <img
                src={latestPodcast.coverImage}
                alt={latestPodcast.title}
                className="w-32 h-32 rounded-full object-cover mb-6"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-yellow-400 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg>
              </div>
            )}
            <div className="text-lg font-bold mb-2 text-white">
              {latestPodcast?.title || "ROAR Conversations"}
            </div>
            <div className="text-gray-300 mb-4 text-center">
              {latestPodcast?.description?.slice(0, 60) || "Building Community in Digital Spaces"}
            </div>
            {/* Fake player bar */}
            <div className="w-full flex items-center gap-2 mb-6">
              <span className="text-gray-400 text-xs">{latestPodcast?.duration ? "00:00" : ""}</span>
              <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: "40%" }} />
              </div>
              <span className="text-gray-400 text-xs">{latestPodcast?.duration || ""}</span>
            </div>
            {/* Player controls (visual only) */}
            <div className="flex items-center gap-6 mb-6">
              <button className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="16 18 10 12 16 6" /></svg>
              </button>
              <button className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><polygon points="8 5 19 12 8 19 8 5" /></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="8 6 14 12 8 18" /></svg>
              </button>
            </div>
            {/* Platform buttons */}
            <div className="flex gap-4">
              <a href={latestPodcast?.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold">Spotify</a>
              {/* Add Apple/Google links if available in your data */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Amplifying Student Voices
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            ROAR Digital Media Hub was born from the belief that every student
            has a story worth telling. We're not just another media
            platform—we're a movement dedicated to showcasing the authentic
            experiences, innovative ideas, and powerful voices that define Gen
            Z.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
                Our Story
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-blue-900 hover:bg-gray-300 hover:text-blue-900 px-8 py-3"
              >
                Meet the Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
