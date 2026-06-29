import { useState, useEffect, useRef } from "react";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios"; // Import api ditambahkan (path menyesuaikan folder owner)

export default function OwnerHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan data user
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();
  const location    = useLocation();

  // 1. Fetch data user profil dari backend
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

  // 2. Fungsi Logout disamakan dengan Header Admin (menghapus token)
  const handleLogout = () => { 
    setIsOpen(false); 
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_EMAIL");
    navigate("/login"); 
  };

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

  // 3. Generate URL avatar otomatis berdasarkan nama user
  const avatarUrl = user 
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea580c&color=fff&bold=true`
    : "/img/profile.png";

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
            {/* Ubah img src menggunakan avatarUrl dinamis */}
            <img src={avatarUrl} alt="profile" className="h-12 w-12 rounded-full object-cover" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl z-50">
              <div className="flex flex-col items-center text-center">
                {/* Ubah img src menggunakan avatarUrl dinamis */}
                <img src={avatarUrl} alt="profile" className="h-20 w-20 rounded-full border-2 border-zinc-700 object-cover mb-3" />
                
                {/* Tampilkan Nama dan Email secara dinamis */}
                <h2 className="text-base font-semibold text-white">
                  {user ? user.name : "Memuat..."}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {user ? user.email : "memuat..."}
                </p>
                
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