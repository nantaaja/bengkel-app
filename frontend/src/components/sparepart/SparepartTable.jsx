import { LuPencil, LuTrash2 } from "react-icons/lu";

export default function SparepartTable({ spareparts, onEdit, onDelete }) {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatus = (stok) => {
    if (stok <= 0) {
      return {
        text: "Habis",
        color: "bg-red-500/20 text-red-400",
      };
    }

    if (stok <= 10) {
      return {
        text: "Menipis",
        color: "bg-yellow-500/20 text-yellow-400",
      };
    }

    return {
      text: "Aman",
      color: "bg-green-500/20 text-green-400",
    };
  };

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr className="text-sm text-zinc-400">
              <th className="px-6 py-5 text-left">No</th>
              <th className="px-6 py-5 text-left">Kode Barang</th>
              <th className="px-6 py-5 text-left">Nama Barang</th>
              <th className="px-6 py-5 text-left">Supplier</th>
              <th className="px-6 py-5 text-center">Stok</th>
              <th className="px-6 py-5 text-left">Harga Modal</th>
              <th className="px-6 py-5 text-center">%</th>
              <th className="px-6 py-5 text-left">Harga Jual</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {spareparts.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-12 text-center text-zinc-500">
                  Belum ada data sparepart.
                </td>
              </tr>
            ) : (
              spareparts.map((item, index) => {
                const status = getStatus(item.stok);

                return (
                  <tr key={item.id} className="border-b border-white/10 transition hover:bg-white/5">
                    <td className="px-6 py-5 text-white">{index + 1}</td>

                    <td className="px-6 py-5">
                      <span className="font-medium text-orange-400">{item.kode_barang}</span>
                    </td>

                    <td className="px-6 py-5 text-white">{item.nama_barang}</td>

                    <td className="px-6 py-5 text-zinc-300">{item.supplier}</td>

                    <td className="px-6 py-5 text-center text-white">{item.stok}</td>

                    <td className="px-6 py-5 text-white">{formatRupiah(item.harga_modal)}</td>

                    <td className="px-6 py-5 text-center text-white">{item.persentase_jual}%</td>

                    <td className="px-6 py-5 font-medium text-green-400">{formatRupiah(item.harga_jual)}</td>

                    <td className="px-6 py-5 text-center">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                        >
                          <LuPencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          <LuTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
