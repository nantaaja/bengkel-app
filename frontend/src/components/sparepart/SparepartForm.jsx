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

  const hargaJual =
    Number(form.harga_modal || 0) + (Number(form.harga_modal || 0) * Number(form.persentase_jual || 0)) / 100;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

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

    onSubmit({
      ...form,
      harga_jual: hargaJual,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="border-b border-white/10 px-8 py-7">
          <h2 className="text-4xl font-semibold text-white">{initialData ? "Edit Barang" : "Tambah Barang"}</h2>

          <p className="mt-2 text-base text-zinc-400">Lengkapi seluruh data sparepart.</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-8 p-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Nama Barang */}
            <div>
              <label className="mb-3 block text-base font-medium text-zinc-300">Nama Barang</label>

              <input
                type="text"
                name="nama_barang"
                value={form.nama_barang}
                onChange={handleChange}
                placeholder="Masukkan nama sparepart"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white transition outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />
            </div>

            {/* Supplier */}
            <div>
              <label className="mb-3 block text-base font-medium text-zinc-300">Supplier</label>

              <input
                type="text"
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                placeholder="Masukkan nama supplier"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white transition outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="mb-3 block text-base font-medium text-zinc-300">Tanggal Masuk</label>

              <input
                type="date"
                name="tanggal_masuk"
                value={form.tanggal_masuk}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white transition outline-none focus:border-orange-500"
              />
            </div>

            {/* Stok */}
            <div>
              <label className="mb-3 block text-base font-medium text-zinc-300">Stok Masuk</label>

              <input
                type="number"
                name="stok"
                value={form.stok}
                onChange={handleChange}
                placeholder="Masukkan jumlah stok"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white transition outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />
            </div>

            {/* Harga Modal */}
            <div>
              <label className="mb-3 block text-base font-medium text-zinc-300">Harga Modal</label>

              <input
                type="number"
                name="harga_modal"
                value={form.harga_modal}
                onChange={handleChange}
                placeholder="Masukkan harga modal"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white transition outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />
            </div>

            {/* Persentase */}
            <div>
              <label className="mb-3 block text-base font-medium text-zinc-300">Persentase Harga Jual</label>

              <input
                type="number"
                name="persentase_jual"
                value={form.persentase_jual}
                onChange={handleChange}
                placeholder="Contoh : 20"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white transition outline-none placeholder:text-zinc-500 focus:border-orange-500"
              />
            </div>

            {/* Harga Jual */}
            <div className="col-span-2">
              <label className="mb-3 block text-base font-medium text-zinc-300">Harga Jual</label>

              <input
                type="text"
                value={formatRupiah(hargaJual)}
                readOnly
                className="h-14 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-white/10 px-5 text-xl font-semibold text-emerald-400 outline-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 border-t border-white/10 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="h-14 rounded-2xl border border-white/10 px-8 text-lg font-medium text-white transition hover:bg-white/10"
            >
              Batal
            </button>

            <button
              type="submit"
              className="h-14 rounded-2xl bg-gradient-to-b from-[#F39A63] to-[#FF5C00] px-8 text-lg font-medium text-white transition hover:brightness-110"
            >
              {initialData ? "Simpan Perubahan" : "Tambah Barang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
