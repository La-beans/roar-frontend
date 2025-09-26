"use client"

import HeroQuoteBlock from "./blocks/HeroQuoteBlock"
import TwoColumnBlock from "./blocks/TwoColumnBlock"
import InterviewBlock from "./blocks/InterviewBlock"
import DoubleImageBlock from "./blocks/DoubleImageBlock"

interface Block {
  id: string
  type: string
  content: string
}

interface EditorCanvasProps {
  blocks: Block[]
  onUpdateBlock: (id: string, content: string) => void
}

export default function EditorCanvas({ blocks, onUpdateBlock }: EditorCanvasProps) {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {blocks.length === 0 ? (
        <div className="bg-white border rounded-lg min-h-[400px] flex flex-col items-center justify-center text-center p-12">
          <p className="text-gray-500 mb-2">No blocks yet. Use the sidebar to add one!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {blocks.map((block) => {
            if (block.type === "hero-quote") {
              return (
                <HeroQuoteBlock
                  key={block.id}
                  content={block.content}
                  onChange={(val) => onUpdateBlock(block.id, val)}
                />
              )
            } else if (block.type === "two-column") {
              const parsed = block.content ? JSON.parse(block.content) : { left: "", right: "" }
              return (
                <TwoColumnBlock
                  key={block.id}
                  left={parsed.left}
                  right={parsed.right}
                  onChange={(side, val) =>
                    onUpdateBlock(block.id, JSON.stringify({ ...parsed, [side]: val }))
                  }
                />
              )
            } else if (block.type === "interview") {
              const parsed = block.content ? JSON.parse(block.content) : []
              return (
                <InterviewBlock
                  key={block.id}
                  qaList={parsed}
                  onChange={(qaList) => onUpdateBlock(block.id, JSON.stringify(qaList))}
                />
              )
            } else if (block.type === "double-image") {
              const parsed = block.content ? JSON.parse(block.content) : { left: "", right: "" }
              return (
                <DoubleImageBlock
                  key={block.id}
                  left={parsed.left}
                  right={parsed.right}
                  onChange={(side, val) =>
                    onUpdateBlock(block.id, JSON.stringify({ ...parsed, [side]: val }))
                  }
                />
              )
            } else {
              return (
                <textarea
                  key={block.id}
                  value={block.content}
                  onChange={(e) => onUpdateBlock(block.id, e.target.value)}
                  placeholder={`Write your ${block.type} content...`}
                  className="w-full border rounded p-2"
                />
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
