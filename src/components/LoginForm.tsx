"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    matricNumber,
    password,
    isLoading,
    error,
    setMatricNumber,
    setPassword,
    login,
  } = useUserStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("Please accept the Terms and Conditions to continue");
      return;
    }

    await login();

    // Check if login was successful and redirect
    if (useUserStore.getState().isAuthenticated) {
      router.push("/results");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input
            id="matricNumber"
            label="Matric Number"
            type="text"
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            placeholder="Enter your matric number"
            error={error}
            autoComplete="off"
            required
          />
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={error}
            required
            icon={
              showPassword ? (
                <EyeOff
                  className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"
                  onClick={togglePasswordVisibility}
                />
              )
            }
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-150"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I accept the{" "}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Terms and Conditions
              </button>
            </span>
          </label>
        </div>

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? "Fetching ..." : "Fetch Results"}
        </Button>

        <div className="text-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.qudusayo.pointscale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base uppercase font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Download App now
          </a>
        </div>
      </form>

      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms & Conditions – PointScale"
      >
        <div className="prose prose-sm max-w-none">
          <p className="mb-4">
            <strong>Effective Date:</strong> 03 May 2025
          </p>

          <ol className="list-decimal pl-4 space-y-4">
            <li>
              <h3>Use of Matric Number and Portal Credentials</h3>
              <ul>
                <li>
                  To import results from your school&apos;s RMS portal, you will
                  be asked to provide your matric number and portal password.
                </li>
                <li>
                  These credentials are used only temporarily to fetch your
                  academic records.
                </li>
                <li>
                  <strong>We do not store</strong>, log, or share your
                  credentials. They are discarded immediately after use.
                </li>
                <li>
                  By entering your credentials, you consent to this one-time use
                  strictly for data retrieval.
                </li>
              </ul>
            </li>

            <li>
              <h3>Data Privacy</h3>
              <ul>
                <li>
                  PointScale does not collect or store personal data on any
                  server.
                </li>
                <li>
                  All computations and data processing are handled locally on
                  your device.
                </li>
                <li>
                  Your academic data is never shared with third-party services.
                </li>
              </ul>
            </li>

            <li>
              <h3>No Affiliation with the University</h3>
              <p>
                PointScale is not affiliated with or officially endorsed by the
                University of Ibadan or its RMS system. It is an independent
                tool built by students for students.
              </p>
            </li>

            <li>
              <h3>User Responsibility</h3>
              <ul>
                <li>
                  Users are responsible for ensuring the accuracy of their
                  provided credentials.
                </li>
                <li>
                  Using someone else&apos;s login details without permission is
                  strictly prohibited.
                </li>
              </ul>
            </li>

            <li>
              <h3>Limitation of Liability</h3>
              <ul>
                <li>
                  PointScale is not liable for miscalculations, errors, or data
                  discrepancies.
                </li>
                <li>Always verify your CGPA with official school records.</li>
              </ul>
            </li>

            <li>
              <h3>Changes to Terms</h3>
              <p>
                These terms may be updated over time. Continued use of the app
                constitutes acceptance of any revised terms.
              </p>
            </li>

            <li>
              <h3>Contact</h3>
              <p>
                For questions or support,{" "}
                <a
                  href="https://www.qudusayo.pro/contact-me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  contact us at here
                </a>
                .
              </p>
            </li>
          </ol>
        </div>
      </Modal>
    </>
  );
};

export default LoginForm;
