<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Service;
use App\Models\ServiceType;
use App\Models\ServiceSparepart;
use App\Models\Sparepart;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::with([
            'serviceType',
            'serviceSpareparts.sparepart'
        ])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_pelanggan' => 'required|string|max:100',
            'no_hp' => 'required|string|max:20',
            'tanggal_servis' => 'required|date',
            'nama_kendaraan' => 'required|string|max:100',
            'plat_kendaraan' => 'required|string|max:30',
            'service_type_id' => 'required|exists:service_types,id',
            'status' => 'required|string',
            'spareparts' => 'nullable|array',
        ]);

        DB::beginTransaction();

        try {

            $today = now()->format('ymd');

            $last = Service::whereDate('created_at', today())
                ->latest()
                ->first();

            $urut = $last
                ? ((int) substr($last->kode_servis, -3)) + 1
                : 1;

            $kodeServis = 'PS-' . $today . '-' . str_pad($urut, 3, '0', STR_PAD_LEFT);

            $serviceType = ServiceType::findOrFail($request->service_type_id);

            $service = Service::create([
                'kode_servis' => $kodeServis,
                'nama_pelanggan' => $request->nama_pelanggan,
                'no_hp' => $request->no_hp,
                'tanggal_servis' => $request->tanggal_servis,
                'nama_kendaraan' => $request->nama_kendaraan,
                'plat_kendaraan' => $request->plat_kendaraan,
                'service_type_id' => $request->service_type_id,
                'status' => $request->status,
                'total_biaya' => 0,
            ]);

            $totalSparepart = 0;

            if ($request->filled('spareparts')) {

                foreach ($request->spareparts as $item) {

                    $sparepart = Sparepart::findOrFail($item['sparepart_id']);

                    if ($sparepart->stok < $item['qty']) {
                        throw new \Exception(
                            "Stok {$sparepart->nama_barang} tidak mencukupi."
                        );
                    }

                    $subtotal = $sparepart->harga_jual * $item['qty'];

                    ServiceSparepart::create([
                        'service_id' => $service->id,
                        'sparepart_id' => $sparepart->id,
                        'jumlah' => $item['qty'],
                        'harga' => $sparepart->harga_jual,
                        'subtotal' => $subtotal,
                    ]);

                    $sparepart->decrement('stok', $item['qty']);

                    $totalSparepart += $subtotal;
                }
            }

            $totalBiaya = $serviceType->harga_servis + $totalSparepart;

            $service->update([
                'total_biaya' => $totalBiaya
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pelayanan servis berhasil ditambahkan.',
                'data' => $service->load([
                    'serviceType',
                    'serviceSpareparts.sparepart'
                ])
            ], 201);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $service = Service::with([
            'serviceType',
            'serviceSpareparts.sparepart'
        ])->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Data pelayanan tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_pelanggan' => 'required',
            'no_hp' => 'required',
            'tanggal_servis' => 'required|date',
            'nama_kendaraan' => 'required',
            'plat_kendaraan' => 'required',
            'service_type_id' => 'required|exists:service_types,id',
            'status' => 'required',
            'spareparts' => 'nullable|array',
            'spareparts.*.sparepart_id' => 'required_with:spareparts|exists:spareparts,id',
            'spareparts.*.qty' => 'required_with:spareparts|integer|min:1',
        ]);

        $service = Service::with('serviceSpareparts')->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Data pelayanan tidak ditemukan.'
            ], 404);
        }

        DB::beginTransaction();

        try {

            // 1. Kembalikan stok lama

            foreach ($service->serviceSpareparts as $detail) {

                $sparepart = Sparepart::find($detail->sparepart_id);

                if ($sparepart) {
                    $sparepart->stok += $detail->jumlah;
                    $sparepart->save();
                }
            }

            // 2. Hapus seluruh detail sparepart lama

            $service->serviceSpareparts()->delete();

            $service->update([
                'nama_pelanggan' => $request->nama_pelanggan,
                'no_hp' => $request->no_hp,
                'tanggal_servis' => $request->tanggal_servis,
                'nama_kendaraan' => $request->nama_kendaraan,
                'plat_kendaraan' => $request->plat_kendaraan,
                'service_type_id' => $request->service_type_id,
                'status' => $request->status,
            ]);
            $serviceType = ServiceType::findOrFail($request->service_type_id);

            $totalSparepart = 0;

            if ($request->filled('spareparts')) {

                foreach ($request->spareparts as $item) {

                    $sparepart = Sparepart::findOrFail($item['sparepart_id']);

                    if ($sparepart->stok < $item['qty']) {
                        throw new \Exception(
                            "Stok {$sparepart->nama_barang} tidak mencukupi."
                        );
                    }

                    $subtotal = $sparepart->harga_jual * $item['qty'];

                    ServiceSparepart::create([
                        'service_id' => $service->id,
                        'sparepart_id' => $sparepart->id,
                        'jumlah' => $item['qty'],
                        'harga' => $sparepart->harga_jual,
                        'subtotal' => $subtotal,
                    ]);

                    $sparepart->decrement('stok', $item['qty']);

                    $totalSparepart += $subtotal;
                }
            }

            $totalBiaya = $serviceType->harga_servis + $totalSparepart;

            $service->update([
                'total_biaya' => $totalBiaya,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pelayanan servis berhasil diperbarui.',
                'data' => $service->load([
                    'serviceType',
                    'serviceSpareparts.sparepart',
                ])
            ]);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Service::with('serviceSpareparts')->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Data pelayanan tidak ditemukan.'
            ], 404);
        }

        DB::beginTransaction();

        try {

            foreach ($service->serviceSpareparts as $detail) {

                $sparepart = Sparepart::find($detail->sparepart_id);

                if ($sparepart) {
                    $sparepart->stok += $detail->jumlah;
                    $sparepart->save();
                }
            }

            $service->serviceSpareparts()->delete();

            $service->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pelayanan servis berhasil dihapus.'
            ]);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
