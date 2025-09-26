"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Issue {
  id: string;
  title: string;
  description: string;
  season: string;
  year: string;
  coverImage: string;
  link: string;
}

const issues: Issue[] = [
  {
    id: "001",
    title: "Fresh Voices",
    description: "Our debut issue featuring emerging student creators and campus culture.",
    season: "Fall",
    year: "2024",
    coverImage: "/covers/Issue 1.png",
    link: "https://online.visual-paradigm.com/share/book/roar-pc-new-1vktjqd99",
  },
  {
    id: "002",
    title: "Digital Dream",
    description: "Exploring the intersection of technology and creativity in Gen Z culture.",
    season: "Winter",
    year: "2024",
    coverImage: "/covers/Issue 2.png",
    link: "https://online.visual-paradigm.com/share/book/roar-magazine-issue-2---flipping-book-1w43yg6gax",
  },
  {
    id: "003",
    title: "Voices Rising",
    description: "Amplifying diverse perspectives and untold stories from our community.",
    season: "Spring",
    year: "2024",
    coverImage: "/covers/Issue 3.png",
    link: "https://online.visual-paradigm.com/share/book/roar-magazine-issue-2---flipping-book-1w43yg6gax",
  },
];

export default function IssuesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-serif font-bold text-slate-800 mb-4">The Issues</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of digital magazine issues, each telling unique stories from our community
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Cover Image with Gradient and Logo */}
              <div className="relative h-115 bg-gradient-to-br from-yellow-400 via-orange-400 to-blue-900 flex items-center justify-center">
                <Image
                  src={issue.coverImage}
                  alt={issue.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Issue Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Issue #{issue.id}: {issue.title}
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">{issue.description}</p>

                <p className="text-yellow-600 font-semibold mb-6">
                  {issue.season} {issue.year}
                </p>

                {/* View Button */}
                <Link href={issue.link}>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
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
                    View Issue
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
