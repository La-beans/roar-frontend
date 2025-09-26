"use client";

interface BlockSidebarProps {
  onAddBlock: (type: string, content?: string) => void;
  activeTab: string;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  setSelectedColor: (color: string) => void;
}

export default function BlockSidebar({
  activeTab,
  selectedFont,
  setSelectedFont,
  setSelectedColor,
}: BlockSidebarProps) {
  // Fonts list
  const fonts = ["DM Serif Display", "Inter", "Lora", "Urbanist"];

  // Font colors
  const fontColors = [
    { name: "Black", value: "#1E1E1E" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0066FF" },
    { name: "Green", value: "#008000" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      {/* Font Tab */}
      {activeTab === "font" && (
        <div>
          <h3 className="font-medium mb-3">Choose Font</h3>
          <div className="space-y-2">
            {fonts.map((font) => (
              <button
                key={font}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedFont === font
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                style={{ fontFamily: font }}
                onClick={() => setSelectedFont(font)}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Font Color Tab */}
      {activeTab === "color" && (
        <div>
          <h3 className="font-medium mb-3">Font Colors</h3>
          <div className="flex gap-2 flex-wrap">
            {fontColors.map((color) => (
              <div
                key={color.value}
                className="w-6 h-6 rounded-full cursor-pointer border"
                style={{ backgroundColor: color.value }}
                title={color.name}
                onClick={() => setSelectedColor(color.value)}
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
