import { LuPlus } from "react-icons/lu";

export default function SparepartHeader({ onAdd }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6 mt-3">
      <div>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">Daftar Sparepart</h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400">Kelola seluruh data sparepart bengkel.</p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 self-start rounded-2xl bg-gradient-to-b from-[#F39A63] to-[#FF5C00] px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-medium text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <LuPlus size={20} />
        <span>Tambah Barang</span>
      </button>
    </div>
  );
}