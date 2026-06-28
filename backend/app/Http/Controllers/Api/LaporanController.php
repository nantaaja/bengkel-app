<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sparepart;
use App\Models\Service;

class LaporanController extends Controller
{
    public function index()
    {
        $tahunIni = now()->year;
        $bulanLabel = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

        // ── Data tabel sparepart (harga modal, harga jual, margin) ──
        $spareparts = Sparepart::orderBy('nama_barang')->get()->map(function ($item) {
            $profit = $item->harga_jual - $item->harga_modal;
            $percentage = $item->harga_modal > 0
                ? round(($profit / $item->harga_modal) * 100)
                : 0;

            return [
                'id'          => $item->id,
                'kode'        => $item->kode_barang,
                'nama'        => $item->nama_barang,
                'supplier'    => $item->supplier,
                'harga_modal' => (float) $item->harga_modal,
                'harga_jual'  => (float) $item->harga_jual,
                'stok'        => $item->stok,
                'profit'      => (float) $profit,
                'percentage'  => $percentage,
            ];
        });

        // ── Kartu statistik ──
        $totalModal        = $spareparts->sum(fn($i) => $i['harga_modal'] * $i['stok']);
        $totalNilaiJual    = $spareparts->sum(fn($i) => $i['harga_jual']  * $i['stok']);
        $estimasiProfit    = $totalNilaiJual - $totalModal;
        $totalJenisSparepart = $spareparts->count();

        // ── Bar chart: keuntungan per bulan dari servis yang selesai ──
        $barChart = collect(range(1, 12))->map(function ($bulan) use ($tahunIni, $bulanLabel) {
            $total = Service::where('status', 'Selesai')
                ->whereMonth('tanggal_servis', $bulan)
                ->whereYear('tanggal_servis', $tahunIni)
                ->sum('total_biaya');

            return [
                'bulan' => $bulanLabel[$bulan - 1],
                'nilai' => (float) $total,
            ];
        })->values();

        // ── Ringkasan supplier (pie chart) ──
        $totalStok = $spareparts->sum('stok');
        $supplierGroup = $spareparts->groupBy('supplier')->map(function ($items, $supplier) use ($totalStok) {
            $stok = $items->sum('stok');
            return [
                'supplier'   => $supplier,
                'stok'       => $stok,
                'persentase' => $totalStok > 0 ? round(($stok / $totalStok) * 100) : 0,
            ];
        })->sortByDesc('stok')->values()->take(5);

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_modal'          => $totalModal,
                    'total_nilai_jual'     => $totalNilaiJual,
                    'estimasi_profit'      => $estimasiProfit,
                    'total_jenis_sparepart'=> $totalJenisSparepart,
                ],
                'bar_chart'      => $barChart,
                'supplier_group' => $supplierGroup,
                'spareparts'     => $spareparts,
            ],
        ]);
    }
}