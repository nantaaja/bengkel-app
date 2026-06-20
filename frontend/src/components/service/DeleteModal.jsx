export default function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#151515] p-6">
        <h2 className="text-2xl font-semibold text-white">Hapus Pelayanan</h2>

        <p className="mt-3 text-zinc-400">Apakah Anda yakin ingin menghapus pelayanan servis ini?</p>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-white/5">
            Batal
          </button>

          <button onClick={onConfirm} className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
