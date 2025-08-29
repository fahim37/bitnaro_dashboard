"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import logo from "../../public/logo.png";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  interface ForgotPasswordResponse {
    message?: string;
    [key: string]: any;
  }

  interface ForgotPasswordBody {
    email?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (step === 3 && newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    const url = `${baseURL}/auth/${
      step === 1
        ? "forgot-password"
        : step === 2
        ? "verify-code"
        : "reset-password"
    }`;
    const body: ForgotPasswordBody = {
      email: email, // Include email for all steps
      otp: step === 2 || step === 3 ? otp.join("") : undefined,
      newPassword: step === 3 ? newPassword : undefined,
      confirmPassword: step === 3 ? confirmPassword : undefined,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: ForgotPasswordResponse = await response.json();

      if (response.ok) {
        setMessage(data.message || "Success!");
        setMessageType("success");
        if (step < 3) {
          setStep(step + 1);
        } else {
          window.location.href = "/login";
        }
      } else {
        setMessage(data.message || "Something went wrong.");
        setMessageType("error");
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
      setMessageType("error");
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length) {
      const newOtp = [...otp];
      for (let i = 0; i < Math.min(pastedData.length, 6 - index); i++) {
        newOtp[index + i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextFocusIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="p-8 rounded-lg shadow-xl bg-white w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" width={56} height={56} priority />
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Enter OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                required
              />
              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={(e) => handleOtpPaste(e, index)}
                    maxLength={1}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required
                  />
                ))}
              </div>
              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setMessage("");
                  setOtp(["", "", "", "", "", ""]);
                  inputRefs.current[0]?.focus();
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-150 ease-in-out"
              >
                Didn't Receive OTP? RESEND OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="mt-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                required
              />
              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Reset Password
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
