"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Send,
  Eye,
  Edit3,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
} from "lucide-react";

import EditorToolbar from "@/components/editor/EditorToolbar";
import BlockSidebar from "@/components/editor/BlockSidebar";

import HeroQuoteBlock from "@/components/editor/blocks/HeroQuoteBlock";
import DoubleImageBlock from "@/components/editor/blocks/DoubleImageBlock";
import InterviewBlock from "@/components/editor/blocks/InterviewBlock";
import TwoColumnBlock from "@/components/editor/blocks/TwoColumnBlock";

interface Block {
  id: string;
  type: string;
  content: string;
}

export default function NewArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string | undefined;

  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeToolbarTab, setActiveToolbarTab] = useState("font");
  const [articleTitle, setArticleTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedFont, setSelectedFont] = useState("DM Serif Display");
  const [selectedColor, setSelectedColor] = useState("#1E1E1E");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverHeight, setCoverHeight] = useState<number>(300);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Load article if editing
  useEffect(() => {
    if (articleId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}`)
        .then((res) => res.json())
        .then((data) => {
          setArticleTitle(data.title || "");
          setAuthor(data.author || "");
          setDate(data.date || "");
          setSelectedFont(data.font || "DM Serif Display");
          setSelectedColor(data.color || "#1E1E1E");
          setCoverImage(data.coverImage ? `/uploads/${data.coverImage}` : null);
          setBlocks(data.blocks ? JSON.parse(data.blocks) : []);
          // If you store coverHeight, pdfFile, etc., set them here as well
        });
    }
  }, [articleId]);

  // 🔹 Add a new block
  const handleAddBlock = (type: string, content?: string) => {
    setBlocks((prev) => [...prev, { id: crypto.randomUUID(), type, content: content || "" }]);
  };

  // 🔹 Update block content
  const handleUpdateBlock = (id: string, content: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  // 🔹 Delete a block
  const handleDeleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // 🔹 Reorder blocks
  const handleMoveBlock = (id: string, direction: "up" | "down") => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === -1) return prev;

      const newBlocks = [...prev];
      const swapIndex = direction === "up" ? index - 1 : index + 1;

      if (swapIndex < 0 || swapIndex >= prev.length) return prev;

      [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
      return newBlocks;
    });
  };

  // 🔹 Save or publish article (no blocks)
  const saveArticle = async (status: "draft" | "published") => {
    const formData = new FormData();
    formData.append("title", articleTitle);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("status", status);
    formData.append("font", selectedFont);
    formData.append("color", selectedColor);
    if (coverImageFile) formData.append("coverImage", coverImageFile);
    if (pdfFile) formData.append("pdf", pdfFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert(`Article ${status === "draft" ? "saved as draft" : "published"}!`);
      if (status === "published") router.push("/magazine");
    } else {
      alert("Failed to save article.");
    }
  };

  // 🔹 Device preview widths
  const previewWidth =
    selectedDevice === "desktop"
      ? "w-full"
      : selectedDevice === "tablet"
      ? "max-w-2xl"
      : "max-w-sm";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600"
            onClick={() => router.push("/editor")}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Article Builder</h1>
        </div>

        {/* Device Switcher + Save Actions */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="flex items-center bg-gray-100 rounded-lg p-1 mb-2 md:mb-0">
            <Button
              variant={selectedDevice === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedDevice("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedDevice === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedDevice("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedDevice === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedDevice("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" className="w-full md:w-auto" onClick={() => saveArticle("draft")}>
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
          <Button
            size="sm"
            className="bg-gray-800 hover:bg-gray-900 text-white w-full md:w-auto"
            onClick={() => saveArticle("published")}
          >
            <Send className="w-4 h-4 mr-1" /> Publish
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <EditorToolbar
        activeTab={activeToolbarTab}
        onChangeTab={setActiveToolbarTab}
        selectedFont={selectedFont}
        selectedColor={selectedColor}
      />

      {/* Workspace */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <BlockSidebar
          onAddBlock={handleAddBlock}
          activeTab={activeToolbarTab}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          setSelectedColor={setSelectedColor}
        />

        {/* Editor Canvas */}
        <main className="flex-1 bg-gray-50 p-2 md:p-6 flex justify-center overflow-auto">
          <div
            className={`w-full max-w-full md:${previewWidth} bg-white rounded-lg shadow-sm border border-gray-200 p-2 md:p-6`}
            style={{ fontFamily: selectedFont, color: selectedColor }}
            id="editor-canvas"
          >
            {/* Cover Image Block */}
            <div className="mb-6">
              {coverImage ? (
                <div className="flex flex-col items-center">
                  <div
                    className="w-full flex justify-center border rounded-lg bg-gray-100 overflow-hidden"
                    style={{ height: `${coverHeight}px` }}
                  >
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={coverHeight}
                    onChange={(e) => setCoverHeight(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full md:w-auto"
                    onClick={() => {
                      setCoverImage(null);
                      setCoverImageFile(null);
                    }}
                  >
                    Remove Cover
                  </Button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <span className="text-gray-600">Click to upload cover image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCoverImageFile(e.target.files[0]);
                        setCoverImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* Article Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Article Title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Date: eg 2025-12-31"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>

            {/* PDF Upload */}
            <div className="mb-6">
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                <span className="text-gray-600">
                  {pdfFile ? pdfFile.name : "Click to upload a PDF"}
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPdfFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* Blocks */}
            {blocks.length === 0 ? (
              <div className="text-center text-gray-500 min-h-60 flex flex-col items-center justify-center">
                <Edit3 className="w-8 h-8 mb-2" />
                <p>No blocks yet. Select a layout from the sidebar.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="relative border rounded p-2 group hover:shadow-md transition"
                  >
                    {/* Render Block */}
                    {block.type === "hero-quote" && (
                      <HeroQuoteBlock
                        content={block.content}
                        onChange={(val) => handleUpdateBlock(block.id, val)}
                      />
                    )}
                    {block.type === "two-column" && (
                      <TwoColumnBlock
                        left={block.content ? JSON.parse(block.content).left : ""}
                        right={block.content ? JSON.parse(block.content).right : ""}
                        onChange={(side, val) =>
                          handleUpdateBlock(
                            block.id,
                            JSON.stringify({
                              ...(block.content ? JSON.parse(block.content) : {}),
                              [side]: val,
                            })
                          )
                        }
                      />
                    )}
                    {block.type === "interview" && (
                      <InterviewBlock
                        qaList={block.content ? JSON.parse(block.content) : []}
                        onChange={(qaList) => handleUpdateBlock(block.id, JSON.stringify(qaList))}
                      />
                    )}
                    {block.type === "double-image" && (
                      <DoubleImageBlock
                        left={block.content ? JSON.parse(block.content).left : ""}
                        right={block.content ? JSON.parse(block.content).right : ""}
                        onChange={(side, val) =>
                          handleUpdateBlock(
                            block.id,
                            JSON.stringify({
                              ...(block.content ? JSON.parse(block.content) : {}),
                              [side]: val,
                            })
                          )
                        }
                      />
                    )}
                    {block.type !== "hero-quote" &&
                      block.type !== "two-column" &&
                      block.type !== "interview" &&
                      block.type !== "double-image" && (
                        <textarea
                          value={block.content}
                          onChange={(e) => handleUpdateBlock(block.id, e.target.value)}
                          placeholder={`Write your ${block.type} content...`}
                          className="w-full border rounded p-2"
                        />
                      )}

                    {/* Controls */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMoveBlock(block.id, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMoveBlock(block.id, "down")}
                        disabled={index === blocks.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500"
                        onClick={() => handleDeleteBlock(block.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
