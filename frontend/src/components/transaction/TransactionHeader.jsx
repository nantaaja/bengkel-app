export default function TransactionHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-semibold text-white">
          Riwayat Transaksi
        </h1>

        <p className="mt-1 text-zinc-400">
          Daftar seluruh transaksi pelayanan servis yang telah selesai.
        </p>
      </div>
    </div>
  );
}