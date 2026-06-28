import { useState, useEffect } from "react";
import {
  LuTrendingUp, LuDollarSign, LuReceiptText,
  LuChevronLeft, LuChevronRight,
} from "react-icons/lu";
import api from "../../api/axios";

const PIE_COLORS = ["#F24822", "#52525b"];

export default function OwnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [stats, setStats]     = useState({ total_pendapatan_bulan_ini: 0, keuntungan_bersih: 0, total_transaksi_bulan_ini: 0 });
  const [barChart, setBarChart]         = useState([]);
  const [pieChart, setPieChart]         = useState([]);
  const [topSpareparts, setTopSpareparts] = useState([]);
  const [topServices, setTopServices]   = useState([]);

  useEffect(() => {
    api.get("/owner/laporan")
      .then((res) => {
        const d = res.data.data;
        setStats(d.stats);
        setBarChart(d.bar_chart);
        setPieChart(d.pie_chart);
        setTopSpareparts(d.top_spareparts);
        setTopServices(d.top_services);
      })
      .catch(() => setError("Gagal memuat data. Pastikan server backend berjalan."))
      .finally(() => setLoading(false));
  }, []);

  const maxBar   = Math.max(...barChart.map((i) => i.nilai), 1);
  const totalPie = pieChart.reduce((a, i) => a + i.nilai, 0);

  // Conic gradient untuk pie chart
  const conicGradient = pieChart.reduce((acc, item, i) => {
    const prev = pieChart.slice(0, i).reduce((a, x) => a + x.persentase, 0);
    return acc + `${PIE_COLORS[i % PIE_COLORS.length]} ${prev}% ${prev + item.persentase}%, `;
  }, "").slice(0, -2);

  const statCards = [
    {
      title:    "Total Pendapatan Bulan Ini",
      value:    `Rp ${stats.total_pendapatan_bulan_ini.toLocaleString("id-ID")}`,
      subtitle: "Dari semua servis selesai bulan ini",
      icon:     <LuTrendingUp size={24} />,
      bg:       "bg-orange-600",
      textSub:  "text-orange-100",
    },
    {
      title:    "Keuntungan Bersih",
      value:    `Rp ${stats.keuntungan_bersih.toLocaleString("id-ID")}`,
      subtitle: "Setelah dikurangi modal sparepart",
      icon:     <LuDollarSign size={24} />,
      bg:       "bg-zinc-700",
      textSub:  "text-zinc-300",
    },
    {
      title:    "Total Transaksi Bulan Ini",
      value:    stats.total_transaksi_bulan_ini,
      subtitle: "Jumlah servis yang selesai",
      icon:     <LuReceiptText size={24} />,
      bg:       "bg-white/5",
      textSub:  "text-zinc-400",
    },
  ];

  if (loading) return (
    <div className="flex h-full items-center justify-center p-6">
      <p className="text-zinc-400">Memuat data...</p>
    </div>
  );
  if (error) return (
    <div className="flex h-full items-center justify-center p-6">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-white">Dashboard Pemilik</h1>
          <p className="mt-1 text-zinc-400">Ringkasan keuangan dan performa bengkel bulan ini.</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="h-11 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-zinc-300"
        >
          Refresh
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {statCards.map((card, i) => (
          <div key={i} className={`overflow-hidden rounded-3xl border border-white/10 ${card.bg}`}>
            <div className="p-6">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-black">
                  {card.icon}
                </div>
                <div>
                  <h2 className="text-base font-medium text-zinc-200">{card.title}</h2>
                  <h1 className="mt-2 text-3xl font-bold text-white">{card.value}</h1>
                  <p className={`mt-1 text-xs ${card.textSub}`}>{card.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/10 px-6 py-3 text-sm text-zinc-300">Bulan ini</div>
          </div>
        ))}
      </div>

      {/* GRAFIK */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Pendapatan Per Bulan</h2>
            <span className="text-sm text-zinc-400">{new Date().getFullYear()}</span>
          </div>
          <div className="flex h-[220px] items-end justify-between gap-2">
            {barChart.map((item, i) => (
              <div key={i} className="group flex w-full flex-col items-center gap-2">
                <span className="text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.nilai > 0 ? `Rp ${(item.nilai / 1000).toFixed(0)}K` : "0"}
                </span>
                <div
                  style={{ height: `${Math.round((item.nilai / maxBar) * 180)}px`, minHeight: item.nilai > 0 ? "4px" : "0px" }}
                  className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-zinc-800 to-orange-500 transition-all group-hover:to-orange-400"
                />
                <span className="text-xs font-medium text-zinc-400">{item.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart — Perbandingan Kategori */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-xl font-semibold text-white">
            Keuntungan per Kategori
          </h2>

          {totalPie > 0 ? (
            <>
              <div className="flex flex-1 items-center justify-center py-4">
                <div
                  className="relative flex h-40 w-40 items-center justify-center rounded-full shadow-xl shadow-black/50"
                  style={{ background: `conic-gradient(${conicGradient})` }}
                >
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#18181b] shadow-inner">
                    <span className="text-2xl font-bold text-white">{pieChart[0]?.persentase ?? 0}%</span>
                    <span className="text-[10px] text-zinc-400 text-center px-1">{pieChart[0]?.kategori}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {pieChart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-sm text-zinc-300">{item.kategori}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">{item.persentase}%</span>
                      <p className="text-[10px] text-zinc-500">Rp {item.nilai.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-8 text-center text-sm text-zinc-500">Belum ada data transaksi bulan ini.</p>
          )}
        </div>
      </div>

      {/* DUA TABEL BERDAMPINGAN */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Tabel Top 5 Sparepart */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-lg font-semibold text-white">
            Top 5 Sparepart — Margin Tertinggi Bulan Ini
          </h2>
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="pb-3 pr-3 font-medium">No</th>
                <th className="pb-3 pr-3 font-medium">Nama Sparepart</th>
                <th className="pb-3 pr-3 font-medium">Harga Jual</th>
                <th className="pb-3 font-medium text-right">% Keuntungan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {topSpareparts.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-zinc-500">Belum ada data bulan ini.</td></tr>
              ) : (
                topSpareparts.map((item, i) => (
                  <tr key={i} className="text-zinc-300 hover:bg-white/[0.02]">
                    <td className="py-3 pr-3 font-medium text-white">{i + 1}</td>
                    <td className="py-3 pr-3 font-medium text-white">{item.nama}</td>
                    <td className="py-3 pr-3">Rp {item.harga_jual.toLocaleString("id-ID")}</td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                        +{item.persentase}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tabel Top 5 Servis */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-lg font-semibold text-white">
            Top 5 Servis — Keuntungan Tertinggi Bulan Ini
          </h2>
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="pb-3 pr-3 font-medium">No</th>
                <th className="pb-3 pr-3 font-medium">Nama Servis</th>
                <th className="pb-3 pr-3 font-medium">Total Bayar</th>
                <th className="pb-3 font-medium text-right">% Keuntungan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {topServices.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-zinc-500">Belum ada data bulan ini.</td></tr>
              ) : (
                topServices.map((item, i) => (
                  <tr key={i} className="text-zinc-300 hover:bg-white/[0.02]">
                    <td className="py-3 pr-3 font-medium text-white">{i + 1}</td>
                    <td className="py-3 pr-3 font-medium text-white">{item.nama}</td>
                    <td className="py-3 pr-3">Rp {item.harga_jual.toLocaleString("id-ID")}</td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-400">
                        +{item.persentase}%
                      </span>
                    </td>
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