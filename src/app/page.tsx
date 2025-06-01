import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
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
            <h1 className="text-white text-2xl font-bold">Quick Import</h1>
            <p className="text-blue-100">Import your result from UI RMS</p>
          </div>

          {/* Login form container */}
          <div className="px-6 py-8">
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Point Scale. All rights reserved.
            </p>
            <p className="text-center mt-2">
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 text-sm">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
