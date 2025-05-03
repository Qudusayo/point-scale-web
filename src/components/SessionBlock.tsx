"use client";

import React from "react";
import { Import, Download } from "lucide-react";
import Button from "./ui/Button";
import { useUserStore } from "../store/useUserStore";

interface SessionBlockProps {
  session: {
    _id: string;
    session: string;
  };
  currentSessionId: string;
  deeplink?: string;
}

const SessionBlock: React.FC<SessionBlockProps> = ({
  session,
  currentSessionId,
  deeplink,
}) => {
  const { makeRequest, fetchedSessions, addFetchedSession } = useUserStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchedSession = fetchedSessions[session._id];
  const importUrl = fetchedSession?.data || deeplink;

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const response = await makeRequest("/api/fetch-sessional-results", {
        session: session._id,
      });

      if (response?.data) {
        addFetchedSession(session._id, {
          session_id: session._id,
          data: response.data
        });
      }
    } catch (error) {
      console.error("Error fetching session results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {session.session} Session
          </h3>
          {session._id === currentSessionId && (
            <p className="text-sm text-blue-600 mt-1">Current Session</p>
          )}
        </div>
        <div className="w-full">
          {importUrl ? (
            <a
              href={importUrl}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Import size={16} />
              Import
            </a>
          ) : (
            <Button
              onClick={handleFetch}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Download size={16} />
              {isLoading ? "Fetching..." : "Fetch Results"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionBlock; 