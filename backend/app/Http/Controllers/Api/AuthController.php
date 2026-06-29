<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function googleLogin(Request $request)
    {
        try {
            $token = $request->access_token;
            
            // 1. Bypass SSL untuk environment localhost (Laragon)
            $guzzleClient = new Client(['verify' => false]);
            
            // 2. Ambil data user dari Google menggunakan token dari React
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->setHttpClient($guzzleClient)
                ->userFromToken($token);

            $googleEmail = $googleUser->getEmail();

            // 3. DAFTAR EMAIL YANG DIIZINKAN MASUK BENGKEL APP
            // Silakan ganti dengan email asli admin dan owner
            $allowedEmails = [
                'twinmotoradmin@gmail.com',  // Ganti dengan email Admin
                'twinmotorowner@gmail.com'   // Ganti dengan email Bos/Owner
            ];

            // 4. Cek apakah email yang login ada di dalam daftar izinkan
            if (!in_array($googleEmail, $allowedEmails)) {
                return response()->json([
                    'message' => 'Akses ditolak. Email Anda tidak terdaftar sebagai staf bengkel!'
                ], 403)->header('Access-Control-Allow-Origin', '*'); 
            }

            // 5. Jika lolos pengecekan email, daftarkan atau ambil data user di database
            $user = User::firstOrCreate(
                ['email' => $googleEmail],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'password' => null, // Dikosongkan karena login via Google
                ]
            );

            // 6. Buatkan Token Akses Sanctum untuk menjaga sesi user
            $authToken = $user->createToken('auth_token')->plainTextToken;

            // 7. Kembalikan response sukses ke React
            return response()->json([
                'message' => 'Login berhasil',
                'access_token' => $authToken,
                'user' => $user
            ], 200)->header('Access-Control-Allow-Origin', '*');

        } catch (Exception $e) {
            // Jika ada sistem yang error (misal token expired/database mati), catat di laravel.log
            Log::error('Google Login Error: ' . $e->getMessage());
            
            // Kembalikan response gagal ke React
            return response()->json([
                'message' => 'Gagal login dengan Google', 
                'error' => $e->getMessage()
            ], 500)->header('Access-Control-Allow-Origin', '*');
        }
    }
}