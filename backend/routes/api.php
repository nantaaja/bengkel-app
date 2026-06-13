<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SparepartController;

Route::apiResource('spareparts', SparepartController::class);