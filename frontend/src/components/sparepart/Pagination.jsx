import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white disabled:opacity-40"
      >
        <LuChevronLeft />
      </button>

      <span className="text-zinc-400">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white disabled:opacity-40"
      >
        <LuChevronRight />
      </button>
    </div>
  );
}