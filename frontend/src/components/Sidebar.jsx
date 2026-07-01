import { useState } from "react";
import { MdDashboard, MdOutlineKeyboardArrowRight, MdClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { LuPackage, LuUsers, LuHistory } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const [search, setSearch] = useState("");

  const menus = [
    { title: "Dashboard",         path: "/",                  icon: <MdDashboard size={18} /> },
    { title: "Sparepart",         path: "/sparepart",         icon: <LuPackage size={18} /> },
    { title: "Pelayanan Service", path: "/pelayanan-service", icon: <LuUsers size={18} /> },
    { title: "Riwayat Transaksi", path: "/riwayat-transaksi", icon: <LuHistory size={18} /> },
  ];

  const filteredMenus = menus.filter((menu) =>
    menu.title.toLowerCase().includes(search.toLowerCase())
  );

  const menuClass = ({ isActive }) =>
    `flex items-center justify-between px-4 h-12 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-white"
        : "text-zinc-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-screen w-[270px] flex-col
          border-r border-white/10 bg-[#050505]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:h-auto lg:min-h-screen
        `}
      >
        {/* Tombol close (mobile only) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 lg:hidden"
        >
          <MdClose size={18} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-8 text-center">
          <a href="/">
            <img src="/img/logo-bengkel.png" alt="logo" className="mx-auto block w-[200px]" />
          </a>
        </div>

        {/* Search */}
        <div className="mt-7 px-5">
          <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 shadow-lg backdrop-blur-md">
            <FiSearch className="text-zinc-400" />
            <input
              type="text"
              placeholder="Cari Menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="mt-8 space-y-2 overflow-y-auto px-4">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                end={menu.path === "/"}
                onClick={onClose}
                className={menuClass}
              >
                <div className="flex items-center gap-3">
                  {menu.icon}
                  <span className="text-sm font-medium">{menu.title}</span>
                </div>
                <MdOutlineKeyboardArrowRight size={18} />
              </NavLink>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 py-5 text-center text-sm text-zinc-400">
              Menu tidak ditemukan.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="relative h-[260px] overflow-hidden border border-white/10">
            <img
              src="/img/image 11.png"
              alt="bengkel"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute right-4 bottom-4 left-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-md">
              <h2 className="text-lg font-bold text-white">Bengkel Twin Motor</h2>
              <p className="mt-1 text-xs text-zinc-200">Jl. Limbungan no. 69, Pekanbaru</p>
              <div className="mt-3 space-y-1.5">
                <p className="text-xs text-pink-300">📞 0896-5337-3859</p>
                <p className="text-xs text-zinc-100">✉ twin@motor.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}