<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceSparepart;
use App\Models\Sparepart;

class LaporanOwnerController extends Controller
{
    public function index()
    {
        $now        = now();
        $bulan      = $now->month;
        $tahun      = $now->year;
        $bulanLabel = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

        // ── KARTU 1: Total Pendapatan Bulan Ini ──────────────────────────
        // Pendapatan = total_biaya dari servis Selesai bulan ini
        $totalPendapatanBulanIni = Service::where('status', 'Selesai')
            ->whereMonth('tanggal_servis', $bulan)
            ->whereYear('tanggal_servis', $tahun)
            ->sum('total_biaya');

        // ── KARTU 2: Keuntungan Bersih Bulan Ini ─────────────────────────
        // Keuntungan bersih = pendapatan servis - modal sparepart yang dipakai bulan ini
        $modalKeluarBulanIni = ServiceSparepart::whereHas('service', function ($q) use ($bulan, $tahun) {
                $q->where('status', 'Selesai')
                  ->whereMonth('tanggal_servis', $bulan)
                  ->whereYear('tanggal_servis', $tahun);
            })
            ->with('sparepart')
            ->get()
            ->sum(fn($ss) => ($ss->sparepart?->harga_modal ?? 0) * $ss->jumlah);

        $keuntunganBersih = $totalPendapatanBulanIni - $modalKeluarBulanIni;

        // ── KARTU 3: Total Transaksi Bulan Ini ───────────────────────────
        $totalTransaksiBulanIni = Service::where('status', 'Selesai')
            ->whereMonth('tanggal_servis', $bulan)
            ->whereYear('tanggal_servis', $tahun)
            ->count();

        // ── BAR CHART: Pendapatan per bulan tahun ini ────────────────────
        $barChart = collect(range(1, 12))->map(function ($b) use ($tahun, $bulanLabel) {
            $nilai = Service::where('status', 'Selesai')
                ->whereMonth('tanggal_servis', $b)
                ->whereYear('tanggal_servis', $tahun)
                ->sum('total_biaya');
            return ['bulan' => $bulanLabel[$b - 1], 'nilai' => (float) $nilai];
        })->values();

        // ── PIE CHART: Perbandingan keuntungan per kategori ──────────────
        // Pendapatan murni jasa servis (total_biaya - subtotal sparepart)
        $servicesSelesai = Service::where('status', 'Selesai')
            ->whereMonth('tanggal_servis', $bulan)
            ->whereYear('tanggal_servis', $tahun)
            ->with('serviceSpareparts.sparepart')
            ->get();

        $pendapatanJasa      = 0;
        $pendapatanSparepart = 0;

        foreach ($servicesSelesai as $svc) {
            $subtotalSparepart = $svc->serviceSpareparts->sum('subtotal');
            $profitSparepart   = $svc->serviceSpareparts->sum(fn($ss) =>
                ($ss->subtotal ?? 0) - (($ss->sparepart?->harga_modal ?? 0) * $ss->jumlah)
            );
            $profitJasa        = $svc->total_biaya - $subtotalSparepart;

            $pendapatanJasa      += max(0, $profitJasa);
            $pendapatanSparepart += max(0, $profitSparepart);
        }

        $totalPie = $pendapatanJasa + $pendapatanSparepart;
        $pieChart = [
            ['kategori' => 'Jasa Servis', 'nilai' => (float) $pendapatanJasa,
             'persentase' => $totalPie > 0 ? round(($pendapatanJasa / $totalPie) * 100) : 0],
            ['kategori' => 'Sparepart',   'nilai' => (float) $pendapatanSparepart,
             'persentase' => $totalPie > 0 ? round(($pendapatanSparepart / $totalPie) * 100) : 0],
        ];

        // ── TOP 5 SPAREPART (margin tertinggi bulan ini) ─────────────────
        $topSpareparts = ServiceSparepart::whereHas('service', function ($q) use ($bulan, $tahun) {
                $q->where('status', 'Selesai')
                  ->whereMonth('tanggal_servis', $bulan)
                  ->whereYear('tanggal_servis', $tahun);
            })
            ->with('sparepart')
            ->get()
            ->groupBy('sparepart_id')
            ->map(function ($rows) {
                $sparepart  = $rows->first()->sparepart;
                $totalJual  = $rows->sum('subtotal');
                $totalModal = $rows->sum(fn($r) => ($sparepart?->harga_modal ?? 0) * $r->jumlah);
                $profit     = $totalJual - $totalModal;
                $persentase = $totalModal > 0 ? round(($profit / $totalModal) * 100) : 0;

                return [
                    'nama'       => $sparepart?->nama_barang ?? '-',
                    'harga_jual' => (float) ($sparepart?->harga_jual ?? 0),
                    'persentase' => $persentase,
                ];
            })
            ->sortByDesc('persentase')
            ->values()
            ->take(5);

        // ── TOP 5 SERVIS (keuntungan tertinggi bulan ini) ────────────────
        $topServices = $servicesSelesai->map(function ($svc) {
            $subtotalSparepart = $svc->serviceSpareparts->sum('subtotal');
            $modalSparepart    = $svc->serviceSpareparts->sum(fn($ss) =>
                ($ss->sparepart?->harga_modal ?? 0) * $ss->jumlah
            );
            $profitJasa        = max(0, $svc->total_biaya - $subtotalSparepart);
            $profitSparepart   = max(0, $subtotalSparepart - $modalSparepart);
            $totalProfit       = $profitJasa + $profitSparepart;
            $persentase        = $svc->total_biaya > 0
                ? round(($totalProfit / $svc->total_biaya) * 100) : 0;

            return [
                'nama'       => $svc->serviceType?->nama_servis ?? $svc->kode_servis,
                'harga_jual' => (float) $svc->total_biaya,
                'persentase' => $persentase,
            ];
        })
        ->sortByDesc('persentase')
        ->values()
        ->take(5);

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_pendapatan_bulan_ini' => (float) $totalPendapatanBulanIni,
                    'keuntungan_bersih'          => (float) $keuntunganBersih,
                    'total_transaksi_bulan_ini'  => $totalTransaksiBulanIni,
                ],
                'bar_chart'     => $barChart,
                'pie_chart'     => $pieChart,
                'top_spareparts'=> $topSpareparts,
                'top_services'  => $topServices,
            ],
        ]);
    }
}