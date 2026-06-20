<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sparepart extends Model
{
    protected $fillable = [
        'kode_barang',
        'nama_barang',
        'supplier',
        'tanggal_masuk',
        'stok',
        'harga_modal',
        'persentase_jual',
        'harga_jual'
    ];

    public function serviceSpareparts()
    {
        return $this->hasMany(ServiceSparepart::class);
    }
}
