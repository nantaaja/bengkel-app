<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSparepart extends Model
{
    protected $fillable = [
        'service_id',
        'sparepart_id',
        'jumlah',
        'harga',
        'subtotal',
    ];

    public function sparepart()
    {
        return $this->belongsTo(Sparepart::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
