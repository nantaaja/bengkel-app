import { useState } from "react";
import { 
  LuSearch, 
  LuRotateCcw, 
  LuEye, 
  LuPen, 
  LuTrash2,
  LuChevronLeft,
  LuChevronRight
} from "react-icons/lu";

export default function Service() {
  // State untuk mengontrol buka/tutup Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State utama untuk menampung list data pelayanan servis
  const [services, setServices] = useState([
    { id: "PS-250526-001", noTransaksi: "NT-250526-001", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Scoopy", layanan: "Servis Berkala", status: "Belum dikerjakan", biaya: "25000" },
    { id: "PS-250526-002", noTransaksi: "NT-250526-002", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Scoopy", layanan: "Servis Berkala", status: "Sedang dikerjakan", biaya: "25000" },
    { id: "PS-250526-003", noTransaksi: "NT-250526-003", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Nmax", layanan: "Servis Berkala", status: "Belum dikerjakan", biaya: "25000" },
    { id: "PS-250526-004", noTransaksi: "NT-250526-004", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "ADV", layanan: "Servis Berkala", status: "Sudah Selesai", biaya: "25000" },
    { id: "PS-250526-005", noTransaksi: "NT-250526-005", tanggal: "2026-05-25", pelanggan: "Yusuf", mekanik: "Bima", kendaraan: "PCX", layanan: "Servis Berkala", status: "Sudah Selesai", biaya: "25000" },
    { id: "PS-250526-006", noTransaksi: "NT-250526-006", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Beat", layanan: "Servis Berkala", status: "Belum dikerjakan", biaya: "25000" },
    { id: "PS-250526-007", noTransaksi: "NT-250526-007", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Scoopy", layanan: "Servis Berkala", status: "Belum dikerjakan", biaya: "25000" },
    { id: "PS-250526-008", noTransaksi: "NT-250526-008", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Scoopy", layanan: "Servis Berkala", status: "Sedang dikerjakan", biaya: "25000" },
    { id: "PS-250526-009", noTransaksi: "NT-250526-009", tanggal: "2026-05-25", pelanggan: "Nanta", mekanik: "Bima", kendaraan: "Nmax", layanan: "Servis Berkala", status: "Belum dikerjakan", biaya: "25000" },
    { id: "PS-250526-010", noTransaksi: "NT-250526-010", tanggal: "2026-05-25", pelanggan: "Lindi", mekanik: "Bima", kendaraan: "Scoopy", layanan: "Servis Berkala", status: "Belum dikerjakan", biaya: "25000" },
  ]);

  // State untuk menangkap data form Tambah Baru
  const [formTambah, setFormTambah] = useState({
    pelanggan: "", tanggal: "", mekanik: "", biaya: "", layanan: "", kendaraan: ""
  });

  // State untuk menangkap data form Edit Pelayanan beserta index array-nya
  const [formEdit, setFormEdit] = useState({
    index: null, id: "", noTransaksi: "", pelanggan: "", tanggal: "", mekanik: "", biaya: "", layanan: "", kendaraan: "", status: ""
  });

  // Helper untuk mengubah string format tanggal input (YYYY-MM-DD) menjadi teks tampilan (DD Mei YYYY)
  const formatTanggalTampilan = (dateStr) => {
    if (!dateStr) return "";
    const p = dateStr.split("-");
    if (p.length !== 3) return dateStr;
    const bulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${p[2]} ${bulanIndo[parseInt(p[1]) - 1]} ${p[0]}`;
  };

  // Helper pewarnaan status badge di tabel data
  const getStatusStyle = (status) => {
    switch (status) {
      case "Belum dikerjakan":
        return "bg-[#ffb3b3] text-[#cc0000]"; 
      case "Sedang dikerjakan":
        return "bg-[#cce5ff] text-[#0055cc]"; 
      case "Sudah Selesai":
        return "bg-[#d4edda] text-[#155724]"; 
      default:
        return "bg-white/10 text-zinc-300";
    }
  };

  // Aksi simpan data baru dari Form Tambah Data
  const handleTambahSubmit = (e) => {
    e.preventDefault();
    const nextIdNumber = services.length + 1;
    const padId = String(nextIdNumber).padStart(3, "0");
    
    const newData = {
      id: `PS-250526-${padId}`,
      noTransaksi: `NT-250526-${padId}`,
      tanggal: formTambah.tanggal || "2026-05-25",
      pelanggan: formTambah.pelanggan,
      mekanik: formTambah.mekanik,
      kendaraan: formTambah.kendaraan,
      layanan: formTambah.layanan,
      status: "Belum dikerjakan",
      biaya: formTambah.biaya || "0"
    };

    setServices([...services, newData]);
    setIsModalOpen(false);
    setFormTambah({ pelanggan: "", tanggal: "", mekanik: "", biaya: "", layanan: "", kendaraan: "" });
  };

  // Trigger klik tombol pensil: Mengisi data awal ke Form Edit Pelayanan
  const handleEditClick = (item, idx) => {
    setFormEdit({
      index: idx,
      id: item.id,
      noTransaksi: item.noTransaksi,
      pelanggan: item.pelanggan,
      tanggal: item.tanggal,
      mekanik: item.mekanik,
      biaya: item.biaya,
      layanan: item.layanan,
      kendaraan: item.kendaraan,
      status: item.status
    });
    setIsEditModalOpen(true);
  };

  // Aksi simpan perubahan data dari Form Edit Pelayanan
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = [...services];
    updated[formEdit.index] = {
      id: formEdit.id,
      noTransaksi: formEdit.noTransaksi,
      tanggal: formEdit.tanggal,
      pelanggan: formEdit.pelanggan,
      mekanik: formEdit.mekanik,
      kendaraan: formEdit.kendaraan,
      layanan: formEdit.layanan,
      status: formEdit.status,
      biaya: formEdit.biaya
    };
    setServices(updated);
    setIsEditModalOpen(false);
  };

  // Aksi klik tombol keranjang sampah: Menghapus baris data pelayanan tertentu
  const handleDeleteClick = (idx) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data pelayanan servis ini?")) {
      const filtered = services.filter((_, i) => i !== idx);
      setServices(filtered);
    }
  };

  return (
    <div className="p-6 relative">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Daftar Pelayanan Servis</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-[#F24822] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d63f1e]"
          >
            Tambah Data
          </button>
          
          <button className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white">
            <LuRotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        
        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="relative w-[300px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LuSearch className="text-zinc-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search"
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
                <th className="pb-4 pr-4 font-medium">ID</th>
                <th className="pb-4 pr-4 font-medium">No. Transaksi</th>
                <th className="pb-4 pr-4 font-medium">Tanggal</th>
                <th className="pb-4 pr-4 font-medium">Nama Pelanggan</th>
                <th className="pb-4 pr-4 font-medium">Kendaraan</th>
                <th className="pb-4 pr-4 font-medium">Jenis Pelayanan</th>
                <th className="pb-4 pr-4 text-center font-medium">Status</th>
                <th className="pb-4 pr-4 font-medium">Total Biaya</th>
                <th className="pb-4 text-center font-medium">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {services.map((item, index) => (
                <tr key={index} className="text-zinc-300 transition-colors hover:bg-white/[0.02]">
                  <td className="py-4 pr-4 font-medium text-white">{index + 1}</td>
                  <td className="py-4 pr-4">{item.id}</td>
                  <td className="py-4 pr-4">{item.noTransaksi}</td>
                  <td className="py-4 pr-4">{formatTanggalTampilan(item.tanggal)}</td>
                  <td className="py-4 pr-4">{item.pelanggan}</td>
                  <td className="py-4 pr-4">{item.kendaraan}</td>
                  <td className="py-4 pr-4">{item.layanan}</td>
                  <td className="py-4 pr-4 text-center">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-white">Rp. {parseInt(item.biaya).toLocaleString("id-ID")}.-</td>
                  <td className="py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="text-zinc-400 transition-colors hover:text-white">
                        <LuEye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(item, index)}
                        className="text-zinc-400 transition-colors hover:text-white"
                      >
                        <LuPen size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(index)}
                        className="text-[#F24822] transition-colors hover:text-red-500"
                      >
                        <LuTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
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

      {/* MODAL TAMBAH DATA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#1e1e1e] p-8 shadow-2xl">
            <h2 className="mb-8 text-2xl font-bold text-white">Form Pelayanan Servis</h2>

            <form onSubmit={handleTambahSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Nama Pelanggan</label>
                  <select 
                    value={formTambah.pelanggan}
                    onChange={(e) => setFormTambah({...formTambah, pelanggan: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="">Pilih Pelanggan</option>
                    <option value="Lindi">Lindi</option>
                    <option value="Yusuf">Yusuf</option>
                    <option value="Nanta">Nanta</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Tanggal</label>
                  <input 
                    type="date" 
                    value={formTambah.tanggal}
                    onChange={(e) => setFormTambah({...formTambah, tanggal: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Mekanik</label>
                  <select 
                    value={formTambah.mekanik}
                    onChange={(e) => setFormTambah({...formTambah, mekanik: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="">Pilih Mekanik</option>
                    <option value="Bima">Bima</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Biaya</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-zinc-400">Rp.</span>
                    <input 
                      type="number" 
                      placeholder="25000" 
                      value={formTambah.biaya}
                      onChange={(e) => setFormTambah({...formTambah, biaya: e.target.value})}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] py-3 pl-10 pr-4 text-sm text-white focus:border-[#F24822] focus:outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Jenis Pelayanan</label>
                  <select 
                    value={formTambah.layanan}
                    onChange={(e) => setFormTambah({...formTambah, layanan: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="">Pilih Layanan</option>
                    <option value="Servis Berkala">Servis Berkala</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Kendaraan</label>
                  <select 
                    value={formTambah.layanan.kendaraan}
                    onChange={(e) => setFormTambah({...formTambah, kendaraan: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="">Pilih Kendaraan</option>
                    <option value="Scoopy">Scoopy</option>
                    <option value="Nmax">Nmax</option>
                    <option value="ADV">ADV</option>
                    <option value="PCX">PCX</option>
                    <option value="Beat">Beat</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-6 py-2.5 text-sm font-bold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#F24822] px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d63f1e]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT DATA (Disamakan dengan Desain Form Edit Pelayanan.jpg) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#1e1e1e] p-8 shadow-2xl">
            <h2 className="mb-8 text-2xl font-bold text-white">Form Edit Pelayanan Servis</h2>

            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Nama Pelanggan</label>
                  <select 
                    value={formEdit.pelanggan}
                    onChange={(e) => setFormEdit({...formEdit, pelanggan: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="Lindi">Lindi</option>
                    <option value="Yusuf">Yusuf</option>
                    <option value="Nanta">Nanta</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Tanggal</label>
                  <input 
                    type="date" 
                    value={formEdit.tanggal}
                    onChange={(e) => setFormEdit({...formEdit, tanggal: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Mekanik</label>
                  <select 
                    value={formEdit.mekanik}
                    onChange={(e) => setFormEdit({...formEdit, mekanik: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="Bima">Bima</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Biaya</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm text-zinc-400">Rp.</span>
                    <input 
                      type="number" 
                      value={formEdit.biaya}
                      onChange={(e) => setFormEdit({...formEdit, biaya: e.target.value})}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] py-3 pl-10 pr-4 text-sm text-white focus:border-[#F24822] focus:outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Jenis Pelayanan</label>
                  <select 
                    value={formEdit.layanan}
                    onChange={(e) => setFormEdit({...formEdit, layanan: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="Servis Berkala">Servis Berkala</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Kendaraan</label>
                  <select 
                    value={formEdit.kendaraan}
                    onChange={(e) => setFormEdit({...formEdit, kendaraan: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="Scoopy">Scoopy</option>
                    <option value="Nmax">Nmax</option>
                    <option value="ADV">ADV</option>
                    <option value="PCX">PCX</option>
                    <option value="Beat">Beat</option>
                  </select>
                </div>

                {/* Tambahan Field Status Pelayanan khusus untuk Form Edit */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Status Pelayanan</label>
                  <select 
                    value={formEdit.status}
                    onChange={(e) => setFormEdit({...formEdit, status: e.target.value})}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white focus:border-[#F24822] focus:outline-none"
                  >
                    <option value="Belum dikerjakan">Belum dikerjakan</option>
                    <option value="Sedang dikerjakan">Sedang dikerjakan</option>
                    <option value="Sudah Selesai">Sudah Selesai</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl px-6 py-2.5 text-sm font-bold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#F24822] px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d63f1e]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}