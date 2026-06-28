import api from "../api/axios";

const dashboardService = {
    /**
     * Mengambil semua data dashboard dari API.
     * Response shape:
     * {
     *   stats: { total_sparepart, barang_masuk, barang_keluar },
     *   stock_chart: [{ month, total }],
     *   priority_stock: [{ id, name, code, stock, minimum, status }],
     *   barang_masuk_terbaru: [{ id, tanggal, transaksi, supplier, total }],
     *   barang_keluar_terbaru: [{ id, tanggal, transaksi, tujuan, total }],
     * }
     */
    getDashboard() {
        return api.get("/dashboard");
    },
};

export default dashboardService;
