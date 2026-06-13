import { LuTriangleAlert } from "react-icons/lu";

export default function DeleteModal({ open, onClose, onConfirm, sparepart }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900">
        {/* Header */}
        <div className="flex flex-col items-center p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
            <LuTriangleAlert size={42} className="text-red-500" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-white">Hapus Sparepart</h2>

          <p className="mt-3 text-center text-sm leading-6 text-zinc-400">
            Apakah kamu yakin ingin menghapus data sparepart berikut?
          </p>

          <div className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium text-white">{sparepart?.nama_barang}</h3>

            <p className="mt-1 text-sm text-zinc-500">{sparepart?.kode_barang}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-white/10 p-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/10"
          >
            Batal
          </button>

          <button
            onClick={() => onConfirm(sparepart)}
            className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
