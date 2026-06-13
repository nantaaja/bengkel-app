import { useState } from "react";
import { 
  LuSearch, 
  LuRotateCcw, 
  LuEye, 
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuX
} from "react-icons/lu";

export default function TransactionHistory() {
  // Dummy data untuk Riwayat Transaksi
  const [transactions] = useState([
    { id: "TRX-250526-001", noInvoice: "INV-20260525-01", tanggal: "2026-05-25", pelanggan: "Lindi", tipe: "Servis Berkala", metode: "Cash", total: "125000", status: "Selesai" },
    { id: "TRX-250526-002", noInvoice: "INV-20260525-02", tanggal: "2026-05-25", pelanggan: "Yusuf", tipe: "Pembelian Sparepart", metode: "Transfer QRIS", total: "450000", status: "Selesai" },
    { id: "TRX-250526-003", noInvoice: "INV-20260525-03", tanggal: "2026-05-24", pelanggan: "Nanta", tipe: "Servis Berkala", metode: "Cash", total: "75000", status: "Selesai" },
    { id: "TRX-250526-004", noInvoice: "INV-20260524-01", tanggal: "2026-05-24", pelanggan: "Lindi", tipe: "Servis + Sparepart", metode: "Transfer QRIS", total: "320000", status: "Selesai" },
    { id: "TRX-250526-005", noInvoice: "INV-20260524-02", tanggal: "2026-05-24", pelanggan: "Andi", tipe: "Pembelian Sparepart", metode: "Cash", total: "85000", status: "Selesai" },
  ]);

  // State untuk mengontrol Modal Detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Helper format tanggal tampilan
  const formatTanggalTampilan = (dateStr) => {
    if (!dateStr) return "";
    const p = dateStr.split("-");
    if (p.length !== 3) return dateStr;
    const bulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${p[2]} ${bulanIndo[parseInt(p[1]) - 1]} ${p[0]}`;
  };

  // 1. Fungsi Export CSV
  const handleExportCSV = () => {
    // Membuat Header CSV
    const headers = ["ID Transaksi", "No. Invoice", "Tanggal", "Nama Pelanggan", "Tipe Transaksi", "Metode", "Status", "Total Bayar"];
    
    // Map data menjadi format row CSV
    const csvRows = transactions.map(trx => [
      trx.id,
      trx.noInvoice,
      trx.tanggal,
      trx.pelanggan,
      trx.tipe,
      trx.metode,
      trx.status,
      trx.total
    ].map(item => `"${item}"`).join(",")); // Menambahkan quotes untuk menghindari masalah dengan koma di dalam string

    // Gabungkan header dan baris data
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    
    // Buat objek Blob dan trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Riwayat_Transaksi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Fungsi Buka Modal Detail
  const handleOpenDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  // Fungsi Tutup Modal Detail
  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="p-6 relative">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Riwayat Transaksi</h1>
          <p className="mt-1 text-sm text-zinc-400">Daftar rekaman seluruh transaksi masuk yang telah selesai.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExportCSV} // <-- Menambahkan trigger klik untuk export
            className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white border border-white/10 transition-colors hover:bg-zinc-700"
          >
            <LuDownload size={16} /> Export CSV
          </button>
          
          <button className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white">
            <LuRotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        
        {/* ... SEARCH BAR SAMA SEPERTI SEBELUMNYA ... */}
        <div className="mb-6">
          <div className="relative w-[300px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LuSearch className="text-zinc-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Cari No. Invoice / Pelanggan"
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-2.5 pl-10 text-sm text-white placeholder-zinc-500 focus:border-[#F24822] focus:outline-none focus:ring-1 focus:ring-[#F24822]"
            />
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="pb-4 pr-4 font-medium">No</th>
                <th className="pb-4 pr-4 font-medium">ID Transaksi</th>
                <th className="pb-4 pr-4 font-medium">No. Invoice</th>
                <th className="pb-4 pr-4 font-medium">Tanggal</th>
                <th className="pb-4 pr-4 font-medium">Nama Pelanggan</th>
                <th className="pb-4 pr-4 font-medium">Tipe Transaksi</th>
                <th className="pb-4 pr-4 font-medium">Metode</th>
                <th className="pb-4 pr-4 text-center font-medium">Status</th>
                <th className="pb-4 pr-4 font-medium">Total Bayar</th>
                <th className="pb-4 text-center font-medium">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {transactions.map((item, index) => (
                <tr key={index} className="text-zinc-300 transition-colors hover:bg-white/[0.02]">
                  <td className="py-4 pr-4 font-medium text-white">{index + 1}</td>
                  <td className="py-4 pr-4 text-zinc-400">{item.id}</td>
                  <td className="py-4 pr-4 font-mono text-[#F24822]">{item.noInvoice}</td>
                  <td className="py-4 pr-4">{formatTanggalTampilan(item.tanggal)}</td>
                  <td className="py-4 pr-4">{item.pelanggan}</td>
                  <td className="py-4 pr-4">{item.tipe}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-lg bg-zinc-800 px-2 py-1 text-xs text-zinc-300 border border-white/5">
                      {item.metode}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-center">
                    <span className="inline-block rounded-full bg-[#d4edda] px-3 py-1 text-xs font-semibold text-[#155724]">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 font-semibold text-white">
                    Rp. {parseInt(item.total).toLocaleString("id-ID")}.-
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleOpenDetail(item)} // <-- Menambahkan trigger buka modal detail
                        title="Lihat Detail" 
                        className="text-zinc-400 transition-colors hover:text-white"
                      >
                        <LuEye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ... PAGINATION SAMA SEPERTI SEBELUMNYA ... */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-zinc-400">
          <button className="flex items-center justify-center p-1 transition-colors hover:text-white">
            <LuChevronLeft size={20} />
          </button>
          <span className="font-medium">1/10 pages</span>
          <button className="flex items-center justify-center p-1 transition-colors hover:text-white">
            <LuChevronRight size={20} />
          </button>
        </div>

      </div>

      {/* MODAL DETAIL TRANSAKSI */}
      {isDetailModalOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#1e1e1e] p-8 shadow-2xl relative">
            
            {/* Tombol Close (X) di pojok kanan atas */}
            <button 
              onClick={handleCloseDetail}
              className="absolute right-6 top-6 text-zinc-400 hover:text-white transition-colors"
            >
              <LuX size={24} />
            </button>

            <h2 className="mb-2 text-2xl font-bold text-white">Detail Transaksi</h2>
            <p className="mb-6 font-mono text-sm text-[#F24822]">{selectedTransaction.noInvoice}</p>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-zinc-400">Tanggal</span>
                <span className="text-sm font-medium text-white">{formatTanggalTampilan(selectedTransaction.tanggal)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-zinc-400">Nama Pelanggan</span>
                <span className="text-sm font-medium text-white">{selectedTransaction.pelanggan}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-zinc-400">Tipe Transaksi</span>
                <span className="text-sm font-medium text-white">{selectedTransaction.tipe}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-zinc-400">Metode Pembayaran</span>
                <span className="text-sm font-medium text-white">{selectedTransaction.metode}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-zinc-400">Status</span>
                <span className="text-sm font-medium text-[#155724] bg-[#d4edda] px-2 py-0.5 rounded-md">{selectedTransaction.status}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-base font-medium text-zinc-300">Total Bayar</span>
                <span className="text-lg font-bold text-white">Rp. {parseInt(selectedTransaction.total).toLocaleString("id-ID")}.-</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleCloseDetail}
                className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}