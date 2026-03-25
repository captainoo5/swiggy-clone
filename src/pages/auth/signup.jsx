import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { saveAuth } from "../../utilitis/authServices";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        name: formData.name,
        email: formData.email,
        number: formData.phone,
        password: formData.password
      });

      if (response.data.success) {
        // Save the token and redirect to home.
        saveAuth(response.data.data.token, response.data.data.user);
        navigate("/login");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 text-sm font-bold text-red-500 text-center bg-red-50 p-3 rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Sign Up Form */}
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 ml-1 tracking-wider uppercase">
                  Full Name
                </label>
                <input
                  className="w-full bg-gray-100 border-none rounded-lg py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium"
                  placeholder="Enter your name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 ml-1 tracking-wider uppercase">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="bg-gray-100 px-3 flex items-center rounded-lg text-gray-900 font-bold text-sm">
                    +234
                  </div>
                  <input
                    className="w-full bg-gray-100 border-none rounded-lg py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium"
                    placeholder="98765 43210"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 ml-1 tracking-wider uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-gray-100 border-none rounded-lg py-4 pl-4 pr-12 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#FF5200] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-[#FF5200] text-white font-extrabold py-4 rounded-lg shadow-[0_8px_20px_-4px_rgba(255,82,0,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:scale-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
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