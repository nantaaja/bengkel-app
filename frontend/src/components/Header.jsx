import { useState, useEffect, useRef } from "react";
import { FiHelpCircle, FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

export default function Header({ onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_EMAIL");
    navigate("/login");
  };

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
  const formatBreadcrumb = (string) =>
    string.replace(/-/g, " ").split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const avatarUrl = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea580c&color=fff&bold=true`
    : "/img/profile.png";

  return (
    <header className="flex h-[70px] sm:h-[90px] shrink-0 items-center justify-between border-b border-white/10 px-3 sm:px-8">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 lg:hidden"
        >
          <FiMenu size={18} />
        </button>

        <span className="hidden sm:inline text-lg text-zinc-400 shrink-0">TwinMotor</span>

        {pathnames.length === 0 ? (
          <>
            <span className="hidden sm:inline text-zinc-600">&gt;</span>
            <h1 className="text-base sm:text-lg font-semibold text-white truncate">Dashboard</h1>
          </>
        ) : (
          pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const text = formatBreadcrumb(value);
            if (!isLast) {
              return (
                <span key={index} className="hidden sm:flex items-center gap-2 sm:gap-3">
                  <span className="text-zinc-600">&gt;</span>
                  <span className="text-lg text-zinc-400">{text}</span>
                </span>
              );
            }
            return (
              <div key={index} className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="hidden sm:inline text-zinc-600">&gt;</span>
                <h1 className="text-base sm:text-lg font-semibold text-white truncate">{text}</h1>
              </div>
            );
          })
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHelpCircle size={18} />
        </button>

        <div className="relative ml-1 sm:ml-2" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-orange-500 focus:outline-none"
          >
            <img src={avatarUrl} alt="profile" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-3 w-64 sm:w-72 origin-top-right rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <img src={avatarUrl} alt="profile" className="mb-3 h-20 w-20 rounded-full border-2 border-zinc-700 object-cover" />
                <h2 className="text-base font-semibold text-white">{user ? user.name : "Memuat..."}</h2>
                <p className="mt-0.5 text-xs text-zinc-400">{user ? user.email : "memuat..."}</p>
                <span className="mt-3 inline-block rounded-full border border-white/5 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                  {user ? user.role : "Loading"}
                </span>
              </div>
              <hr className="my-4 border-white/10" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
              >
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}