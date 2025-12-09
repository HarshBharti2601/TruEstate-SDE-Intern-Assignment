"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function FilterPanel({ filters, onFilterChange }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    })
  }

  const FilterDropdown = ({ label, options, filterKey }) => {
    const isOpen = openDropdown === filterKey

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : filterKey)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          {label}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-50 min-w-max">
            <select
              value={filters[filterKey]}
              onChange={(e) => {
                handleChange(filterKey, e.target.value)
                setOpenDropdown(null)
              }}
              className="w-full px-4 py-2 text-sm"
            >
              <option value="">All</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <FilterDropdown
        label="Customer Region"
        options={["North", "South", "East", "West", "Central"]}
        filterKey="region"
      />
      <FilterDropdown label="Gender" options={["Male", "Female", "Other"]} filterKey="gender" />

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Age"
          value={filters.minAge}
          onChange={(e) => handleChange("minAge", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Age"
          value={filters.maxAge}
          onChange={(e) => handleChange("maxAge", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <FilterDropdown
        label="Product Category"
        options={["Clothing", "Electronics", "Home & Garden", "Sports", "Books"]}
        filterKey="category"
      />
      <FilterDropdown label="Tags" options={["Premium", "Sale", "New"]} filterKey="tags" />
      <FilterDropdown
        label="Payment Method"
        options={["Credit Card", "Debit Card", "UPI", "Cash"]}
        filterKey="paymentMethod"
      />
    </div>
  )
}
