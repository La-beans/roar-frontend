"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { PenLine, Mic, Trash2, Edit, Music } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

interface Article {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

interface Podcast {
  id: number;
  title: string;
  status: string;
  created_at: string;
  // add other fields as needed
}

export default function EditorStudioPage() {
  const user = useUser();
  const [published, setPublished] = useState<Article[]>([]);
  const [drafts, setDrafts] = useState<Article[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/editor-articles`);
      const data = await res.json();
      setPublished(data.filter((a: Article) => a.status === "published"));
      setDrafts(data.filter((a: Article) => a.status === "draft"));
    } catch (err) {
      setPublished([]);
      setDrafts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPodcasts = async () => {
    setLoadingPodcasts(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spotify`);
      const data = await res.json();
      setPodcasts(data);
    } catch (err) {
      setPodcasts([]);
    } finally {
      setLoadingPodcasts(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchPodcasts();
  }, []);

  async function handleDeleteArticle(id: number) {
    if (!confirm("Are you sure you want to delete this article?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`, { method: "DELETE" });
    fetchArticles();
  }

  async function handleDeletePodcast(id: number) {
    if (!confirm("Are you sure you want to delete this podcast episode?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/spotify/${id}`, { method: "DELETE" });
    fetchPodcasts();
  }

  // role helpers
  const isAdmin = user?.role?.includes("admin");

  return (
    <ProtectedRoute>
      <section className="max-w-6xl mx-auto py-12 px-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-blue-900 text-white rounded-xl p-8 flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {isAdmin ? "Admin" : "Student"} 👋</h1>
            <p className="mt-2 text-lg">Section: Wagwan</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Write New Magazine: only admin */}
         
            <Link
              href="/editor/new-article"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex flex-col items-center justify-center text-center transition"
            >
              <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-4">
                <PenLine size={28} />
              </div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Write New Magazine</h2>
              <p className="text-gray-600">Create engaging magazine content</p>
            </Link>
          
          {/* Upload New Episode: only admin */}
          
            <Link
              href="/editor/upload-episode"
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg flex flex-col items-center justify-center text-center transition"
            >
              <div className="bg-blue-100 text-blue-700 p-4 rounded-full mb-4">
                <Mic size={28} />
              </div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Upload New Episode</h2>
              <p className="text-gray-600">Share your latest podcast</p>
            </Link>
          
        </div>

        {/* Drafts Section: only admin */}
       
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Drafts</h3>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : drafts.length === 0 ? (
              <p className="text-gray-500">No drafts yet.</p>
            ) : (
              <ul>
                {drafts.map(draft => (
                  <li key={draft.id} className="flex items-center justify-between py-2 border-b">
                    <span>{draft.title}</span>
                    <div className="flex gap-3">
                      <Link
                        href={`/editor/new-article/${draft.id}`}
                        className="inline-flex items-center text-blue-700 hover:underline"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Continue Editing
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(draft.id)}
                        className="inline-flex items-center text-red-600 hover:underline"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        

        {/* Recently Published Articles */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Recently Published Articles</h3>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : published.length === 0 ? (
            <p className="text-gray-500">No published articles yet.</p>
          ) : (
            <ul>
              {published.map(article => (
                <li key={article.id} className="flex items-center justify-between py-2 border-b">
                  <span>{article.title}</span>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="inline-flex items-center text-red-600 hover:underline"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recently Posted Podcasts */}
        <div className="bg-blue-50 p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Music className="w-5 h-5 text-blue-700" /> Recently Posted Podcasts
          </h3>
          {loadingPodcasts ? (
            <p className="text-gray-500">Loading...</p>
          ) : podcasts.length === 0 ? (
            <p className="text-gray-500">No published podcasts yet.</p>
          ) : (
            <ul>
              {podcasts.map(podcast => (
                <li key={podcast.id} className="flex items-center justify-between py-2 border-b">
                  <span className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-blue-700" />
                    {podcast.title}
                  </span>
                  <button
                    onClick={() => handleDeletePodcast(podcast.id)}
                    className="inline-flex items-center text-red-600 hover:underline"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}
