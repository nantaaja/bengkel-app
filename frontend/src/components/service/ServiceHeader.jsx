import { LuPlus } from "react-icons/lu";

export default function ServiceHeader({ onAdd }) {
  return (
    <div className="mt-5 mb-10 flex items-start justify-between">
      <div>
        <h1 className="text-[48px] leading-none font-semibold tracking-tight text-white">Daftar Pelayanan Servis</h1>

        <p className="mt-3 text-lg text-zinc-400">Kelola seluruh transaksi pelayanan servis bengkel.</p>
      </div>

      <button
        onClick={onAdd}
        className="flex h-16 items-center gap-3 rounded-2xl bg-gradient-to-b from-[#F39A63] to-[#FF5C00] px-8 text-lg font-medium text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-95"
      >
        <LuPlus size={24} />
        <span>Tambah Pelayanan</span>
      </button>
    </div>
  );
}
