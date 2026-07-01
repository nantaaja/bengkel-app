export default function TransactionHeader() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
      <div>
        <h1 className="text-2xl sm:text-4xl font-semibold text-white">Riwayat Transaksi</h1>
        <p className="mt-1 text-sm sm:text-base text-zinc-400">
          Daftar seluruh transaksi pelayanan servis yang telah selesai.
        </p>
      </div>
    </div>
  );
}