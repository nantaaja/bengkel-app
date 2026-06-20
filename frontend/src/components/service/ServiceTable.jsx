import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

export default function ServiceTable({ services, onDetail, onEdit, onDelete }) {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatus = (status) => {
    switch (status) {
      case "Belum Dikerjakan":
        return {
          text: "Belum dikerjakan",
          color: "bg-red-500/20 text-red-300",
        };

      case "Sedang Dikerjakan":
        return {
          text: "Sedang dikerjakan",
          color: "bg-blue-500/20 text-blue-300",
        };

      case "Selesai":
        return {
          text: "Sudah selesai",
          color: "bg-green-500/20 text-green-300",
        };

      default:
        return {
          text: status,
          color: "bg-zinc-600/20 text-zinc-300",
        };
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr className="text-sm font-medium text-zinc-400">
              <th className="px-6 py-5 text-left">No</th>

              <th className="px-6 py-5 text-left">No. Transaksi</th>

              <th className="px-6 py-5 text-left">Tanggal</th>

              <th className="px-6 py-5 text-left">Pelanggan</th>

              <th className="px-6 py-5 text-left">Kendaraan</th>

              <th className="px-6 py-5 text-left">Jenis Servis</th>

              <th className="px-6 py-5 text-center">Status</th>

              <th className="px-6 py-5 text-right">Total Biaya</th>

              <th className="px-6 py-5 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center text-zinc-500">
                  Belum ada data pelayanan servis.
                </td>
              </tr>
            ) : (
              services.map((item, index) => {
                const status = getStatus(item.status);

                return (
                  <tr key={item.id} className="border-b border-white/10 transition-all duration-300 hover:bg-white/5">
                    <td className="px-6 py-5 text-white">{index + 1}</td>

                    <td className="px-6 py-5 font-medium text-orange-400">{item.kode_servis}</td>

                    <td className="px-6 py-5 text-zinc-300">{item.tanggal_servis}</td>

                    <td className="px-6 py-5 text-white">{item.nama_pelanggan}</td>

                    <td className="px-6 py-5 text-zinc-300">{item.nama_kendaraan}</td>

                    <td className="px-6 py-5 text-zinc-300">{item.service_type?.nama_servis}</td>

                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right font-medium text-green-400">
                      {formatRupiah(item.total_biaya)}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onDetail(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10"
                        >
                          <LuEye size={18} />
                        </button>

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
