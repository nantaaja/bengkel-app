<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            $table->string('kode_servis')->unique();

            $table->string('nama_pelanggan');

            $table->string('no_hp');

            $table->date('tanggal_servis');

            $table->string('nama_kendaraan');

            $table->string('plat_kendaraan');

            $table->string('jenis_servis');

            $table->decimal('biaya_servis', 12, 2)->default(0);

            $table->enum('status', [
                'Belum dikerjakan',
                'Sedang dikerjakan',
                'Sudah selesai'
            ])->default('Belum dikerjakan');

            $table->decimal('total_biaya', 12, 2)->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
