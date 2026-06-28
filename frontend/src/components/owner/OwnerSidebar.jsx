import { MdDashboard, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuFileText, LuSettings } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const menus = [
  { title: "Dashboard",        path: "/owner",          icon: <MdDashboard size={18} /> },
  { title: "Laporan Harga Jual", path: "/owner/laporan", icon: <LuFileText size={18} /> },
  { title: "Pengaturan",       path: "/owner/pengaturan", icon: <LuSettings size={18} /> },
];

const menuClass = ({ isActive }) =>
  `flex items-center justify-between px-4 h-12 rounded-2xl transition-all duration-300 ${
    isActive
      ? "bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-white"
      : "text-zinc-400 hover:bg-white/5 hover:text-white"
  }`;

export default function OwnerSidebar() {
  return (
    <aside className="flex min-h-screen w-[290px] flex-col border-r border-white/10 bg-[#050505]">
      {/* Logo */}
      <div className="px-6 pt-8 text-center">
        <a href="/owner">
          <img src="/img/logo-bengkel.png" alt="logo" className="mx-auto block w-[220px]" />
        </a>
      </div>

      {/* Badge role */}
      <div className="mx-5 mt-5 flex items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 py-2">
        <span className="text-sm font-semibold text-orange-400">Pemilik Bengkel</span>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-2 px-4">
        {menus.map((menu, index) => (
          <NavLink key={index} to={menu.path} end={menu.path === "/owner"} className={menuClass}>
            <div className="flex items-center gap-3">
              {menu.icon}
              <span className="text-sm font-medium">{menu.title}</span>
            </div>
            <MdOutlineKeyboardArrowRight size={18} />
          </NavLink>
        ))}
      </div>

      {/* Footer card */}
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