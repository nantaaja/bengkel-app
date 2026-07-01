import { MdDashboard, MdOutlineKeyboardArrowRight, MdClose } from "react-icons/md";
import { LuFileText, LuUsers } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const menus = [
  { title: "Dashboard",          path: "/owner",        icon: <MdDashboard size={18} /> },
  { title: "Laporan Harga Jual", path: "/owner/laporan", icon: <LuFileText size={18} /> },
  { title: "Manajemen Karyawan", path: "/owner/users",   icon: <LuUsers size={18} /> },
];

const menuClass = ({ isActive }) =>
  `flex items-center justify-between px-4 h-12 rounded-2xl transition-all duration-300 ${
    isActive
      ? "bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-white"
      : "text-zinc-400 hover:bg-white/5 hover:text-white"
  }`;

export default function OwnerSidebar({ isOpen, onClose }) {
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
          <a href="/owner">
            <img src="/img/logo-bengkel.png" alt="logo" className="mx-auto block w-[200px]" />
          </a>
        </div>

        {/* Badge role */}
        <div className="mx-5 mt-5 flex items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 py-2">
          <span className="text-sm font-semibold text-orange-400">Pemilik Bengkel</span>
        </div>

        {/* Menu */}
        <div className="mt-6 space-y-2 overflow-y-auto px-4">
          {menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              end={menu.path === "/owner"}
              onClick={onClose}
              className={menuClass}
            >
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