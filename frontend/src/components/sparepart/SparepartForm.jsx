import { useEffect, useState } from "react";

export default function SparepartForm({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    nama_barang: "",
    supplier: "",
    tanggal_masuk: "",
    stok: "",
    harga_modal: "",
    persentase_jual: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nama_barang: initialData.nama_barang || "",
        supplier: initialData.supplier || "",
        tanggal_masuk: initialData.tanggal_masuk || "",
        stok: initialData.stok || "",
        harga_modal: initialData.harga_modal || "",
        persentase_jual: initialData.persentase_jual || "",
      });
    } else {
      setForm({
        nama_barang: "",
        supplier: "",
        tanggal_masuk: "",
        stok: "",
        harga_modal: "",
        persentase_jual: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <h2 className="text-2xl font-semibold text-white">{initialData ? "Edit Sparepart" : "Tambah Sparepart"}</h2>

          <p className="mt-1 text-sm text-zinc-400">Lengkapi seluruh data sparepart.</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Nama Barang</label>

              <input
                type="text"
                name="nama_barang"
                value={form.nama_barang}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">Supplier</label>

              <input
                type="text"
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">Tanggal Masuk</label>

              <input
                type="date"
                name="tanggal_masuk"
                value={form.tanggal_masuk}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">Stok</label>

              <input
                type="number"
                name="stok"
                value={form.stok}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">Harga Modal</label>

              <input
                type="number"
                name="harga_modal"
                value={form.harga_modal}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">Persentase Jual (%)</label>

              <input
                type="number"
                name="persentase_jual"
                value={form.persentase_jual}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/10"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-xl bg-orange-600 px-5 py-3 font-medium text-white transition hover:bg-orange-700"
            >
              {initialData ? "Simpan Perubahan" : "Tambah Barang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
