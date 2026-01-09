import React, { useState } from "react";
import { Settings, X, Search, LayoutGrid, ChevronDown } from "lucide-react";
import { useLayout } from "../context/LayoutContext";
import { Button } from "./ui/Button";

// Internal Accordion Component
const SettingsAccordion = ({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-bold text-sm text-[#002B4E] uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out px-4 ${
          isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const LayoutSettings = () => {
  const { 
    isSettingsOpen,
    openSettings,
    closeSettings,
    layout,
    setLayout,
    programmeDisplay,
    setProgrammeDisplay,
    storyLayout,
    setStoryLayout,
  } = useLayout();

  // Accordion State (Programme Filter open by default)
  const [openSection, setOpenSection] = useState<"programme" | "course" | "story" | null>(
    "programme"
  );

  const toggleSection = (section: "programme" | "course" | "story") => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Floating Settings Trigger */}
      <button
        onClick={openSettings}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-white p-3 rounded-l-lg shadow-2xl border border-r-0 border-gray-200 hover:bg-gray-50 transition-all group scale-100 hover:scale-110 active:scale-95"
        aria-label="Page Settings"
        title="Customize Layout"
      >
        <Settings
          className="text-gray-600 group-hover:rotate-90 transition-transform duration-500"
          size={24}
        />
      </button>

      {/* Settings Panel Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeSettings}
          />

          {/* Modal */}
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[780px] relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-serif text-xl font-bold text-[#002B4E] flex items-center gap-2">
                <Settings size={20} className="text-brand-gold" />
                Display Settings
              </h3>
              <button
                onClick={closeSettings}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto bg-gray-50/30">
              <div className="space-y-4">
                
                {/* 1. Programme Filter (First) */}
                <SettingsAccordion
                  title="Programme Filter"
                  isOpen={openSection === "programme"}
                  onToggle={() => toggleSection("programme")}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setProgrammeDisplay("multi")}
                      className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden group ${
                        programmeDisplay === "multi"
                          ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                          : "border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          programmeDisplay === "multi"
                            ? "border-brand-primary"
                            : "border-gray-300 group-hover:border-brand-gold"
                        }`}
                      >
                        {programmeDisplay === "multi" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`block text-sm font-bold mb-1 transition-colors flex items-center gap-2 ${
                            programmeDisplay === "multi"
                              ? "text-brand-primary"
                              : "text-gray-800"
                          }`}
                        >
                          <Search size={14} /> Advanced Search
                        </span>
                        <span className="block text-xs text-gray-500 leading-relaxed">
                          Guided finder with multi-select filters for detailed discovery.
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => setProgrammeDisplay("core")}
                      className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden group ${
                        programmeDisplay === "core"
                          ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                          : "border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          programmeDisplay === "core"
                            ? "border-brand-primary"
                            : "border-gray-300 group-hover:border-brand-gold"
                        }`}
                      >
                        {programmeDisplay === "core" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`block text-sm font-bold mb-1 transition-colors flex items-center gap-2 ${
                            programmeDisplay === "core"
                              ? "text-brand-primary"
                              : "text-gray-800"
                          }`}
                        >
                          <LayoutGrid size={14} /> Simple Grid
                        </span>
                        <span className="block text-xs text-gray-500 leading-relaxed">
                          Standard filtered list view. Good for quick browsing.
                        </span>
                      </div>
                    </button>
                  </div>
                </SettingsAccordion>

                {/* 2. Single Course Page (Second) */}
                <SettingsAccordion 
                  title="Single Course Page"
                  isOpen={openSection === "course"}
                  onToggle={() => toggleSection("course")}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setLayout("layout1")}
                      className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden group ${
                        layout === "layout1"
                          ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                          : "border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          layout === "layout1"
                            ? "border-brand-primary"
                            : "border-gray-300 group-hover:border-brand-gold"
                        }`}
                      >
                        {layout === "layout1" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`block text-sm font-bold mb-1 transition-colors ${
                            layout === "layout1"
                              ? "text-brand-primary"
                              : "text-gray-800"
                          }`}
                        >
                          Classic Cinematic
                        </span>
                        <span className="block text-xs text-gray-500 leading-relaxed">
                          Full-screen immersive hero. Best for first-time
                          visitors wanting the brand experience.
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => setLayout("layout2")}
                      className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden group ${
                        layout === "layout2"
                          ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                          : "border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          layout === "layout2"
                            ? "border-brand-primary"
                            : "border-gray-300 group-hover:border-brand-gold"
                        }`}
                      >
                        {layout === "layout2" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`block text-sm font-bold mb-1 transition-colors ${
                            layout === "layout2"
                              ? "text-brand-primary"
                              : "text-gray-800"
                          }`}
                        >
                          Modern Conversion
                        </span>
                        <span className="block text-xs text-gray-500 leading-relaxed">
                          Content-focused split view. Optimized for quick
                          information access and enrollment.
                        </span>
                      </div>
                    </button>
                  </div>
                </SettingsAccordion>

                {/* 3. Story Drawer Layout */}
                <SettingsAccordion
                  title="Story Drawer"
                  isOpen={openSection === "story"}
                  onToggle={() => toggleSection("story")}
                >
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setStoryLayout("single")}
                        className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden group ${
                          storyLayout === "single"
                            ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                            : "border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            storyLayout === "single"
                              ? "border-brand-primary"
                              : "border-gray-300 group-hover:border-brand-gold"
                          }`}
                        >
                          {storyLayout === "single" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`block text-sm font-bold mb-1 transition-colors ${
                              storyLayout === "single" ? "text-brand-primary" : "text-gray-800"
                            }`}
                          >
                            Single
                          </span>
                          <span className="block text-xs text-gray-500 leading-relaxed">
                            Original single-column drawer. Stacks media above content.
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => setStoryLayout("two-column")}
                        className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden group ${
                          storyLayout === "two-column"
                            ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                            : "border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            storyLayout === "two-column"
                              ? "border-brand-primary"
                              : "border-gray-300 group-hover:border-brand-gold"
                          }`}
                        >
                          {storyLayout === "two-column" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`block text-sm font-bold mb-1 transition-colors ${
                              storyLayout === "two-column" ? "text-brand-primary" : "text-gray-800"
                            }`}
                          >
                            Two-Column
                          </span>
                          <span className="block text-xs text-gray-500 leading-relaxed">
                            Split view with media and content side-by-side for wider screens.
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* A/B testing removed — simplified controls */}
                  </div>
                </SettingsAccordion>

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <Button
                size="sm"
                variant="gold"
                onClick={closeSettings}
                className="px-6"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

