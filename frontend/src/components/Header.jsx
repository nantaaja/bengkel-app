import { useState, useEffect, useRef } from "react";
import { FiHelpCircle, FiHeadphones, FiBell, FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios"; // Pastikan path import axios ini sesuai struktur project kamu

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 1. Fetch data user dari backend saat komponen dimuat
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user profil:", error);
      }
    };

    fetchUser();
  }, []);

  // 2. Fungsi Logout membersihkan token sesi
  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem("ACCESS_TOKEN"); // Hapus token dari browser
    localStorage.removeItem("USER_EMAIL");
    navigate("/login");
  };

  // 3. Menutup dropdown jika klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatBreadcrumb = (string) => {
    const words = string.replace(/-/g, " ").split(" ");
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  // Generate URL avatar otomatis berdasarkan nama user agar desainnya rapi dan konsisten
  const avatarUrl = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea580c&color=fff&bold=true`
    : "/img/profile.png";

  return (
    <header className="flex h-[90px] items-center justify-between border-b border-white/10 px-8">
      {/* LEFT  */}
      <div className="flex items-center gap-3 select-none">
        <span className="text-lg text-zinc-400">TwinMotor</span>

        {/* Dashboard */}
        {pathnames.length === 0 ? (
          <>
            <span className="text-zinc-600">&gt;</span>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </>
        ) : (
          pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const formattedText = formatBreadcrumb(value);

            return (
              <div key={index} className="flex items-center gap-3">
                <span className="text-zinc-600">&gt;</span>
                {isLast ? (
                  <h1 className="text-lg font-semibold text-white">{formattedText}</h1>
                ) : (
                  <span className="text-lg text-zinc-400">{formattedText}</span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* ICON HELP */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHelpCircle size={18} />
        </button>

        {/* ICON HEADPHONES */}
        <button className="flex hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHeadphones size={18} />
        </button>

        {/* ICON BELL */}
        <button className="flex hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiBell size={18} />
        </button>

        {/* COMPONENT PROFILE WITH DROPDOWN */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-orange-500 focus:outline-none"
          >
            <img src={avatarUrl} alt="profile" className="h-12 w-12 rounded-full object-cover" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="ring-opacity-5 absolute right-0 z-50 mt-3 w-72 origin-top-right scale-100 transform rounded-2xl border border-white/10 bg-zinc-900 p-5 opacity-100 shadow-2xl ring-1 ring-black transition-all focus:outline-none">
              <div className="flex flex-col items-center text-center">
                <img
                  src={avatarUrl}
                  alt="profile large"
                  className="mb-3 h-20 w-20 rounded-full border-2 border-zinc-700 object-cover"
                />

                {/* Menampilkan nama dinamis */}
                <h2 className="text-base font-semibold text-white">{user ? user.name : "Memuat..."}</h2>

                {/* Menampilkan email dinamis */}
                <p className="mt-0.5 text-xs text-zinc-400">{user ? user.email : "memuat..."}</p>

                {/* Menampilkan role dinamis */}
                <span className="mt-3 inline-block rounded-full border border-white/5 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                  {user ? user.role : "Loading"}
                </span>
              </div>

              <hr className="my-4 border-white/10" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-transparent py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
