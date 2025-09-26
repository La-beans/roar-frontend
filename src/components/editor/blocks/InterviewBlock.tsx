"use client"

interface QA {
  id: string
  question: string
  answer: string
}

interface InterviewBlockProps {
  qaList: QA[]
  onChange: (qaList: QA[]) => void
  backgroundColor?: string   // 🔹 new
}

export default function InterviewBlock({
  qaList,
  onChange,
  backgroundColor = "#F9FAFB", // default gray
}: InterviewBlockProps) {
  const updateQA = (id: string, field: "question" | "answer", value: string) => {
    onChange(qaList.map((qa) => (qa.id === id ? { ...qa, [field]: value } : qa)))
  }

  const addQA = () => {
    onChange([...qaList, { id: crypto.randomUUID(), question: "", answer: "" }])
  }

  return (
    <div
      className="border rounded-lg p-4 space-y-4"
      style={{ backgroundColor }} // 🔹 dynamic
    >
      {qaList.map((qa) => (
        <div key={qa.id} className="space-y-2">
          <textarea
            value={qa.question}
            onChange={(e) => updateQA(qa.id, "question", e.target.value)}
            placeholder="Question..."
            className="w-full border rounded p-2 resize-none font-semibold text-blue-900"
          />
          <textarea
            value={qa.answer}
            onChange={(e) => updateQA(qa.id, "answer", e.target.value)}
            placeholder="Answer..."
            className="w-full border rounded p-2 resize-none text-gray-700"
          />
        </div>
      ))}
      <button
        onClick={addQA}
        className="text-sm text-blue-600 hover:underline font-medium"
      >
        + Add Q&A
      </button>
    </div>
  )
}
