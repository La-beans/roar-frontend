"use client";

import { useState } from "react";

export default function UploadEpisodePage() {
  const [embed, setEmbed] = useState(""); // Spotify embed code (used for url)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [videoLink, setVideoLink] = useState("");
  const [guests, setGuests] = useState(""); // <-- Add guest field
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Hidden/auto fields
  const [coverImage, setCoverImage] = useState(""); // Now editable

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Compose the url from the embed code if possible, else use as-is
    let url = embed;
    // Try to extract src from embed code
    const match = embed.match(/src="([^"]+)"/);
    if (match) url = match[1];

    try {
      const res = await fetch("http://localhost:5000/api/spotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          duration,
          date,
          url,
          videoLink,
          guests, // <-- Send guests to backend
          coverImage,
        }),
      });

      if (res.ok) {
        setMessage("✅ Episode uploaded successfully!");
        setEmbed("");
        setTitle("");
        setDesc("");
        setDuration("");
        setDate(new Date().toISOString().slice(0, 10));
        setVideoLink("");
        setGuests(""); // <-- Reset guests field
      } else {
        const error = await res.json();
        setMessage(`❌ Failed: ${error.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Upload New Podcast Episode</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow space-y-8"
        autoComplete="off"
      >
        {/* Embed Spotify */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Embed Spotify</label>
          <textarea
            placeholder="Paste Spotify embed code here..."
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Episode Title</label>
          <input
            type="text"
            placeholder="Enter episode title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            placeholder="Enter episode description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        {/* Guests */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Guest(s)</label>
          <input
            type="text"
            placeholder="Enter guest names (comma separated)..."
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Duration & Date */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-gray-700">Duration</label>
            <input
              type="text"
              placeholder="e.g. 45:12"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        {/* Video Link */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Video Link</label>
          <input
            type="url"
            placeholder="Paste video link here..."
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Cover Image */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Cover Image URL</label>
          <input
            type="url"
            placeholder="Paste cover image URL here..."
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Uploading..." : "Upload Episode"}
        </button>
      </form>
      {message && <p className="mt-6 text-center">{message}</p>}
    </section>
  );
}
