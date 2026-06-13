import { useState } from "react";
import { 
  LuSearch, 
  LuRotateCcw, 
  LuDownload,
  LuTrendingUp,
  LuDollarSign,
  LuLayers,
  LuChevronLeft,
  LuChevronRight,
  LuPrinter
} from "react-icons/lu";
import { FiPieChart } from "react-icons/fi";

export default function Report() {
  // 1. Data Master untuk Tabel
  const [items] = useState([
    { kode: "SP-001", nama: "Oli Mesin MPX 2 0.8L", merk: "AHM", hargaBeli: 42000, hargaJual: 52000, stok: 15 },
    { kode: "SP-002", nama: "Kampas Rem Depan", merk: "Nissin", hargaBeli: 35000, hargaJual: 45000, stok: 22 },
    { kode: "SP-003", nama: "V-Belt Kit", merk: "Honda Genuine", hargaBeli: 115000, hargaJual: 140000, stok: 8 },
    { kode: "SP-004", nama: "Aki Kering GTZ5S", merk: "GS Astra", hargaBeli: 185000, hargaJual: 220000, stok: 12 },
    { kode: "SP-005", nama: "Busi Standar CPR9EA-9", merk: "NGK", hargaBeli: 18000, hargaJual: 25000, stok: 40 },
  ]);

  // 2. Dummy Data untuk Diagram Batang (Statistik Keuntungan Per Bulan)
  const barChartData = [
    { bulan: "Jan", nilai: 40 },
    { bulan: "Feb", nilai: 65 },
    { bulan: "Mar", nilai: 45 },
    { bulan: "Apr", nilai: 80 },
    { bulan: "Mei", nilai: 55 },
    { bulan: "Jun", nilai: 90 },
    { bulan: "Jul", nilai: 70 },
  ];

  // Kalkulasi data statistik untuk kartu atas
  const totalSparepart = items.length;
  const totalModal = items.reduce((acc, item) => acc + (item.hargaBeli * item.stok), 0);
  const totalEstimasiJual = items.reduce((acc, item) => acc + (item.hargaJual * item.stok), 0);
  const estimasiProfit = totalEstimasiJual - totalModal;

  // Fungsi Export CSV
  const handleExportCSV = () => {
    const headers = ["Kode", "Nama Sparepart", "Merk", "Harga Beli", "Harga Jual", "Stok", "Margin"];
    const csvRows = items.map(item => [
      item.kode, item.nama, item.merk, item.hargaBeli, item.hargaJual, item.stok, item.hargaJual - item.hargaBeli
    ].map(field => `"${field}"`).join(","));

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Laporan_Harga_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      {/* HEADER DASHBOARD */}
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
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-300">
            <LuRotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* 1. STATS CARDS GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shrink-0">
              <LuLayers size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-zinc-400">Total Modal Stok</h2>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Rp. {totalModal.toLocaleString("id-ID")}
              </h1>
              <p className="mt-1 text-xs text-zinc-500">Dari total {totalSparepart} jenis sparepart</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#F24822] p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shrink-0">
              <LuTrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-orange-100">Estimasi Keuntungan</h2>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Rp. {estimasiProfit.toLocaleString("id-ID")}
              </h1>
              <p className="mt-1 text-xs text-orange-200">Jika seluruh stok terjual habis</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shrink-0">
              <LuDollarSign size={24} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-zinc-400">Total Nilai Jual</h2>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Rp. {totalEstimasiJual.toLocaleString("id-ID")}
              </h1>
              <p className="mt-1 text-xs text-zinc-500">Akumulasi harga jual eceran</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION GRAFIK (DIAGRAM BATANG & PIE CHART) */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        
        {/* WIDGET KIRI: Diagram Batang (Statistik Keuntungan) */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-white">Statistik Keuntungan</h2>
            <button className="h-10 rounded-xl bg-white/10 px-4 text-sm text-zinc-300">Tahun Ini</button>
          </div>

          {/* Area Render Diagram Batang */}
          <div className="flex h-[220px] items-end justify-between gap-4 mt-4">
            {barChartData.map((item, index) => (
              <div key={index} className="flex w-full flex-col items-center gap-3 group">
                {/* Tooltip Angka yang muncul saat dihover */}
                <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.nilai}%
                </span>
                {/* Bar (Batang) Grafik */}
                <div
                  style={{ height: `${item.nilai * 2}px` }}
                  className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-zinc-800 to-[#F24822] transition-all duration-300 group-hover:from-zinc-700 group-hover:to-[#ff613d]"
                />
                <span className="text-xs font-medium text-zinc-400">{item.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET KANAN: Pie Chart / Donut Chart (Ringkasan Brand) */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col">
          <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <FiPieChart className="text-[#F24822]" size={20} />
            <h2 className="text-xl font-semibold text-white">Ringkasan Brand</h2>
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            {/* Visualisasi Donut Chart dengan CSS Conic Gradient */}
            <div 
              className="relative h-40 w-40 rounded-full flex items-center justify-center shadow-xl shadow-black/50" 
              style={{ background: 'conic-gradient(#F24822 0% 45%, #52525b 45% 80%, #27272a 80% 100%)' }}
            >
              {/* Lubang di tengah agar berbentuk Donut */}
              <div className="h-28 w-28 rounded-full bg-[#18181b] flex items-center justify-center flex-col shadow-inner">
                <span className="text-2xl font-bold text-white">45%</span>
                <span className="text-[10px] text-zinc-400">AHM</span>
              </div>
            </div>
          </div>

          {/* Legend / Keterangan Chart */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F24822]"></div>
                <span className="text-sm text-zinc-300">Astra Honda Motor</span>
              </div>
              <span className="text-sm font-semibold text-white">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-500"></div>
                <span className="text-sm text-zinc-300">GS Astra</span>
              </div>
              <span className="text-sm font-semibold text-white">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/20"></div>
                <span className="text-sm text-zinc-300">Lainnya</span>
              </div>
              <span className="text-sm font-semibold text-white">20%</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SECTION TABEL: Rincian Pricing & Margin */}
      <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Rincian Pricing & Margin</h2>
          <div className="relative w-[280px]">
            <LuSearch className="absolute left-3 top-3 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Cari sparepart..." 
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-[#F24822]"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-zinc-400 border-b border-white/10">
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
              {items.map((item, index) => {
                const profit = item.hargaJual - item.hargaBeli;
                const percentage = ((profit / item.hargaBeli) * 100).toFixed(0);
                return (
                  <tr key={index} className="text-zinc-300 hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-medium text-white">{index + 1}</td>
                    <td className="py-4 pr-4 font-mono text-[#F24822] text-xs">{item.kode}</td>
                    <td className="py-4 pr-4 font-medium text-white">{item.nama}</td>
                    <td className="py-4 pr-4">Rp {item.hargaBeli.toLocaleString("id-ID")}</td>
                    <td className="py-4 pr-4 text-white font-medium">Rp {item.hargaJual.toLocaleString("id-ID")}</td>
                    <td className="py-4 pr-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${item.stok <= 10 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-zinc-800 text-zinc-300 border border-white/5'}`}>
                        {item.stok} Pcs
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right text-green-400 font-semibold">
                      Rp {profit.toLocaleString("id-ID")}{" "}
                      <span className="text-xs text-zinc-500 font-normal ml-1">(+{percentage}%)</span>
                    </td>
                    <td className="py-4 text-center">
                      <button title="Cetak Label Harga" className="text-zinc-400 transition-colors hover:text-[#F24822]">
                        <LuPrinter size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-zinc-400">
          <button className="flex items-center justify-center p-1 transition-colors hover:text-white">
            <LuChevronLeft size={20} />
          </button>
          <span className="font-medium">1/5 pages</span>
          <button className="flex items-center justify-center p-1 transition-colors hover:text-white">
            <LuChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}