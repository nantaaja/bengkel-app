<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;

class ServiceTypeController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => ServiceType::orderBy('nama_servis')->get(),
        ]);
    }
}