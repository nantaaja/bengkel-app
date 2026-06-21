import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import SparepartHeader from "../../components/sparepart/SparepartHeader";
import SearchBar from "../../components/sparepart/SearchBar";
import SparepartTable from "../../components/sparepart/SparepartTable";
import Pagination from "../../components/sparepart/Pagination";
import SparepartForm from "../../components/sparepart/SparepartForm";
import DeleteModal from "../../components/sparepart/DeleteModal";

import sparepartService from "../../services/sparepartServices";

export default function Index() {
  const [spareparts, setSpareparts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedSparepart, setSelectedSparepart] = useState(null);

  const loadSpareparts = async () => {
    try {
      setLoading(true);

      const response = await sparepartService.getAll();

      setSpareparts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpareparts();
  }, []);

  const filteredSpareparts = useMemo(() => {
    return spareparts.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.kode_barang.toLowerCase().includes(keyword) ||
        item.nama_barang.toLowerCase().includes(keyword) ||
        item.supplier.toLowerCase().includes(keyword)
      );
    });
  }, [spareparts, search]);

  const totalPages = Math.ceil(filteredSpareparts.length / itemsPerPage);

  const currentData = filteredSpareparts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenCreate = () => {
    setSelectedSparepart(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedSparepart(item);
    setOpenForm(true);
  };

  const handleOpenDelete = async (item) => {
    const result = await Swal.fire({
      title: "Hapus Sparepart?",
      text: `Yakin ingin menghapus ${item.nama_barang}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await sparepartService.delete(item.id);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus.",
        confirmButtonColor: "#ea580c",
      });

      loadSpareparts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data gagal dihapus.",
        confirmButtonColor: "#dc2626",
      });

      console.error(error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedSparepart) {
        await sparepartService.update(selectedSparepart.id, formData);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data sparepart berhasil diperbarui.",
          confirmButtonColor: "#ea580c",
        });
      } else {
        await sparepartService.create(formData);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data sparepart berhasil ditambahkan.",
          confirmButtonColor: "#ea580c",
        });
      }

      setOpenForm(false);
      setSelectedSparepart(null);

      loadSpareparts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menyimpan data.",
        confirmButtonColor: "#dc2626",
      });

      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await sparepartService.delete(selectedSparepart.id);

      setOpenDelete(false);
      setSelectedSparepart(null);

      loadSpareparts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="space-y-6 rounded-[28px] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,.25)] backdrop-blur-2xl"
      style={{
        background: `
        radial-gradient(
            circle at top,
            rgba(255,255,255,.06) 0%,
            rgba(255,255,255,.03) 40%,
            rgba(255,255,255,.015) 100%
        )
        `,
      }}
    >
      <SparepartHeader onAdd={handleOpenCreate} />

      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        onClear={() => setSearch("")}
      />

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-20 text-center text-zinc-400">
          Memuat data...
        </div>
      ) : (
        <>
          <SparepartTable spareparts={currentData} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      <SparepartForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedSparepart(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedSparepart}
      />

      <DeleteModal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedSparepart(null);
        }}
        onConfirm={handleDelete}
        sparepart={selectedSparepart}
      />
    </div>
  );
}
