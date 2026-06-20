import { useEffect, useState } from "react";

import api from "../../api/axios";

import PageHeader from "../../components/PageHeader";

import ServiceHeader from "../../components/service/ServiceHeader";
import SearchBar from "../../components/service/SearchBar";
import ServiceTable from "../../components/service/ServiceTable";
import Pagination from "../../components/service/Pagination";
import ServiceForm from "../../components/service/ServiceForm";
import DeleteModal from "../../components/service/DeleteModal";

export default function Index() {
  // ==========================
  // STATE
  // ==========================
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [spareparts, setSpareparts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const filteredServices = services.filter((item) => {
    const keyword = search.trim().toLowerCase();

    return (
      item.kode_servis?.toLowerCase().includes(keyword) ||
      item.nama_pelanggan?.toLowerCase().includes(keyword) ||
      item.nama_kendaraan?.toLowerCase().includes(keyword) ||
      item.plat_kendaraan?.toLowerCase().includes(keyword) ||
      item.status?.toLowerCase().includes(keyword) ||
      item.service_type?.nama_servis?.toLowerCase().includes(keyword)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  // ==========================
  // DUMMY DATA
  // (Nanti diganti API)
  // ==========================

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

        alert("Pelayanan berhasil diperbarui.");
      } else {
        await api.post("/services", formData);

        alert("Pelayanan berhasil ditambahkan.");
      }

      setOpenForm(false);
      setSelectedService(null);

      fetchServices();
    } catch (error) {
      console.error(error);

      alert("Gagal menyimpan pelayanan.");
    }
  };

  const handleDeleteService = async () => {
    try {
      await api.delete(`/services/${selectedService.id}`);

      alert("Pelayanan berhasil dihapus.");

      setOpenDelete(false);
      setSelectedService(null);

      fetchServices();
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus pelayanan.");
    }
  };

  useEffect(() => {
    fetchServices();
    fetchServiceTypes();
    fetchSpareparts();
  }, []);

  return (
    <div className="mt-5 space-y-6">
      <PageHeader breadcrumb={["TwinMotor", "Pelayanan Servis"]} />

      <ServiceHeader
        onAdd={() => {
          setSelectedService(null);
          setOpenForm(true);
        }}
      />

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <ServiceTable
        services={filteredServices}
        onDetail={() => {}}
        onEdit={(item) => {
          console.log(item);

          setSelectedService(item);
          setOpenForm(true);
        }}
        onDelete={(item) => {
          setSelectedService(item);
          setOpenDelete(true);
        }}
      />

      <Pagination currentPage={currentPage} totalPages={1} onPageChange={(page) => setCurrentPage(page)} />

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

      <DeleteModal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedService(null);
        }}
        onConfirm={handleDeleteService}
      />
    </div>
  );
}
