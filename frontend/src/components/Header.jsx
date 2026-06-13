import { FiHelpCircle, FiHeadphones, FiBell } from "react-icons/fi";

export default function Header() {
  return (
    <header className="flex h-[90px] items-center justify-between border-b border-white/10  px-8">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span className="text-lg text-zinc-400">TwinMotor</span>

        <span className="text-zinc-600">&gt;</span>

        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* ICON */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHelpCircle size={18} />
        </button>

        {/* ICON */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiHeadphones size={18} />
        </button>

        {/* ICON */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300 transition-all hover:text-white">
          <FiBell size={18} />
        </button>

        {/* PROFILE */}
        <img src="/img/profile.png" alt="profile" className="ml-2 h-12 w-12 rounded-full object-cover" />
      </div>
    </header>
  );
}
