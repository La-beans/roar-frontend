"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Headphones, Users} from "lucide-react";

interface Article {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  pdfFile?: string;
  date?: string // <-- Add date field

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
  videoLink?: string;
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
        const published = data.filter((a: Article & { status: string }) => a.status === "published");
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spotify?limit=1&sort=desc`);
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
                              src={
                                article.coverImage
                                  ? `${process.env.NEXT_PUBLIC_API_URL}/covers/${article.coverImage}`
                                  : "/placeholder.svg"
                              }
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
                           {article.date && (
                            <p className="text-gray-500 text-sm mb-4">
                              {new Date(article.date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          )}
                          <a
                            href={
                              article.pdfFile
                                ? `${process.env.NEXT_PUBLIC_API_URL}/pdfs/${article.pdfFile}`
                                : "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            Read More
                          </a>
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
        {/* Left: Main Podcast */}
        <div className="flex-1 max-w-md flex flex-col items-center bg-blue-800/60 rounded-2xl p-8 shadow-lg">
          <img
            src={latestPodcast?.coverImage || "/covers/roar podcast.png"}
            alt={latestPodcast?.title || "ROAR Podcast"}
            className="w-64 h-64 rounded-2xl object-cover mb-6 border-4 border-yellow-400"
          />
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-2 text-center">
            {latestPodcast?.title?.toUpperCase() || "ROAR PODCAST"}
          </h2>
          <p className="text-lg text-white mb-6 text-center">
            Listen to the podcast on
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href={latestPodcast?.url || "https://open.spotify.com/show/5vB1eGq8saZY3bQx8ddKl5"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-3 rounded-full text-lg hover:bg-yellow-400 hover:text-blue-900 transition"
              style={{ minWidth: "160px", justifyContent: "center" }}
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="currentColor" />
                <path d="M8 17.5V6.5L19 12L8 17.5Z" fill="#fff"/>
              </svg>
              Spotify
            </a>
            <a
              href={latestPodcast?.videoLink || "http://www.youtube.com/@RoarDigitalMediaHub"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-3 rounded-full text-lg hover:bg-yellow-400 hover:text-blue-900 transition"
              style={{ minWidth: "160px", justifyContent: "center" }}
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor"/>
                <polygon points="10,9 16,12 10,15" fill="#fff"/>
              </svg>
              YouTube
            </a>
          </div>
        </div>

        {/* Right: Latest Episodes */}
        <div className="flex-1 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 text-center md:text-left">
            Latest Episodes
          </h3>
          <div className="flex flex-col gap-8">
            {latestPodcast ? (
              // If you want to show more than one episode, map over an array of podcasts here
              <div className="flex gap-6 items-start bg-blue-800/40 rounded-xl p-4 shadow">
                <img
                  src={latestPodcast.coverImage || "/covers/podcast.webp"}
                  alt={latestPodcast.title}
                  className="w-24 h-24 rounded-xl object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {latestPodcast.title}
                  </h4>
                  <p className="text-white mb-2">
                    {latestPodcast.description?.slice(0, 160) || "No description available."}
                  </p>
                  <span className="text-yellow-300 text-sm">
                    {latestPodcast.duration || ""}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No podcast episodes yet.</p>
            )}
          </div>
          <div className="flex justify-end mt-8">
            <Link href="/podcast">
              <span className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-full text-lg transition cursor-pointer">
                View All Episodes
              </span>
            </Link>
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
            has a story worth telling. We&apos;re not just another media
            platform—we&apos;re a movement dedicated to showcasing the authentic
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
