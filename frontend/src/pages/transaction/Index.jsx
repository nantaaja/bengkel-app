import { useEffect, useState } from "react";

import api from "../../api/axios";

import TransactionHeader from "../../components/transaction/TransactionHeader";
import SearchBar from "../../components/transaction/SearchBar";
import TransactionTable from "../../components/transaction/TransactionTable";
import Pagination from "../../components/transaction/Pagination";
import TransactionDetail from "../../components/transaction/TransactionDetail";

const ITEMS_PER_PAGE = 10;

export default function Index() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await api.get("/services");
      setServices(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const history = services.filter((item) => item.status === "Selesai");

  const filteredHistory = history.filter((item) => {
    const keyword = search.trim().toLowerCase();
    const tanggal = item.tanggal_servis
      ? new Date(item.tanggal_servis).toLocaleDateString("id-ID")
      : "";
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

  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / ITEMS_PER_PAGE));

  const currentData = filteredHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div
      className="space-y-6 rounded-[28px] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,.25)] backdrop-blur-2xl"
      style={{
        background: `radial-gradient(circle at top, rgba(255,255,255,.06) 0%, rgba(255,255,255,.03) 40%, rgba(255,255,255,.015) 100%)`,
      }}
    >
      <TransactionHeader />

      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-20 text-center text-zinc-400">
          Memuat data...
        </div>
      ) : (
        <>
          <TransactionTable
            services={currentData}
            onDetail={(item) => {
              setSelectedTransaction(item);
              setOpenDetail(true);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      <TransactionDetail
        open={openDetail}
        transaction={selectedTransaction}
        onClose={() => {
          setOpenDetail(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
}