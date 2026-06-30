import { useState, useEffect, useRef } from "react";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios"; 

export default function OwnerHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Owner" });
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data);
        setFormData({ name: response.data.name, email: response.data.email, role: response.data.role });
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
    localStorage.removeItem("USER_ROLE");
    navigate("/login"); 
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user.id}`, formData);
      alert("Profil berhasil diperbarui. Silakan login kembali dengan email baru Anda.");
      handleLogout(); // Paksa logout agar sesi sinkron dengan email baru
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan saat memperbarui profil.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pathnames = location.pathname.replace("/owner", "").split("/").filter(Boolean);
  const format = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const avatarUrl = user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea580c&color=fff&bold=true` : "/img/profile.png";

  return (
    <header className="flex h-[90px] items-center justify-between border-b border-white/10 px-8">
      <div className="flex items-center gap-3 select-none">
        <span className="text-lg text-zinc-400">TwinMotor</span>
        <span className="text-zinc-600">&gt;</span>
        <span className="text-lg text-zinc-400">Pemilik</span>
        {pathnames.length === 0 ? (
          <><span className="text-zinc-600">&gt;</span><h1 className="text-lg font-semibold text-white">Dashboard</h1></>
        ) : (
          pathnames.map((val, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-zinc-600">&gt;</span>
              <h1 className="text-lg font-semibold text-white">{format(val)}</h1>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHelpCircle size={18} />
        </button>

        <div className="relative ml-2" ref={dropdownRef}>
          <button onClick={() => setIsOpen(!isOpen)} className="block overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-orange-500 focus:outline-none">
            <img src={avatarUrl} alt="profile" className="h-12 w-12 rounded-full object-cover" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl z-50">
              <div className="flex flex-col items-center text-center">
                <img src={avatarUrl} alt="profile" className="h-20 w-20 rounded-full border-2 border-zinc-700 object-cover mb-3" />
                <h2 className="text-base font-semibold text-white">{user ? user.name : "Memuat..."}</h2>
                <p className="text-xs text-zinc-400 mt-0.5">{user ? user.email : "memuat..."}</p>
                <span className="mt-3 inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 border border-orange-500/20">
                  {user ? user.role : "Loading"}
                </span>
              </div>
              <hr className="my-4 border-white/10" />
              
              {/* Tombol Pengaturan Akun */}
              <button onClick={() => { setIsSettingsOpen(true); setIsOpen(false); }} className="flex w-full mb-2 items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/10 hover:text-white">
                <FiSettings size={16} /> Pengaturan Akun
              </button>
              
              <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white">
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Pengaturan Akun Owner */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold text-white">Pengaturan Akun</h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Nama Lengkap</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-white outline-none focus:border-[#F24822]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Email Akun (Google)</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-white outline-none focus:border-[#F24822]" />
                <p className="mt-2 text-xs text-red-400">*Mengubah email akan mengharuskan Anda untuk login ulang.</p>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsSettingsOpen(false)} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white">Batal</button>
                <button type="submit" className="rounded-xl bg-[#F24822] px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}