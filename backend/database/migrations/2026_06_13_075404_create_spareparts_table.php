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
        Schema::create('spareparts', function (Blueprint $table) {
            $table->id();

            // Kode barang (contoh: BM-250526-001)
            $table->string('kode_barang')->unique();

            // Informasi barang
            $table->string('nama_barang');
            $table->string('supplier');
            $table->date('tanggal_masuk');

            // Stok
            $table->integer('stok');

            // Harga
            $table->decimal('harga_modal', 15, 2);
            $table->integer('persentase_jual');
            $table->decimal('harga_jual', 15, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spareparts');
    }
};
