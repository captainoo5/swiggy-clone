import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#FF5200]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md z-10">
          {/* Sign Up Card */}
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] border border-white/20">
            <header className="text-center mb-10">
              <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm font-medium">
                Join the premium food &amp; grocery experience
              </p>
            </header>

            {/* Social Auth */}
            <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gray-100 hover:bg-gray-200 transition-all rounded-lg mb-8 group active:scale-[0.98]">
              <img
                alt="Google Logo"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDigJRHjHB_tAQGVgdNoPuLFmqOrOIK3kCGIzKenwA4XS1klAQQ5duHCf8WvJb6OoVhcFC4LR24ZWxqc_t5EoAxeRt1Sd9NViYKYo_FCi7W1qYbrO4x0CsA30nb6ltw1vD-7bsnNSKwyKgnwWlsqpINGMcrOuBnbe4LuF0LP6I7r5x7O6yCMtNWERY_JTJ5L_jnBXgpUIg4C18n_ovMvvaT1Qc9InLlZyMWJr6ZXQ_0CHtLjGQnoqKlTaZ7BwNaMob4MFpx2fS12Xs"
              />
              <span className="font-bold text-gray-900 text-sm">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold tracking-widest uppercase">
                OR
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Sign Up Form */}
            <form className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 ml-1 tracking-wider uppercase">
                  Full Name
                </label>
                <input
                  className="w-full bg-gray-100 border-none rounded-lg py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium"
                  placeholder="Enter your name"
                  type="text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 ml-1 tracking-wider uppercase">
                  Email Address
                </label>
                <input
                  className="w-full bg-gray-100 border-none rounded-lg py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 ml-1 tracking-wider uppercase">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="bg-gray-100 px-3 flex items-center rounded-lg text-gray-900 font-bold text-sm">
                    +91
                  </div>
                  <input
                    className="w-full bg-gray-100 border-none rounded-lg py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium"
                    placeholder="98765 43210"
                    type="tel"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-[#FF5200] text-white font-extrabold py-4 rounded-lg shadow-[0_8px_20px_-4px_rgba(255,82,0,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm font-medium">
                Already have an account?
                <Link
                  className="text-[#FF5200] font-bold hover:underline underline-offset-4 ml-1"
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-10 pt-6 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-tight">
                By creating an account, I accept the{" "}
                <a className="underline" href="#">
                  Terms &amp; Conditions
                </a>{" "}
                &amp;{" "}
                <a className="underline" href="#">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;