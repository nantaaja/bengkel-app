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
            $guzzleClient = new Client(['verify' => false]);
            
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->setHttpClient($guzzleClient)
                ->userFromToken($token);

            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'password' => null,
                ]
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login berhasil',
                'access_token' => $token,
                'user' => $user
            ], 200)->header('Access-Control-Allow-Origin', '*');

        } catch (Exception $e) {
            Log::error('Google Login Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Gagal', 
                'error' => $e->getMessage()
            ], 500)->header('Access-Control-Allow-Origin', '*');
        }
    }
}