"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "../../store/useUserStore";
import SessionBlock from "@/components/SessionBlock";

const SessionsPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, userData } = useUserStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !userData) {
    return null;
  }

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
              {userData?.sessions?.map((session) => (
                <SessionBlock
                  key={session._id}
                  session={session}
                  currentSessionId={userData.session_id}
                  deeplink={session._id === userData.session_id ? userData.data : undefined}
                />
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
