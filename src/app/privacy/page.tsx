import React from "react";
import { Shield } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-[#5271FF]" />
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <p className="text-sm text-gray-500 mb-6">
              Effective Date: March 26, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600">
                Welcome to PointScale! Your privacy is important to us. This
                Privacy Policy explains how we handle user data when you use our
                CGPA calculation app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. No Data Collection
              </h2>
              <p className="text-gray-600">
                PointScale does not collect, store, or share any personal data.
                The app operates entirely on your device, and all calculations
                are performed locally. You enter your results yourself, and no
                data is transmitted to external servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600">
                Since we do not collect any data, there is no processing or
                sharing of personal information. The app solely performs CGPA
                calculations based on the inputs you provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Third-Party Services
              </h2>
              <p className="text-gray-600">
                PointScale does not integrate with any third-party analytics,
                tracking, or data collection services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Data Retention
              </h2>
              <p className="text-gray-600">
                Since we do not collect any data, there is nothing to retain or
                delete. All inputs remain on your device and can be cleared at
                your discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-600">
                As no data is collected, there are no personal records stored
                that require management. You have full control over your inputs
                within the app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Updates to This Privacy Policy
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. Any changes
                will be communicated within the app.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, feel free
                to reach out to us at{" "}
                <a
                  href="mailto:qqudusayo+pointscale@gmail.com"
                  className="text-[#5271FF] hover:text-[#5271FF]/80"
                >
                  qqudusayo+pointscale@gmail.com
                </a>
                .
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                By using PointScale, you acknowledge that no personal data is
                collected or stored by the app.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
