import { useState, useEffect } from "react";
import { LuPackage, LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import dashboardService from "../services/dashboardService";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk setiap bagian dashboard
  const [stats, setStats] = useState({
    total_sparepart: 0,
    barang_masuk: 0,
    barang_keluar: 0,
  });
  const [stockChart, setStockChart] = useState([]);
  const [priorityStock, setPriorityStock] = useState([]);
  const [barangMasukTerbaru, setBarangMasukTerbaru] = useState([]);
  const [barangKeluarTerbaru, setBarangKeluarTerbaru] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getDashboard();
        const data = response.data.data;

        setStats(data.stats);
        setStockChart(data.stock_chart);
        setPriorityStock(data.priority_stock);
        setBarangMasukTerbaru(data.barang_masuk_terbaru);
        setBarangKeluarTerbaru(data.barang_keluar_terbaru);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
        setError("Gagal memuat data. Pastikan server backend berjalan.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    {
      title: "Total Sparepart",
      total: stats.total_sparepart,
      subtitle: "Semua Sparepart Terdaftar",
      icon: <LuPackage size={28} />,
      active: true,
    },
    {
      title: "Barang Masuk",
      total: stats.barang_masuk,
      subtitle: "Bulan ini",
      icon: <LuArrowDownToLine size={28} />,
    },
    {
      title: "Barang Keluar",
      total: stats.barang_keluar,
      subtitle: "Bulan ini",
      icon: <LuArrowUpFromLine size={28} />,
    },
  ];

  // Tinggi maksimum bar chart (px) — disesuaikan dari nilai tertinggi
  const maxStock = Math.max(...stockChart.map((i) => i.total), 1);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-zinc-400">Memuat data dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* TITLE */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-zinc-400">Berikut ringkasan data secara keseluruhan</p>
        </div>
        <button className="h-11 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-zinc-300">
          Month
        </button>
      </div>

      {/* CARD STATISTIK */}
      <div className="mt-8 grid grid-cols-3 gap-5">
        {statCards.map((item, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-3xl border border-white/10 ${
              item.active ? "bg-orange-600" : "bg-white/10"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-5">
                {/* ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                  {item.icon}
                </div>

                {/* TEXT */}
                <div>
                  <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                  <h1 className="mt-2 text-6xl font-bold text-white">{item.total}</h1>
                  <p className="mt-2 text-sm text-zinc-200">{item.subtitle}</p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="bg-white/10 px-6 py-4 text-sm text-zinc-200">Lihat Semua</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {/* CHART RINGKASAN STOK */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Ringkasan Stok</h2>
            <button className="h-10 rounded-xl bg-white/10 px-4 text-sm text-zinc-300">
              Month
            </button>
          </div>

          <div className="mt-10 flex h-[250px] items-end justify-between gap-3">
            {stockChart.map((item, index) => (
              <div key={index} className="flex w-full flex-col items-center gap-2">
                <div
                  style={{
                    height: `${Math.round((item.total / maxStock) * 220)}px`,
                    minHeight: item.total > 0 ? "4px" : "0px",
                  }}
                  className="w-full bg-gradient-to-t from-zinc-800 to-white"
                />
                <span className="text-xs text-zinc-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRIORITAS STOK */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Prioritas Stok</h2>
            <button className="text-sm text-zinc-400">Lihat Semua</button>
          </div>

          <table className="mt-6 w-full">
            <thead className="text-sm text-zinc-400">
              <tr>
                <th className="pb-4 text-left">Sparepart</th>
                <th className="pb-4 text-left">Stok</th>
                <th className="pb-4 text-left">Minimum</th>
                <th className="pb-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {priorityStock.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-zinc-500">
                    Tidak ada data sparepart.
                  </td>
                </tr>
              ) : (
                priorityStock.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-zinc-400">
                          <LuPackage size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">{item.name}</h3>
                          <p className="text-xs text-zinc-500">{item.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-white">{item.stock}</td>
                    <td className="text-white">{item.minimum}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          item.status === "Kritis"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {/* BARANG MASUK TERBARU */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Barang Masuk Terbaru</h2>
            <button className="text-sm text-zinc-400">Lihat Semua</button>
          </div>

          <table className="mt-6 w-full">
            <thead className="text-sm text-zinc-400">
              <tr>
                <th className="pb-4 text-left">Tanggal</th>
                <th className="pb-4 text-left">No. Transaksi</th>
                <th className="pb-4 text-left">Supplier</th>
                <th className="pb-4 text-left">Total Item</th>
              </tr>
            </thead>

            <tbody>
              {barangMasukTerbaru.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-zinc-500">
                    Belum ada data barang masuk.
                  </td>
                </tr>
              ) : (
                barangMasukTerbaru.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="py-4 text-sm text-white">{item.tanggal}</td>
                    <td className="text-sm text-zinc-300">{item.transaksi}</td>
                    <td className="text-sm text-zinc-300">{item.supplier}</td>
                    <td className="text-sm text-white">{item.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* BARANG KELUAR TERBARU */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Barang Keluar Terbaru</h2>
            <button className="text-sm text-zinc-400">Lihat Semua</button>
          </div>

          <table className="mt-6 w-full">
            <thead className="text-sm text-zinc-400">
              <tr>
                <th className="pb-4 text-left">Tanggal</th>
                <th className="pb-4 text-left">No. Transaksi</th>
                <th className="pb-4 text-left">Tujuan</th>
                <th className="pb-4 text-left">Total Item</th>
              </tr>
            </thead>

            <tbody>
              {barangKeluarTerbaru.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-zinc-500">
                    Belum ada data barang keluar.
                  </td>
                </tr>
              ) : (
                barangKeluarTerbaru.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="py-4 text-sm text-white">{item.tanggal}</td>
                    <td className="text-sm text-zinc-300">{item.transaksi}</td>
                    <td className="text-sm text-zinc-300">{item.tujuan}</td>
                    <td className="text-sm text-white">{item.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
