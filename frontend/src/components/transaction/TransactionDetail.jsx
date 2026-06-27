export default function TransactionDetail({ open, onClose, transaction }) {
  if (!open || !transaction) return null;

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const totalSparepart = transaction.service_spareparts?.reduce((total, item) => total + Number(item.subtotal), 0) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#181818] p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-white">Detail Transaksi</h2>

          <button onClick={onClose} className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Tutup
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-zinc-400">Kode Servis</p>
            <p className="font-medium text-white">{transaction.kode_servis}</p>
          </div>

          <div>
            <p className="text-zinc-400">Tanggal</p>
            <p className="font-medium text-white">{transaction.tanggal_servis}</p>
          </div>

          <div>
            <p className="text-zinc-400">Nama Pelanggan</p>
            <p className="font-medium text-white">{transaction.nama_pelanggan}</p>
          </div>

          <div>
            <p className="text-zinc-400">No HP</p>
            <p className="font-medium text-white">{transaction.no_hp}</p>
          </div>

          <div>
            <p className="text-zinc-400">Kendaraan</p>
            <p className="font-medium text-white">{transaction.nama_kendaraan}</p>
          </div>

          <div>
            <p className="text-zinc-400">Plat</p>
            <p className="font-medium text-white">{transaction.plat_kendaraan}</p>
          </div>

          <div>
            <p className="text-zinc-400">Jenis Servis</p>
            <p className="font-medium text-white">{transaction.service_type?.nama_servis}</p>
          </div>

          <div>
            <p className="text-zinc-400">Status</p>
            <p className="font-medium text-green-400">{transaction.status}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold text-white">Sparepart Digunakan</h3>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-zinc-300">Sparepart</th>
                  <th className="px-4 py-3 text-center text-zinc-300">Qty</th>
                  <th className="px-4 py-3 text-right text-zinc-300">Harga</th>
                  <th className="px-4 py-3 text-right text-zinc-300">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {transaction.service_spareparts?.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="px-4 py-3 text-white">{item.sparepart?.nama_barang}</td>

                    <td className="px-4 py-3 text-center text-white">{item.jumlah}</td>

                    <td className="px-4 py-3 text-right text-white">{formatRupiah(item.harga)}</td>

                    <td className="px-4 py-3 text-right text-green-400">{formatRupiah(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white/5 p-5">
          <div className="mb-2 flex justify-between">
            <span className="text-zinc-400">Biaya Servis</span>
            <span className="text-white">{formatRupiah(transaction.service_type?.harga_servis)}</span>
          </div>

          <div className="mb-2 flex justify-between">
            <span className="text-zinc-400">Total Sparepart</span>
            <span className="text-white">{formatRupiah(totalSparepart)}</span>
          </div>

          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-xl font-semibold">
            <span className="text-white">TOTAL</span>

            <span className="text-orange-400">{formatRupiah(transaction.total_biaya)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
