import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import api from "../../api/axios";

import ServiceHeader from "../../components/service/ServiceHeader";
import SearchBar from "../../components/service/SearchBar";
import ServiceTable from "../../components/service/ServiceTable";
import Pagination from "../../components/service/Pagination";
import ServiceForm from "../../components/service/ServiceForm";

export default function Index() {
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [spareparts, setSpareparts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [search, setSearch] = useState("");

  const activeServices = services.filter((item) => item.status !== "Selesai");

  const filteredServices = activeServices.filter((item) => {
    const keyword = search.trim().toLowerCase();
    const tanggal = item.tanggal_servis ? new Date(item.tanggal_servis).toLocaleDateString("id-ID") : "";

    return (
      item.kode_servis?.toLowerCase().includes(keyword) ||
      item.nama_pelanggan?.toLowerCase().includes(keyword) ||
      item.nama_kendaraan?.toLowerCase().includes(keyword) ||
      item.plat_kendaraan?.toLowerCase().includes(keyword) ||
      item.service_type?.nama_servis?.toLowerCase().includes(keyword) ||
      item.status?.toLowerCase().includes(keyword) ||
      item.tanggal_servis?.toLowerCase().includes(keyword) ||
      tanggal.toLowerCase().includes(keyword)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ITEMS_PER_PAGE));
  const currentData = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const [openForm, setOpenForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await api.get("/services");

      setServices(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data service:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceTypes = async () => {
    try {
      const response = await api.get("/service-types");

      setServiceTypes(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil jenis servis:", error);
    }
  };

  const fetchSpareparts = async () => {
    try {
      const response = await api.get("/spareparts");

      setSpareparts(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data sparepart:", error);
    }
  };

  const handleCreateService = async (formData) => {
    try {
      if (selectedService) {
        await api.put(`/services/${selectedService.id}`, formData);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pelayanan berhasil diperbarui.",
          confirmButtonColor: "#ea580c",
        });
      } else {
        await api.post("/services", formData);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pelayanan berhasil ditambahkan.",
          confirmButtonColor: "#ea580c",
        });
      }

      setOpenForm(false);
      setSelectedService(null);

      fetchServices();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menyimpan pelayanan.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleDeleteService = async (item) => {
    const result = await Swal.fire({
      title: "Hapus Pelayanan?",
      text: `Yakin ingin menghapus pelayanan ${item.kode_servis}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/services/${item.id}`);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data pelayanan berhasil dihapus.",
        confirmButtonColor: "#ea580c",
      });

      fetchServices();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data pelayanan gagal dihapus.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  useEffect(() => {
    fetchServices();
    fetchServiceTypes();
    fetchSpareparts();
  }, []);
  

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
      <ServiceHeader
        onAdd={() => {
          setSelectedService(null);
          setOpenForm(true);
        }}
      />

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
          <ServiceTable
            services={currentData}
            onDetail={() => {}}
            onEdit={(item) => {
              setSelectedService(item);
              setOpenForm(true);
            }}
            onDelete={handleDeleteService}
          />

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)} />
        </>
      )}

      <ServiceForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedService(null);
        }}
        onSubmit={handleCreateService}
        initialData={selectedService}
        serviceTypes={serviceTypes}
        spareparts={spareparts}
      />
    </div>
  );
}
