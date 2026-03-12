"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "../../store/useUserStore";
import SessionBlock from "@/components/SessionBlock";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResultDocument } from "@/components/transcript/ResultDocument";
import { Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const SessionsPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, userData, fetchedSessions, makeRequest, addFetchedSession } = useUserStore();
  const [isPreparing, setIsPreparing] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });

  const handlePrepareTranscript = async () => {
    if (!userData?.sessions || userData.sessions.length === 0) {
      alert("No academic sessions found for your profile.");
      return;
    }
    
    setIsPreparing(true);
    setIsReady(false);
    const total = userData.sessions.length;
    setProgress({ current: 0, total });

    try {
      for (let i = 0; i < userData.sessions.length; i++) {
        const session = userData.sessions[i];
        
        // Use getState() for reactive status inside the loop
        const currentFetched = useUserStore.getState().fetchedSessions;
        
        if (!currentFetched[session._id]) {
          const response: any = await makeRequest("/api/fetch-sessional-results", {
            session: session._id,
          });
          if (response?.result) {
            addFetchedSession(session._id, {
              session_id: session._id,
              result: response.result,
              bio_data: response.bio_data,
              data: response.data
            });
          }
        }
        setProgress(prev => ({ ...prev, current: i + 1 }));
      }
      setIsReady(true);
    } catch (error) {
      console.error("Error preparing transcript:", error);
      alert("Failed to fetch all sessions. Please try again.");
    } finally {
      setIsPreparing(false);
    }
  };

  const getConsolidatedResults = () => {
    if (!userData?.sessions) return [];
    return userData.sessions.flatMap(s => fetchedSessions[s._id]?.result || []);
  };

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

          {/* Student Profile Info */}
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Student Profile</span>
              <h2 className="text-lg font-bold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.matricNo}</p>
            </div>
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
            
            {/* Generate Transcript Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              {!isReady ? (
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                  onClick={handlePrepareTranscript}
                  disabled={isPreparing}
                >
                  {isPreparing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Fetching Sessions ({progress.current}/{progress.total})</span>
                    </>
                  ) : (
                    <>
                      <FileText size={20} />
                      <span>Prepare Full Transcript</span>
                    </>
                  )}
                </button>
              ) : (
                <PDFDownloadLink
                  document={
                    <ResultDocument 
                      data={getConsolidatedResults()} 
                      studentInfo={{ name: userData.name, matricNo: userData.matricNo }} 
                      bioData={userData.bio_data}
                    />
                  }
                  fileName={`Transcript_${userData.matricNo}.pdf`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  {({ loading }) => (
                    <>
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Generating PDF...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={20} />
                          <span>Download Transcript</span>
                        </>
                      )}
                    </>
                  )}
                </PDFDownloadLink>
              )}
              <p className="text-xs text-center text-gray-500 mt-3 italic">
                {!isReady 
                  ? "Fetches all academic sessions to generate a consolidated PDF"
                  : "All sessions fetched successfully! Click to download."
                }
              </p>
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
