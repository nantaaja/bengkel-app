import { useEffect, useMemo, useState } from "react";

export default function ServiceForm({ open, onClose, onSubmit, initialData, serviceTypes = [], spareparts = [] }) {
  const [form, setForm] = useState({
    nama_pelanggan: "",
    no_hp: "",
    tanggal_servis: "",
    nama_kendaraan: "",
    plat_kendaraan: "",
    service_type_id: "",
    status: "Belum Dikerjakan",
  });

  const [selectedSpareparts, setSelectedSpareparts] = useState([]);

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        nama_pelanggan: initialData.nama_pelanggan || "",
        no_hp: initialData.no_hp || "",
        tanggal_servis: initialData.tanggal_servis || "",
        nama_kendaraan: initialData.nama_kendaraan || "",
        plat_kendaraan: initialData.plat_kendaraan || "",
        service_type_id: initialData.service_type_id || "",
        status: initialData.status || "Belum Dikerjakan",
      });

      setSelectedSpareparts(
        initialData.service_spareparts?.map((item) => ({
          sparepart_id: item.sparepart_id,
          qty: item.jumlah,
        })) || [],
      );
    } else {
      setForm({
        nama_pelanggan: "",
        no_hp: "",
        tanggal_servis: "",
        nama_kendaraan: "",
        plat_kendaraan: "",
        service_type_id: "",
        status: "Belum Dikerjakan",
      });

      setSelectedSpareparts([]);
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectedServiceType = useMemo(() => {
    return serviceTypes.find((item) => item.id === Number(form.service_type_id)) || null;
  }, [form.service_type_id, serviceTypes]);

  const biayaServis = selectedServiceType ? Number(selectedServiceType.harga_servis) : 0;

  const totalSparepart = useMemo(() => {
    return selectedSpareparts.reduce((total, item) => {
      const sparepart = spareparts.find((sp) => sp.id === Number(item.sparepart_id));

      if (!sparepart) return total;

      return total + Number(sparepart.harga_jual) * Number(item.qty);
    }, 0);
  }, [selectedSpareparts, spareparts]);

  const totalBiaya = biayaServis + totalSparepart;
  const addSparepart = () => {
    setSelectedSpareparts([
      ...selectedSpareparts,
      {
        sparepart_id: "",
        qty: 1,
      },
    ]);
  };

  const updateSparepart = (index, field, value) => {
    const updated = [...selectedSpareparts];

    updated[index][field] = value;

    setSelectedSpareparts(updated);
  };

  const removeSparepart = (index) => {
    const updated = [...selectedSpareparts];

    updated.splice(index, 1);

    setSelectedSpareparts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      spareparts: selectedSpareparts,
    });
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#141414] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              {initialData ? "Edit Pelayanan Servis" : "Tambah Pelayanan Servis"}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">Lengkapi informasi pelanggan, kendaraan, dan sparepart.</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Tutup
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 p-8">
          {/* ========================= */}
          {/* DATA PELANGGAN */}
          {/* ========================= */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">Data Pelanggan</h3>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Nama Pelanggan</label>

                <input
                  type="text"
                  name="nama_pelanggan"
                  value={form.nama_pelanggan}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Nomor HP</label>

                <input
                  type="text"
                  name="no_hp"
                  value={form.no_hp}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* DATA KENDARAAN */}
          {/* ========================= */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">Data Kendaraan</h3>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Nama Kendaraan</label>

                <input
                  type="text"
                  name="nama_kendaraan"
                  value={form.nama_kendaraan}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Plat Kendaraan</label>

                <input
                  type="text"
                  name="plat_kendaraan"
                  value={form.plat_kendaraan}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Tanggal Servis</label>

                <input
                  type="date"
                  name="tanggal_servis"
                  value={form.tanggal_servis}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Detail Servis</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Jenis Servis</label>

                <select
                  name="service_type_id"
                  value={form.service_type_id}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                >
                  <option value="">Pilih Jenis Servis</option>

                  {serviceTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_servis}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-4 text-white transition outline-none focus:border-orange-500"
                >
                  <option value="Belum Dikerjakan">Belum Dikerjakan</option>

                  <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>

                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Sparepart Digunakan</h3>

                <button
                  type="button"
                  onClick={addSparepart}
                  className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
                >
                  Tambah Sparepart
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full">
                  <thead className="border-b border-white/10 bg-white/5">
                    <tr className="text-sm text-zinc-400">
                      <th className="px-5 py-4 text-left">Sparepart</th>

                      <th className="px-5 py-4 text-center">Qty</th>

                      <th className="px-5 py-4 text-right">Harga</th>

                      <th className="px-5 py-4 text-right">Subtotal</th>

                      <th className="px-5 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedSpareparts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-zinc-500">
                          Belum ada sparepart dipilih.
                        </td>
                      </tr>
                    ) : (
                      selectedSpareparts.map((item, index) => {
                        const sparepart = spareparts.find((sp) => sp.id === Number(item.sparepart_id));

                        const subtotal = Number(sparepart?.harga_jual || 0) * Number(item.qty);

                        return (
                          <tr key={index} className="border-b border-white/10">
                            <td className="px-5 py-4">
                              <select
                                value={item.sparepart_id}
                                onChange={(e) => updateSparepart(index, "sparepart_id", e.target.value)}
                                className="h-10 w-full rounded-xl border border-white/10 bg-[#1C1C1C] px-3 text-white outline-none"
                              >
                                <option value="">Pilih Sparepart</option>

                                {spareparts.map((sp) => (
                                  <option key={sp.id} value={sp.id}>
                                    {sp.nama_barang}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td className="px-5 py-4">
                              <input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={(e) => updateSparepart(index, "qty", e.target.value)}
                                className="h-10 w-24 rounded-xl border border-white/10 bg-[#1C1C1C] text-center text-white outline-none"
                              />
                            </td>

                            <td className="px-5 py-4 text-right text-white">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(sparepart?.harga_jual || 0)}
                            </td>

                            <td className="px-5 py-4 text-right font-medium text-green-400">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(subtotal)}
                            </td>

                            <td className="px-5 py-4 text-center">
                              <button
                                type="button"
                                onClick={() => removeSparepart(index)}
                                className="rounded-lg bg-red-500/20 px-3 py-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-[#101010] px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-8">
                <span className="w-40 text-zinc-400">Biaya Servis</span>

                <span className="font-medium text-white">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(biayaServis)}
                </span>
              </div>

              <div className="flex items-center gap-8">
                <span className="w-40 text-zinc-400">Total Sparepart</span>

                <span className="font-medium text-white">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalSparepart)}
                </span>
              </div>

              <div className="flex items-center gap-8">
                <span className="w-40 text-lg font-semibold text-white">Total Biaya</span>

                <span className="text-2xl font-bold text-orange-500">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(totalBiaya)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-2xl bg-orange-600 px-8 py-3 font-medium text-white transition hover:bg-orange-700"
              >
                {initialData ? "Simpan Perubahan" : "Simpan Pelayanan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
