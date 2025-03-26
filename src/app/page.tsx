"use client";

import React, { useState } from "react";
import { Link2, ArrowRight, Clipboard } from "lucide-react";

function App() {
  const [deepLink, setDeepLink] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setDeepLink(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <Link2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-700" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Point Scale Linker
          </h1>
        </div>

        <div className="space-y-5 md:space-y-6">
          <div className="relative">
            <textarea
              placeholder="Paste your deep link here..."
              className="w-full h-36 sm:h-40 md:h-48 p-4 md:p-5 bg-gray-50 rounded-xl text-gray-700 placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none border 
                border-gray-200 text-base sm:text-lg"
              value={deepLink}
              onChange={(e) => setDeepLink(e.target.value)}
            />
            <button
              onClick={handlePaste}
              className="absolute top-3 right-3 px-4 py-2 text-sm md:text-base bg-gray-100 hover:bg-gray-200 
                rounded-full text-gray-600 transition-all duration-300 flex items-center gap-2 hover:shadow-md"
            >
              <Clipboard className="w-4 h-4" />
              Paste
            </button>
          </div>

          <a
            href={deepLink || "#"}
            className={`group flex items-center justify-center gap-3 w-full py-4 md:py-5 px-6 rounded-xl 
              font-medium text-lg md:text-xl
              ${
                deepLink
                  ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-md hover:shadow-lg"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } transition-all duration-300`}
            onClick={(e) => !deepLink && e.preventDefault()}
          >
            Open Link
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        <p
          className={`mt-6 text-sm sm:text-base text-gray-400 text-center transition-opacity duration-300 
          ${deepLink ? "opacity-0" : "opacity-100"}`}
        >
          Paste a deep link above to get started
        </p>
      </div>
    </div>
  );
}

export default App;
