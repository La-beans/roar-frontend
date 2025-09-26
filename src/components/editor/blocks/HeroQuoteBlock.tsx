"use client"

interface HeroQuoteBlockProps {
  content: string
  onChange: (value: string) => void
  backgroundColor?: string   // 🔹 new prop
}

export default function HeroQuoteBlock({
  content,
  onChange,
  backgroundColor = "#0F52BA", // fallback: Royal Sapphire
}: HeroQuoteBlockProps) {
  return (
    <div
      className="text-white rounded-lg p-8 text-center"
      style={{ backgroundColor }} // 🔹 dynamic background
    >
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your inspiring quote..."
        className="w-full bg-transparent text-2xl font-semibold text-center placeholder-white outline-none resize-none"
      />
    </div>
  )
}
