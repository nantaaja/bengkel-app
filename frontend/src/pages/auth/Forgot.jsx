import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 sm:p-8 font-sans">
      <div className="w-full max-w-5xl bg-[#333333] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-[#2a2a2a]">
        
        {/* Left Side - Image Background */}
        <div className="hidden md:flex md:w-1/2 relative flex-col justify-center items-center p-10 overflow-hidden">
          <img
            src="/img/bg-bengkel.jpg"
            alt="Background Bengkel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 mix-blend-multiply"></div>
          <div className="relative z-10 text-center flex flex-col items-center">
            <h2 className="text-4xl font-extrabold mb-4 text-white tracking-wide drop-shadow-md">
              Bengkel App
            </h2>
            <p className="text-gray-300 max-w-xs text-sm leading-relaxed drop-shadow">
              Solusi terbaik untuk manajemen bengkel Anda. Kelola pelanggan,
              order, dan layanan dengan mudah.
            </p>
          </div>
        </div>

        {/* Right Side - Form Forgot Password */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative">
          <div className="w-full max-w-sm flex-grow flex flex-col justify-center">
            
            <div className="mb-8 text-left">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-gray-400 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-black/40 border border-[#444] rounded-xl focus:ring-4 focus:ring-[#F24822]/20 focus:border-[#F24822] outline-none transition-all shadow-sm placeholder-gray-500 text-white text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#F24822] hover:bg-[#d63f1e] active:bg-[#b9361a] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#F24822]/20 flex items-center justify-center text-sm"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              Ingat password Anda?{" "}
              <Link
                to="/login"
                className="text-[#F24822] hover:opacity-80 font-bold transition-colors"
              >
                Kembali ke Login
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center w-full">
            <p className="text-xs font-medium text-gray-500 tracking-wide">
              © 2026 Bengkel Twin Motor. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}