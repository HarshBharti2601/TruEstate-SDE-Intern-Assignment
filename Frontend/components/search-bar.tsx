"use client"

import { Search } from "lucide-react"

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-2 w-80">
      <Search size={18} className="text-gray-400" />
      <input
        type="text"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 outline-none text-sm placeholder:text-gray-400"
      />
    </div>
  )
}
