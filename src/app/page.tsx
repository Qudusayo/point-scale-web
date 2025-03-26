"use client";

import { useState } from "react";

export default function Home() {
  const [deepLink, seTdeepLink] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <textarea
          placeholder="Paste your text here"
          className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={deepLink}
          onChange={(e) => seTdeepLink(e.target.value)}
        ></textarea>
        <a
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 block w-full text-center"
          href={deepLink || "#"}
        >
          Click me
        </a>
      </div>
    </div>
  );
}
