<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'kode_servis',
        'nama_pelanggan',
        'no_hp',
        'tanggal_servis',
        'nama_kendaraan',
        'plat_kendaraan',
        'service_type_id',
        'status',
        'total_biaya',
    ];

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function serviceSpareparts()
    {
        return $this->hasMany(ServiceSparepart::class);
    }
}
