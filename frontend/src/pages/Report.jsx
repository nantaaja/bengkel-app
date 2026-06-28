import { useState, useEffect } from "react";
import {
  LuSearch,
  LuRotateCcw,
  LuDownload,
  LuTrendingUp,
  LuDollarSign,
  LuLayers,
  LuChevronLeft,
  LuChevronRight,
  LuPrinter,
} from "react-icons/lu";
import { FiPieChart } from "react-icons/fi";
import api from "../api/axios";

const ITEMS_PER_PAGE = 10;
const PIE_COLORS = ["#F24822", "#52525b", "#27272a", "#a1a1aa", "#3f3f46"];

export default function Report() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const [stats, setStats]             = useState({ total_modal: 0, total_nilai_jual: 0, estimasi_profit: 0, total_jenis_sparepart: 0 });
  const [barChart, setBarChart]       = useState([]);
  const [supplierGroup, setSupplierGroup] = useState([]);
  const [spareparts, setSpareparts]   = useState([]);

  const [search, setSearch]           = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        setLoading(true);
        const res = await api.get("/laporan");
        const d   = res.data.data;
        setStats(d.stats);
        setBarChart(d.bar_chart);
        setSupplierGroup(d.supplier_group);
        setSpareparts(d.spareparts);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat laporan. Pastikan server backend berjalan.");
      } finally {
        setLoading(false);
      }
    };
    fetchLaporan();
  }, []);

  // Filter & pagination tabel
  const filtered = spareparts.filter((item) => {
    const kw = search.trim().toLowerCase();
    return (
      item.kode?.toLowerCase().includes(kw) ||
      item.nama?.toLowerCase().includes(kw) ||
      item.supplier?.toLowerCase().includes(kw)
    );
  });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Nilai max bar chart untuk skala
  const maxBar = Math.max(...barChart.map((i) => i.nilai), 1);

  // Export CSV dari data real
  const handleExportCSV = () => {
    const headers = ["Kode", "Nama Sparepart", "Supplier", "Harga Modal", "Harga Jual", "Stok", "Margin", "Persentase"];
    const rows = spareparts.map((item) => [
      item.kode, item.nama, item.supplier,
      item.harga_modal, item.harga_jual,
      item.stok, item.profit, `${item.percentage}%`,
    ].map((f) => `"${f}"`).join(","));
    const csv  = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `Laporan_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center p-6">
      <p className="text-zinc-400">Memuat data laporan...</p>
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
          <h1 className="text-4xl font-semibold text-white">Laporan Harga Jual</h1>
          <p className="mt-1 text-zinc-400">Analisis margin keuntungan, valuasi stok, dan ringkasan harga.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportCSV}
            className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            <LuDownload size={16} /> Export CSV
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300"
          >
            <LuRotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-black">
              <LuLayers size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-zinc-400">Total Modal Stok</h2>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Rp {stats.total_modal.toLocaleString("id-ID")}
              </h1>
              <p className="mt-1 text-xs text-zinc-500">Dari {stats.total_jenis_sparepart} jenis sparepart</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#F24822] p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-black">
              <LuTrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-orange-100">Estimasi Keuntungan</h2>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Rp {stats.estimasi_profit.toLocaleString("id-ID")}
              </h1>
              <p className="mt-1 text-xs text-orange-200">Jika seluruh stok terjual habis</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-black">
              <LuDollarSign size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-zinc-400">Total Nilai Jual</h2>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Rp {stats.total_nilai_jual.toLocaleString("id-ID")}
              </h1>
              <p className="mt-1 text-xs text-zinc-500">Akumulasi harga jual eceran</p>
            </div>
          </div>
        </div>
      </div>

      {/* GRAFIK */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Bar Chart – Pendapatan Servis Per Bulan */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Pendapatan Servis Per Bulan</h2>
            <span className="text-sm text-zinc-400">{new Date().getFullYear()}</span>
          </div>
          <div className="flex h-[220px] items-end justify-between gap-2 mt-4">
            {barChart.map((item, index) => (
              <div key={index} className="group flex w-full flex-col items-center gap-2">
                <span className="text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.nilai > 0 ? `Rp ${(item.nilai / 1000).toFixed(0)}K` : "0"}
                </span>
                <div
                  style={{ height: `${Math.round((item.nilai / maxBar) * 180)}px`, minHeight: item.nilai > 0 ? "4px" : "0px" }}
                  className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-zinc-800 to-[#F24822] transition-all duration-300 group-hover:to-[#ff613d]"
                />
                <span className="text-xs font-medium text-zinc-400">{item.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart – Ringkasan Supplier */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <FiPieChart className="text-[#F24822]" size={20} />
            <h2 className="text-xl font-semibold text-white">Ringkasan Supplier</h2>
          </div>

          {supplierGroup.length > 0 ? (
            <>
              <div className="flex flex-1 items-center justify-center py-4">
                <div
                  className="relative flex h-40 w-40 items-center justify-center rounded-full shadow-xl shadow-black/50"
                  style={{
                    background: `conic-gradient(${supplierGroup.reduce((acc, s, i) => {
                      const prev = supplierGroup.slice(0, i).reduce((a, x) => a + x.persentase, 0);
                      return acc + `${PIE_COLORS[i % PIE_COLORS.length]} ${prev}% ${prev + s.persentase}%, `;
                    }, "").slice(0, -2)})`,
                  }}
                >
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#18181b] shadow-inner">
                    <span className="text-2xl font-bold text-white">{supplierGroup[0]?.persentase ?? 0}%</span>
                    <span className="text-[10px] text-zinc-400 text-center px-1">{supplierGroup[0]?.supplier ?? ""}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {supplierGroup.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-sm text-zinc-300 truncate max-w-[130px]">{s.supplier}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{s.persentase}%</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-zinc-500 mt-8">Belum ada data supplier.</p>
          )}
        </div>
      </div>

      {/* TABEL RINCIAN */}
      <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Rincian Pricing & Margin</h2>
          <div className="relative w-[280px]">
            <LuSearch className="absolute left-3 top-3 text-zinc-500" size={16} />
            <input
              type="text"
              placeholder="Cari sparepart..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-[#F24822]"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="pb-4 pr-4 font-medium">No</th>
                <th className="pb-4 pr-4 font-medium">Kode</th>
                <th className="pb-4 pr-4 font-medium">Nama Produk</th>
                <th className="pb-4 pr-4 font-medium">Harga Modal</th>
                <th className="pb-4 pr-4 font-medium">Harga Jual</th>
                <th className="pb-4 pr-4 text-center font-medium">Stok</th>
                <th className="pb-4 pr-4 text-right font-medium">Margin Keuntungan</th>
                <th className="pb-4 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-zinc-500">
                    {search ? "Sparepart tidak ditemukan." : "Belum ada data sparepart."}
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => (
                  <tr key={item.id} className="text-zinc-300 hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-medium text-white">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="py-4 pr-4 font-mono text-xs text-[#F24822]">{item.kode}</td>
                    <td className="py-4 pr-4 font-medium text-white">{item.nama}</td>
                    <td className="py-4 pr-4">Rp {item.harga_modal.toLocaleString("id-ID")}</td>
                    <td className="py-4 pr-4 font-medium text-white">Rp {item.harga_jual.toLocaleString("id-ID")}</td>
                    <td className="py-4 pr-4 text-center">
                      <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${item.stok <= 10 ? "border border-red-500/20 bg-red-500/10 text-red-400" : "border border-white/5 bg-zinc-800 text-zinc-300"}`}>
                        {item.stok} Pcs
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right font-semibold text-green-400">
                      Rp {item.profit.toLocaleString("id-ID")}{" "}
                      <span className="ml-1 text-xs font-normal text-zinc-500">(+{item.percentage}%)</span>
                    </td>
                    <td className="py-4 text-center">
                      <button title="Cetak Label Harga" className="text-zinc-400 transition-colors hover:text-[#F24822]">
                        <LuPrinter size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-zinc-400">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="flex items-center justify-center p-1 transition-colors hover:text-white disabled:opacity-40"
          >
            <LuChevronLeft size={20} />
          </button>
          <span className="font-medium">{currentPage} / {totalPages} pages</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex items-center justify-center p-1 transition-colors hover:text-white disabled:opacity-40"
          >
            <LuChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}