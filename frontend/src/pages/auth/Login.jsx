import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../../api/axios";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* process Google login */
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoading(true);
      setError(""); // Bersihkan error sebelumnya jika ada
      try {
        const res = await api.post("/auth/google", {
          access_token: codeResponse.access_token,
        });

        if (res.status === 200) {
          localStorage.setItem("ACCESS_TOKEN", res.data.access_token);
          localStorage.setItem("USER_EMAIL", res.data.user.email);
          
          if (res.data.user.email === "twinmotorowner@gmail.com") {
            window.location.href = "/owner"; // Owner diarahkan ke dashboard pemilih
          } else {
            window.location.href = "/"; // Admin diarahkan ke dashboard biasa
          }
        }
      } catch (err) {
        console.error(err);
        // Tampilkan error menggunakan kotak peringatan desain aslimu
        setError(err.response?.data?.message || "Terjadi kesalahan saat memproses login.");
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      setError("Proses Login Google dibatalkan.");
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black p-4 font-sans sm:p-8">
      <div className="flex min-h-[600px] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#2a2a2a] bg-[#333333] shadow-2xl md:flex-row">
        {/* BAGIAN KIRI - GAMBAR BENGKEL */}
        <div className="relative hidden flex-col items-center justify-center overflow-hidden p-10 md:flex md:w-1/2">
          <img
            src="/img/bg-bengkel.jpg"
            alt="Background Bengkel"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/80 mix-blend-multiply"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="mb-4 text-4xl font-extrabold tracking-wide text-white drop-shadow-md">Bengkel App</h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-300 drop-shadow">
              Solusi terbaik untuk manajemen bengkel Anda. Kelola pelanggan, order, dan layanan dengan mudah.
            </p>
          </div>
        </div>

        {/* BAGIAN KANAN - FORM LOGIN */}
        <div className="relative flex w-full flex-col items-center justify-center p-8 sm:p-12 md:w-1/2">
          <div className="flex w-full max-w-sm flex-grow flex-col justify-center">
            {/* Header Form */}
            <div className="mb-8 text-left">
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">Welcome Back 👋</h2>
              <p className="text-sm text-gray-400">Silakan login menggunakan akun Google Anda.</p>
            </div>

            {/* Kotak Peringatan Error */}
            {error && (
              <div className="mb-6 flex items-center rounded-r-lg border-l-4 border-red-500 bg-red-900/20 p-4 text-sm text-red-400 shadow-sm">
                <BsFillExclamationDiamondFill className="me-3 shrink-0 text-lg text-red-500" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Kotak Loading */}
            {loading && (
              <div className="mb-6 flex items-center rounded-r-lg border-l-4 border-gray-600 bg-black/50 p-4 text-sm text-gray-300 shadow-sm">
                <ImSpinner2 className="me-3 shrink-0 animate-spin text-lg text-white" />
                <span className="font-medium">Memproses data...</span>
              </div>
            )}

            {/* Tombol Login Google */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => loginWithGoogle()}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FcGoogle className="text-xl" />
                {loading ? "Memproses..." : "Sign in with Google"}
              </button>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="mt-10 w-full text-center">
            <p className="text-xs font-medium tracking-wide text-gray-500">
              © 2026 Bengkel Twin Motor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
