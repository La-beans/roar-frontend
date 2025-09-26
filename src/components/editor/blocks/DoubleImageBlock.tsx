"use client"

interface DoubleImageBlockProps {
  left: string
  right: string
  onChange: (side: "left" | "right", value: string) => void
  backgroundColor?: string   // 🔹 new
}

export default function DoubleImageBlock({
  left,
  right,
  onChange,
  backgroundColor = "#FFFFFF",
}: DoubleImageBlockProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4"
      style={{ backgroundColor }} // 🔹 dynamic
    >
      <input
        type="text"
        value={left}
        onChange={(e) => onChange("left", e.target.value)}
        placeholder="Image URL (left)"
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        value={right}
        onChange={(e) => onChange("right", e.target.value)}
        placeholder="Image URL (right)"
        className="w-full border rounded p-2"
      />
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {left && <img src={left} alt="Left" className="rounded-lg border" />}
        {right && <img src={right} alt="Right" className="rounded-lg border" />}
      </div>
    </div>
  )
}
