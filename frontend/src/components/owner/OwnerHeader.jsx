import { useState, useEffect, useRef } from "react";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function OwnerHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();
  const location    = useLocation();

  const handleLogout = () => { setIsOpen(false); navigate("/login"); };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Breadcrumb
  const pathnames = location.pathname.replace("/owner", "").split("/").filter(Boolean);
  const format    = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <header className="flex h-[90px] items-center justify-between border-b border-white/10 px-8">
      {/* LEFT — breadcrumb */}
      <div className="flex items-center gap-3 select-none">
        <span className="text-lg text-zinc-400">TwinMotor</span>
        <span className="text-zinc-600">&gt;</span>
        <span className="text-lg text-zinc-400">Pemilik</span>
        {pathnames.length === 0 ? (
          <>
            <span className="text-zinc-600">&gt;</span>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </>
        ) : (
          pathnames.map((val, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-zinc-600">&gt;</span>
              <h1 className="text-lg font-semibold text-white">{format(val)}</h1>
            </div>
          ))
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHelpCircle size={18} />
        </button>

        <div className="relative ml-2" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-orange-500 focus:outline-none"
          >
            <img src="/img/profile.png" alt="profile" className="h-12 w-12 object-cover" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl z-50">
              <div className="flex flex-col items-center text-center">
                <img src="/img/profile.png" alt="profile" className="h-20 w-20 rounded-full border-2 border-zinc-700 object-cover mb-3" />
                <h2 className="text-base font-semibold text-white">Pemilik</h2>
                <p className="text-xs text-zinc-400 mt-0.5">owner@bengkeltwinmotor.com</p>
                <span className="mt-3 inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 border border-orange-500/20">
                  Pemilik Bengkel
                </span>
              </div>
              <hr className="my-4 border-white/10" />
              <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white">
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}