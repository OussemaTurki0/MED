"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import logo2 from "../../assets/logo2.png"; // ✅ Logo added here

function SignupScreen({ goToLogin }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      setError("Unable to create account. Please try again.");
      setLoading(false);
    }
  };

  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 5 + 10) % 100}%`,
    top: `${(i * 7 + 15) % 100}%`,
    scale: i % 3 === 0 ? 0.8 : i % 2 === 0 ? 0.6 : 1,
  }));

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#ef4444]/10 to-[#ef4444]/20">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble absolute rounded-full bg-[#ef4444]/20"
          style={{
            left: b.left,
            top: b.top,
            transform: `scale(${b.scale})`,
          }}
        />
      ))}

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          {/* ✅ Logo added above heading */}
          <img src={logo2} alt="GE2.0 Logo" className="mx-auto mb-4 w-20 h-20" />

          <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
            Create an Account
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Be there - even when you’re not.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-4 py-3 text-lg outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-4 py-3 text-lg outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border px-4 py-3 text-lg outline-none"
                placeholder="Confirm your password"
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            {/* Social sign-up buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faFacebook} />
                Sign up with Facebook
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faApple} />
                Sign up with Apple
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Sign up with Email
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={goToLogin}
                className="text-[#ef4444] hover:text-[#ef4444]/90 underline"
              >
                Sign in
              </button>
            </p>

            <p className="mt-4 text-center text-xs text-gray-500">
              By signing up, you agree to the{" "}
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

export default SignupScreen;
