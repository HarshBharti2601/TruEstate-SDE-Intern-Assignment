"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination({ currentPage, onPageChange, itemsPerPage = 10, totalItems = 0 }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = []
  const maxVisible = 6

  if (totalPages <= 1) return null

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push("...")
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push("...")
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
      >
        <ChevronLeft size={18} className="text-slate-600" />
      </button>

      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`w-8 h-8 rounded text-sm font-semibold transition-colors ${
            page === currentPage
              ? "bg-slate-900 text-white"
              : page === "..."
                ? "cursor-default text-slate-400"
                : "hover:bg-slate-100 text-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
      >
        <ChevronRight size={18} className="text-slate-600" />
      </button>
    </div>
  )
}
