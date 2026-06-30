import { useState } from "react";

import { MdDashboard, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

import { LuPackage, LuFileText, LuSettings, LuUsers, LuHistory } from "react-icons/lu";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [search, setSearch] = useState("");

  const menus = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdDashboard size={18} />,
    },
    {
      title: "Sparepart",
      path: "/sparepart",
      icon: <LuPackage size={18} />,
    },
    {
      title: "Pelayanan Service",
      path: "/pelayanan-service",
      icon: <LuUsers size={18} />,
    },
    {
      title: "Riwayat Transaksi",
      path: "/riwayat-transaksi",
      icon: <LuHistory size={18} />,
    },
  ];

  const filteredMenus = menus.filter((menu) => menu.title.toLowerCase().includes(search.toLowerCase()));

  const menuClass = ({ isActive }) =>
    `
      flex items-center justify-between
      px-4 h-12
      rounded-2xl
      transition-all duration-300

      ${
        isActive
          ? `
            bg-white/10
            backdrop-blur-md
            border border-white/10
            shadow-lg
            text-white
          `
          : `
            text-zinc-400
            hover:bg-white/5
            hover:text-white
          `
      }
    `;

  return (
    <aside className="flex min-h-screen w-[290px] flex-col border-r bg-[#050505]">
      {/* Logo */}
      <div className="px-6 pt-8 text-center">
        <a href="/"><img src="/img/logo-bengkel.png" alt="logo" className="mx-auto block w-[220px]" /></a>
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
      <div className="mt-8 space-y-2 px-4">
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu, index) => (
            <NavLink key={index} to={menu.path} className={menuClass}>
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
        <div className="relative h-[280px] overflow-hidden border border-white/10">
          <img src="/img/image 11.png" alt="bengkel" className="absolute inset-0 h-full w-full object-cover" />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute right-4 bottom-4 left-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-bold text-white">Bengkel Twin Motor</h2>

            <p className="mt-1 text-sm text-zinc-200">Jl. Limbungan no. 69, Pekanbaru</p>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-pink-300">📞 0896-5337-3859</p>

              <p className="text-sm text-zinc-100">✉ twin@motor.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
