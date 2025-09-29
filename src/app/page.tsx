"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Users } from "lucide-react";

interface Article {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  pdfFile?: string;
  date?: string;
}

interface Podcast {
  id: number;
  title: string;
  description: string;
  url: string;
  duration?: string;
  episode_date?: string;
  coverImage?: string;
  guests?: string;
  videoLink?: string;
}

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestPodcast, setLatestPodcast] = useState<Podcast | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Slideshow images
  const heroImages = [
    "/covers/1_optimized_.png",
    "/covers/2_optimized_.png",
    "/covers/3_optimized_.png",
    "/covers/4_optimized_.png",
    "/covers/5_optimized_.png",
    "/covers/6_optimized_.png",
  ];

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
        const data = await res.json();
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
    }, 10000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 transition-all duration-1000">
          <Image
            src={heroImages[slideIndex]}
            alt="Hero background"
            fill
            priority
            className={`object-cover object-center absolute inset-0 transition-opacity duration-500 ${isFading ? "opacity-60" : "opacity-100"}`}
            style={{ zIndex: 0 }}
          />
        </div>
        <div className="relative z-20 max-w-4xl px-6">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text mb-4">
            ROAR
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Digital Media Hub</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Welcome to Roar! Discover a truth — step into a world where creativity comes alive through words and voices!
          </p>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold"
            onClick={() => {
              const el = document.getElementById("featured-stories");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Explore
          </Button>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Read the Magazine Card */}
          <div className="bg-red-600 text-white p-8 rounded-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
              <BookOpen className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Read the Magazine</h3>
            <p className="text-center mb-6 leading-relaxed">
              Dive into thought-provoking articles, creative storytelling, and student perspectives that shape our generation.
            </p>
            <div className="text-center">
              <Link href="/magazine">
                <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-0 font-semibold">
                  Explore articles
                </Button>
              </Link>
            </div>
          </div>

          {/* Listen to the Podcast Card */}
          <div className="bg-red-600 text-white p-8 rounded-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
              <Headphones className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Listen to the Podcast</h3>
            <p className="text-center mb-6 leading-relaxed">
              Tune in to conversations with inspiring voices, covering culture, creativity, and the issues that matter most.
            </p>
            <div className="text-center">
              <Link href="/podcast">
                <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-0 font-semibold">
                  Listen now
                </Button>
              </Link>
            </div>
          </div>

          {/* Reach out to the Team Card */}
          <div className="bg-red-600 text-white p-8 rounded-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Reach out to the Team</h3>
            <p className="text-center mb-6 leading-relaxed">
              Have a story to tell? Want to collaborate? Get in touch with our creative team and join the conversation.
            </p>
            <div className="text-center">
              <Link href="/contact">
                <Button variant="outline" className="bg-white text-red-600 hover:bg-gray-100 border-0 font-semibold">
                  Get connected
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section id="featured-stories" className="py-16 px-6 bg-red-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">Featured Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.length > 0 ? (
              featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={
                        article.coverImage
                          ? `${process.env.NEXT_PUBLIC_API_URL}/covers/${article.coverImage}`
                          : "/placeholder.svg"
                      }
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-700 font-medium mb-1">By {article.author}</p>
                    {article.date && (
                      <p className="text-gray-500 text-sm mb-2">
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
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg mt-2"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No featured stories yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Latest Podcast Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          {/* Podcast Card */}
          <div className="bg-red-600 text-white p-8 rounded-lg max-w-md w-full flex flex-col items-center">
            <img
              src={"/covers/roar podcast.png"}
              alt={"ROAR Podcast"}
              className="w-64 h-64 rounded-2xl object-cover mb-6 border-4 border-gray-700"
            />
            <h2 className="text-2xl font-bold mb-2 text-center">
              {"ROAR PODCAST"}
            </h2>
            <p className="text-lg mb-6 text-center">
              {"Listen to the latest episode!"}
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href={"https://open.spotify.com/show/5vB1eGq8saZY3bQx8ddKl5"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-green-600 transition"
                style={{ minWidth: "160px", justifyContent: "center" }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#009900" />
                  <path d="M8 17.5V6.5L19 12L8 17.5Z" fill="#fff"/>
                </svg>
                Spotify
              </a>
              <a
                href={"http://www.youtube.com/@RoarDigitalMediaHub"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-red-600 transition"
                style={{ minWidth: "160px", justifyContent: "center" }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="6" width="20" height="12" rx="3" fill="#DC143C"/>
                  <polygon points="10,9 16,12 10,15" fill="#fff"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>
          {/* Podcast Details */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-red-600 mb-8 text-center md:text-left">
              Latest Episode
            </h3>
            {latestPodcast ? (
              <div className="flex gap-6 items-start bg-red-600 rounded-xl p-4 shadow">
                <img
                  src={"/covers/roar podcast.png"}
                  alt={latestPodcast.title}
                  className="w-24 h-24 rounded-xl object-cover border-2 border-gray-700"
                />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {latestPodcast.title}
                  </h4>
                  <p className="text-white mb-2">
                    {latestPodcast.description?.slice(0, 160) || "No description available."}
                  </p>
                  <span className="text-gray-600 text-sm">
                    {latestPodcast.duration || ""}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {/* Spotify Button */}
                  <a
                    href={latestPodcast?.url || "https://open.spotify.com/show/5vB1eGq8saZY3bQx8ddKl5"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center border-2 border-green-600 bg-white text-green-600 font-bold px-3 py-2 rounded-full text-base hover:bg-green-600 hover:text-white transition"
                    style={{ minWidth: "48px" }}
                    title="Listen on Spotify"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#1DB954" />
                      <path d="M8 17.5V6.5L19 12L8 17.5Z" fill="#fff"/>
                    </svg>
                  </a>
                  {/* YouTube Button (only if videoLink exists) */}
                  {latestPodcast?.videoLink && (
                    <a
                      href={latestPodcast.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center border-2 border-red-600 bg-white text-red-600 font-bold px-3 py-2 rounded-full text-base hover:bg-red-600 hover:text-white transition"
                      style={{ minWidth: "48px" }}
                      title="Watch on YouTube"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="6" width="20" height="12" rx="3" fill="#DC143C"/>
                        <polygon points="10,9 16,12 10,15" fill="#fff"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No podcast episodes yet.</p>
            )}
            <div className="flex justify-end mt-8">
              <Link href="/podcast">
                <span className="bg-gray-700 hover:bg-gray-400 text-white font-bold px-8 py-3 rounded-full text-lg transition cursor-pointer">
                  View All Episodes
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-24 px-6 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0 transition-all duration-1000">
          <Image
            src={heroImages[slideIndex]}
            alt="Mission background"
            fill
            priority
            className={`object-cover object-center absolute inset-0 transition-opacity duration-500 ${isFading ? "opacity-20" : "opacity-100"}`}
            style={{ zIndex: 0 }}
          />
         
        </div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Amplifying <span className="text-red-400">Student Stories</span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            ROAR Digital Media Hub was born from the belief that every student has a story worth telling. Through our magazine, podcast, and digital platforms, we highlight student voices and celebrate the campus experience.
          </p>
        </div>
      </section>
    </div>
  );
}
