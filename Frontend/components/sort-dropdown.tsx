"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function SortDropdown({ sortBy, order, onSort }) {
  const [open, setOpen] = useState(false)

  const sortOptions = [
    { value: "name", label: "Customer Name (A-Z)" },
    { value: "date", label: "Date" },
    { value: "quantity", label: "Quantity" },
  ]

  const currentLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Customer Name (A-Z)"

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
      >
        Sort by: {currentLabel}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-300 rounded-lg shadow-lg z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSort(option.value, "asc")
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${
                sortBy === option.value ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
