"use client";

import React from "react";
import { Import } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

interface Session {
  id: string;
  year: string;
}

const SessionsPage: React.FC = () => {
  const sessions: Session[] = [
    {
      id: "1",
      year: "2023/2024",
    },
    {
      id: "2",
      year: "2022/2023",
    },
  ];

  const handleImport = (sessionId: string) => {
    // Deep link URL for the mobile app
    const deepLinkUrl = `campusportal://sessions/${sessionId}`;
    window.location.href = deepLinkUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with logo and branding */}
          <div className="bg-blue-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white text-blue-600 mb-4 transition-transform hover:scale-105 duration-300">
              <Image
                src={"/logo.png"}
                alt="Logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full"
              />
            </div>
            <h1 className="text-white text-2xl font-bold">Available Results</h1>
            <p className="text-blue-100">
              View and import your academic sessions
            </p>
          </div>

          {/* Sessions List */}
          <div className="px-6 py-8">
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {session.year} Session
                      </h3>
                    </div>
                    <Button
                      onClick={() => handleImport(session.id)}
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                    >
                      <Import size={16} />
                      Import
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Point Scale. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
