import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#FF5200]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>

        <div className="w-full max-w-[440px] z-10">
          {/* Sign In Card */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] border border-gray-200/15">
            {/* Brand Anchor */}
            <div className="flex flex-col items-center mb-10">
              <div className="text-[#FF5200] font-black text-4xl tracking-tighter mb-2">
                Swiggy
              </div>
              <p className="text-gray-500 font-medium text-sm">
                Elevate your dining experience
              </p>
            </div>

            {/* Identity Provider: Google */}
            <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 active:scale-[0.98] mb-8">
              <img
                alt="Google Logo"
                className="w-5 h-5"
                src="data:image/jpeg;base64,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"
              />
              <span className="text-gray-900 font-semibold text-sm">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-grow bg-gray-300/30"></div>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                or email
              </span>
              <div className="h-[1px] flex-grow bg-gray-300/30"></div>
            </div>

            {/* Form Fields */}
            <form className="space-y-6">
              <div>
                <label
                  className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-xs font-bold text-gray-500 uppercase tracking-tight"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-bold text-[#FF5200] hover:text-orange-700 transition-colors"
                    href="#"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-[#FF5200] text-white font-bold py-4 rounded-full shadow-[0_8px_16px_-4px_rgba(255,82,0,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(255,82,0,0.4)] hover:scale-[1.01] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                type="submit"
              >
                Sign In
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-10 pt-8 border-t border-gray-200/10 text-center">
              <p className="text-gray-500 text-sm">
                Don&apos;t have an account?
                <Link
                  className="text-[#FF5200] font-bold hover:underline underline-offset-4 ml-1"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Contextual Help */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs leading-relaxed max-w-[300px] mx-auto">
              By continuing, you agree to Swiggy&apos;s{" "}
              <a className="underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;