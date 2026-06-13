<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sparepart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SparepartController extends Controller
{
    /**
     * Menampilkan semua data sparepart
     */
    public function index()
    {
        $spareparts = Sparepart::orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Data sparepart berhasil diambil.',
            'data' => $spareparts
        ]);
    }

    /**
     * Menyimpan data baru
     */
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nama_barang'      => 'required|string|max:255',
            'supplier'         => 'required|string|max:255',
            'tanggal_masuk'    => 'required|date',
            'stok'             => 'required|integer|min:0',
            'harga_modal'      => 'required|numeric|min:0',
            'persentase_jual'  => 'required|integer|min:0'
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors()
            ], 422);
        }

        // ==========================================
        // Generate Kode Barang Berdasarkan Tanggal Masuk
        // Format : BM-260613-001
        // ==========================================

        // Ambil tanggal masuk dari form
        $tanggalMasuk = $request->tanggal_masuk;

        // Ubah format menjadi YYMMDD
        $tanggal = date('ymd', strtotime($tanggalMasuk));

        // Cari data terakhir dengan tanggal masuk yang sama
        $barangTerakhir = Sparepart::where('tanggal_masuk', $tanggalMasuk)
            ->orderBy('id', 'desc')
            ->first();

        // Tentukan nomor urut
        if ($barangTerakhir) {
            $nomorUrut = (int) substr($barangTerakhir->kode_barang, -3) + 1;
        } else {
            $nomorUrut = 1;
        }

        // Gabungkan menjadi kode barang
        $kodeBarang = 'BM-' . $tanggal . '-' . str_pad($nomorUrut, 3, '0', STR_PAD_LEFT);

        // ==========================================
        // Hitung Harga Jual
        // ==========================================

        $hargaJual = $request->harga_modal +
            ($request->harga_modal * $request->persentase_jual / 100);

        // ==========================================
        // Simpan ke Database
        // ==========================================

        $sparepart = Sparepart::create([
            'kode_barang'      => $kodeBarang,
            'nama_barang'      => $request->nama_barang,
            'supplier'         => $request->supplier,
            'tanggal_masuk'    => $request->tanggal_masuk,
            'stok'             => $request->stok,
            'harga_modal'      => $request->harga_modal,
            'persentase_jual'  => $request->persentase_jual,
            'harga_jual'       => $hargaJual
        ]);

        // ==========================================
        // Response
        // ==========================================

        return response()->json([
            'success' => true,
            'message' => 'Data sparepart berhasil ditambahkan.',
            'data' => $sparepart
        ], 201);
    }

    /**
     * Menampilkan satu data
     */
    public function show(Sparepart $sparepart)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail sparepart berhasil diambil.',
            'data' => $sparepart
        ]);
    }

    /**
     * Mengubah data
     */
    public function update(Request $request, Sparepart $sparepart)
    {
        // ==========================================
        // Validasi
        // ==========================================

        $validator = Validator::make($request->all(), [
            'nama_barang' => 'required|string|max:255',
            'supplier' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'stok' => 'required|integer|min:0',
            'harga_modal' => 'required|numeric|min:0',
            'persentase_jual' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors()
            ], 422);
        }

        // ==========================================
        // Generate Kode Barang
        // ==========================================

        $tanggalMasuk = $request->tanggal_masuk;
        $tanggal = date('ymd', strtotime($tanggalMasuk));

        $barangTerakhir = Sparepart::where('tanggal_masuk', $tanggalMasuk)
            ->where('id', '!=', $sparepart->id)
            ->orderBy('id', 'desc')
            ->first();

        if ($barangTerakhir) {
            $nomorUrut = (int) substr($barangTerakhir->kode_barang, -3) + 1;
        } else {
            $nomorUrut = 1;
        }

        $kodeBarang = 'BM-' . $tanggal . '-' . str_pad($nomorUrut, 3, '0', STR_PAD_LEFT);

        // ==========================================
        // Hitung Harga Jual
        // ==========================================

        $hargaJual = $request->harga_modal +
            ($request->harga_modal * $request->persentase_jual / 100);

        // ==========================================
        // Update Database
        // ==========================================

        $sparepart->update([
            'kode_barang' => $kodeBarang,
            'nama_barang' => $request->nama_barang,
            'supplier' => $request->supplier,
            'tanggal_masuk' => $request->tanggal_masuk,
            'stok' => $request->stok,
            'harga_modal' => $request->harga_modal,
            'persentase_jual' => $request->persentase_jual,
            'harga_jual' => $hargaJual
        ]);

        // ==========================================
        // Response
        // ==========================================

        return response()->json([
            'success' => true,
            'message' => 'Data sparepart berhasil diperbarui.',
            'data' => $sparepart->fresh()
        ]);
    }

    /**
     * Menghapus data
     */
    public function destroy(Sparepart $sparepart)
    {
        $sparepart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data sparepart berhasil dihapus.'
        ]);
    }
}
