"use client"

interface TwoColumnBlockProps {
  left: string
  right: string
  onChange: (side: "left" | "right", value: string) => void
  backgroundColor?: string   // 🔹 new
}

export default function TwoColumnBlock({
  left,
  right,
  onChange,
  backgroundColor = "#FFFFFF",
}: TwoColumnBlockProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4"
      style={{ backgroundColor }} // 🔹 dynamic
    >
      <textarea
        value={left}
        onChange={(e) => onChange("left", e.target.value)}
        placeholder="Write text for the left side..."
        className="w-full min-h-40 border rounded p-2 resize-none"
      />
      <textarea
        value={right}
        onChange={(e) => onChange("right", e.target.value)}
        placeholder="Write text for the right side..."
        className="w-full min-h-40 border rounded p-2 resize-none"
      />
    </div>
  )
}
