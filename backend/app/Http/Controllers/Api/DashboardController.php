<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sparepart;
use App\Models\Service;
use App\Models\ServiceSparepart;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Mengembalikan semua data yang dibutuhkan dashboard dalam satu endpoint.
     */
    public function index()
    {
        $now = now();
        $bulanIni = $now->month;
        $tahunIni = $now->year;

        // ─── KARTU STATISTIK ────────────────────────────────────────────

        // Total semua sparepart yang terdaftar
        $totalSparepart = Sparepart::count();

        // Barang masuk bulan ini → jumlah sparepart yang tanggal_masuk-nya bulan ini
        $jumlahBarangMasuk = Sparepart::whereMonth('tanggal_masuk', $bulanIni)
            ->whereYear('tanggal_masuk', $tahunIni)
            ->count();

        // Barang keluar bulan ini → total jumlah sparepart yang dipakai di servis bulan ini
        $jumlahBarangKeluar = ServiceSparepart::whereHas('service', function ($q) use ($bulanIni, $tahunIni) {
            $q->whereMonth('tanggal_servis', $bulanIni)
              ->whereYear('tanggal_servis', $tahunIni);
        })->sum('jumlah');

        // ─── RINGKASAN STOK PER BULAN (chart bar) ───────────────────────
        $bulanLabel = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

        $stockChart = collect(range(1, 12))->map(function ($bulan) use ($tahunIni, $bulanLabel) {
            $total = Sparepart::whereMonth('tanggal_masuk', $bulan)
                ->whereYear('tanggal_masuk', $tahunIni)
                ->sum('stok');

            return [
                'month' => $bulanLabel[$bulan - 1],
                'total' => (int) $total,
            ];
        })->values();

        // ─── PRIORITAS STOK (stok paling sedikit) ───────────────────────
        $minimumStok = 10;

        $priorityStock = Sparepart::orderBy('stok', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($item) use ($minimumStok) {
                return [
                    'id'      => $item->id,
                    'name'    => $item->nama_barang,
                    'code'    => $item->kode_barang,
                    'stock'   => $item->stok,
                    'minimum' => $minimumStok,
                    'status'  => $item->stok <= $minimumStok ? 'Kritis' : 'Aman',
                ];
            });

        // ─── BARANG MASUK TERBARU ────────────────────────────────────────
        $barangMasukTerbaru = Sparepart::orderBy('tanggal_masuk', 'desc')
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id'        => $item->id,
                    'tanggal'   => \Carbon\Carbon::parse($item->tanggal_masuk)->format('d M Y'),
                    'transaksi' => $item->kode_barang,
                    'supplier'  => $item->supplier,
                    'total'     => $item->stok,
                ];
            });

        // ─── BARANG KELUAR TERBARU (dari tabel servis) ──────────────────
        $barangKeluarTerbaru = Service::with(['serviceSpareparts', 'serviceType'])
            ->orderBy('tanggal_servis', 'desc')
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($service) {
                $totalItem = $service->serviceSpareparts->sum('jumlah');

                return [
                    'id'        => $service->id,
                    'tanggal'   => \Carbon\Carbon::parse($service->tanggal_servis)->format('d M Y'),
                    'transaksi' => $service->kode_servis,
                    'tujuan'    => $service->serviceType ? $service->serviceType->nama_servis : '-',
                    'total'     => $totalItem,
                ];
            });

        // ─── RESPONSE ───────────────────────────────────────────────────
        return response()->json([
            'success' => true,
            'message' => 'Data dashboard berhasil diambil.',
            'data' => [
                'stats' => [
                    'total_sparepart' => $totalSparepart,
                    'barang_masuk'    => $jumlahBarangMasuk,
                    'barang_keluar'   => (int) $jumlahBarangKeluar,
                ],
                'stock_chart'           => $stockChart,
                'priority_stock'        => $priorityStock,
                'barang_masuk_terbaru'  => $barangMasukTerbaru,
                'barang_keluar_terbaru' => $barangKeluarTerbaru,
            ],
        ]);
    }
}
