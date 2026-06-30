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
            
            // 1. Bypass SSL untuk environment localhost
            $guzzleClient = new Client(['verify' => false]);
            
            // 2. Ambil data user dari Google
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->setHttpClient($guzzleClient)
                ->userFromToken($token);

            $googleEmail = $googleUser->getEmail();

            // 3. VALIDASI DINAMIS: Cek apakah email ada di database
            // Jika tidak ada, berarti user tidak terdaftar oleh Owner
            $user = User::where('email', $googleEmail)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Akses ditolak. Email tidak terdaftar sebagai staf bengkel. Silakan hubungi Pemilik Bengkel.'
                ], 403)->header('Access-Control-Allow-Origin', '*'); 
            }

            // 4. Update data user (opsional, jika nama di Google berubah)
            $user->update([
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
            ]);

            // 5. Buatkan Token Akses Sanctum
            $authToken = $user->createToken('auth_token')->plainTextToken;

            // 6. Kembalikan response sukses (User object sekarang sudah termasuk kolom 'role')
            return response()->json([
                'message' => 'Login berhasil',
                'access_token' => $authToken,
                'user' => $user
            ], 200)->header('Access-Control-Allow-Origin', '*');

        } catch (Exception $e) {
            Log::error('Google Login Error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Gagal login dengan Google', 
                'error' => $e->getMessage()
            ], 500)->header('Access-Control-Allow-Origin', '*');
        }
    }
}