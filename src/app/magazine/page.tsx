"use client"

import { useEffect, useState } from "react"

interface Article {
  id: number
  title: string
  author: string
  coverImage?: string
  summary?: string
  pdfFile?: string
  date?: string // <-- Add date field
}

export default function MagazinePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`)
        const data = await res.json()
        setArticles(data)
      } catch (err) {
        setArticles([
          {
            id: 1,
            title: "The Future of Sustainable Fashion",
            author: "Nonso",
            summary: "How Gen Z is revolutionizing the fashion industry with eco-conscious choices",
            coverImage: "/covers/1_optimized_.png",
            date: "2024-09-22", // Example fallback date
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-serif font-bold text-slate-800 mb-4">The Magazine</h1>
          <p className="text-lg text-gray-600 font-light">
            Student stories, culture, and creative voices — all in one place
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No articles yet.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Cover Image with Gradient */}
                <div className="relative h-96 bg-gradient-to-br from-yellow-400 via-orange-400 to-blue-900 flex items-center justify-center">
                  <img
                    src={
                      article.coverImage
                        ? `${process.env.NEXT_PUBLIC_API_URL}/covers/${article.coverImage}`
                        : "/placeholder.svg"
                    }
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Article Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {article.title}
                  </h2>

                  {article.summary && (
                    <p className="text-gray-600 mb-4 leading-relaxed">{article.summary}</p>
                  )}

                  <p className="text-yellow-600 font-semibold mb-2">
                    By {article.author}
                  </p>

                  {/* Date */}
                  {article.date && (
                    <p className="text-gray-500 text-sm mb-4">
                      {new Date(article.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}

                  {/* Read More Button */}
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
