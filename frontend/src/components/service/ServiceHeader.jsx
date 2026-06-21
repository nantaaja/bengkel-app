import { LuPlus } from "react-icons/lu";

export default function ServiceHeader({ onAdd }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-semibold text-white">Daftar Pelayanan Servis</h1>

        <p className="mt-1 text-zinc-400">Kelola seluruh transaksi pelayanan servis bengkel.</p>
      </div>

      <button
        onClick={onAdd}
        className="flex h-12 items-center gap-2 rounded-2xl bg-orange-600 px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-700"
      >
        <LuPlus size={20} />
        <span>Tambah Pelayanan</span>
      </button>
    </div>
  );
}
