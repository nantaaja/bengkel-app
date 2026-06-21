import { useState, useEffect, useRef } from "react";
import { FiHelpCircle, FiHeadphones, FiBell, FiLogOut } from "react-icons/fi";
// 1. Import useNavigate dari react-router-dom
import { useNavigate } from "react-router-dom"; 

export default function Header() {
  // State untuk mengontrol visibilitas dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 2. Inisialisasi fungsi navigate
  const navigate = useNavigate(); 

  // Fungsi untuk handle logout
  const handleLogout = () => {
    // Tutup dropdown terlebih dahulu
    setIsOpen(false);
    
    // Tempatkan logika pembersihan session/localStorage di sini jika ada, contoh:
    // localStorage.removeItem("token");
    
    // 3. Alihkan halaman ke /login
    navigate("/login"); 
  };

  // Effect untuk menutup dropdown saat klik di luar area profil
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-[90px] items-center justify-between border-b border-white/10 px-8">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span className="text-lg text-zinc-400">TwinMotor</span>
        <span className="text-zinc-600">&gt;</span>
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* ICON HELP */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHelpCircle size={18} />
        </button>

        {/* ICON HEADPHONES */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHeadphones size={18} />
        </button>

        {/* ICON BELL */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiBell size={18} />
        </button>

        {/* COMPONENT PROFILE WITH DROPDOWN */}
        <div className="relative ml-2" ref={dropdownRef}>
          {/* Tombol Foto Profil */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="block overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-orange-500 focus:outline-none"
          >
            <img
              src="/img/profile.png"
              alt="profile"
              className="h-12 w-12 object-cover"
            />
          </button>

          {/* Dropdown Menu (Style ala Google Dark Mode) */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform opacity-100 scale-100 transition-all">
              {/* Info User */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/img/profile.png"
                  alt="profile large"
                  className="h-20 w-20 rounded-full border-2 border-zinc-700 object-cover mb-3"
                />
                <h2 className="text-base font-semibold text-white">Admin 01</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Admin@bengkeltwinmotor.com</p>
                <span className="mt-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 border border-white/5">
                  Admin
                </span>
              </div>

              {/* Garis Pembatas */}
              <hr className="my-4 border-white/10" />

              {/* Tombol Keluar / Logout */}
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