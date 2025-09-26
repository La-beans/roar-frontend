"use client";

import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";

interface EditorToolbarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  selectedFont: string;
  selectedColor: string;
}

export default function EditorToolbar({
  activeTab,
  onChangeTab,
  selectedFont,
  selectedColor,
}: EditorToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Current selections */}
      <div className="flex items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Font:</span>
          <span style={{ fontFamily: selectedFont }}>{selectedFont}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Color:</span>
          <div
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </div>

      {/* Toolbar Tabs */}
      <div className="flex items-center gap-1">
        <Button
          variant={activeTab === "font" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChangeTab("font")}
          className="flex items-center gap-1"
        >
          <Type className="w-3 h-3" />
          Font
        </Button>
        <Button
          variant={activeTab === "color" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChangeTab("color")}
        >
          Color
        </Button>
      </div>
    </div>
  );
}
