"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../../assets/logo2.png"; // ✅ correct

function LoginScreen({ onLogin, goToSignup }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (email === "oussematurki0@gmail.com" && password === "123456") {
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 800);
    } else {
      setError("Incorrect email or password");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#ef4444]/10 to-[#ef4444]/20">
      {[...Array.from({ length: 20 })].map((_, i) => (
        <div
          key={i}
          className="bubble absolute rounded-full bg-[#ef4444]/20"
          style={{
            left: `${(i * 5 + 10) % 100}%`,
            top: `${(i * 7 + 15) % 100}%`,
            transform: `scale(${i % 3 === 0 ? 0.8 : i % 2 === 0 ? 0.6 : 1})`,
          }}
        />
      ))}

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          {/* ✅ New logo added here */}
          <img src={logo2} alt="GE2.0 Logo" className="mx-auto mb-4 w-20 h-20" />

          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Welcome to GE2.0
          </h1>
          <p className="mb-6 text-center text-sm text-gray-500">
           Caring for your loved ones starts here.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-4 py-3 text-lg outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-4 py-3 text-lg outline-none"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#ef4444] px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#ef4444]/90 hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faFacebook} />
                Continue with Facebook
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faApple} />
                Continue with Apple
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Continue with Email
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={goToSignup}
                className="text-[#ef4444] underline hover:text-[#ef4444]/90"
              >
                Sign up
              </button>
            </p>

            <p className="mt-4 text-center text-xs text-gray-500">
              By signing in, you agree to the{" "}
              <span className="underline">Terms of Use</span> and{" "}
              <span className="underline">Privacy Policy</span>, including the use of cookies.
            </p>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .bubble {
          width: 150px;
          height: 150px;
          animation: float 20s infinite linear;
        }
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
        .bubble:nth-child(even) {
          animation-duration: 25s;
          width: 100px;
          height: 100px;
        }
        .bubble:nth-child(3n) {
          animation-duration: 30s;
          width: 200px;
          height: 200px;
        }
        .bubble:nth-child(5n) {
          animation-duration: 22s;
          width: 120px;
          height: 120px;
        }
      `}</style>
    </div>
  );
}

export default LoginScreen;
