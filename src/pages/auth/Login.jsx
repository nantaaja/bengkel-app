import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  /* handle input */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /* process login */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.username,
        password: dataForm.password,
        expiresInMins: 30,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError(err.message || "Network Error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 sm:p-8 font-sans">
      <div className="w-full max-w-5xl bg-[#333333] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-[#2a2a2a]">
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

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative">
          <div className="w-full max-w-sm flex-grow flex flex-col justify-center">
            <div className="mb-8 text-left">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Welcome Back 👋
              </h2>
              <p className="text-gray-400 text-sm">
                Silakan masukkan username dan password Anda.
              </p>
            </div>

            {error && (
              <div className="bg-red-900/20 border-l-4 border-red-500 mb-6 p-4 text-sm text-red-400 rounded-r-lg flex items-center shadow-sm">
                <BsFillExclamationDiamondFill className="text-red-500 me-3 text-lg shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {loading && (
              <div className="bg-black/50 border-l-4 border-gray-600 mb-6 p-4 text-sm text-gray-300 rounded-r-lg flex items-center shadow-sm">
                <ImSpinner2 className="me-3 animate-spin text-white text-lg shrink-0" />
                <span className="font-medium">Memproses data...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-300 mb-1.5"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-[#444] rounded-xl focus:ring-4 focus:ring-[#F24822]/20 focus:border-[#F24822] outline-none transition-all shadow-sm placeholder-gray-500 text-white text-sm"
                  placeholder="Masukkan username Anda"
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot"
                    className="text-sm text-[#F24822] hover:opacity-80 font-semibold transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-[#444] rounded-xl focus:ring-4 focus:ring-[#F24822]/20 focus:border-[#F24822] outline-none transition-all shadow-sm placeholder-gray-500 text-white text-sm"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center pt-1 pb-3">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-[#F24822] bg-black border-[#444] rounded focus:ring-[#F24822] focus:ring-2 focus:ring-offset-[#333333] cursor-pointer transition-colors"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-[#F24822] cursor-pointer select-none"
                >
                  Ingat saya
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F24822] hover:bg-[#d63f1e] active:bg-[#b9361a] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#F24822]/20 disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center text-sm"
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin me-2 text-lg" />
                    Memproses...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-[#F24822] hover:opacity-80 font-bold transition-colors"
              >
                Daftar sekarang
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
