"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Filters({ filters, onFiltersChange }) {
  const [openFilter, setOpenFilter] = useState(null)

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: filters[key] === value ? "" : value })
    setOpenFilter(null)
  }

  const FilterButton = ({ label, options, filterKey }) => (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(openFilter === filterKey ? null : filterKey)}
        className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 bg-white rounded hover:bg-gray-50 whitespace-nowrap"
      >
        {label}
        <ChevronDown size={14} />
      </button>

      {openFilter === filterKey && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-max">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => updateFilter(filterKey, opt)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                filters[filterKey] === opt ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <FilterButton
        label="Region"
        options={["North", "South", "East", "West", "Central", "Unknown"]}
        filterKey="region"
      />
      <FilterButton label="Gender" options={["Male", "Female", "Other"]} filterKey="gender" />
      <FilterButton label="Customer Type" options={["New", "Returning", "Loyal"]} filterKey="customerType" />
      <FilterButton
        label="Category"
        options={["Beauty", "Clothing", "Electronics", "Home & Garden", "Sports", "Books"]}
        filterKey="category"
      />
      <FilterButton
        label="Brand"
        options={["PureBloom", "UrbanWeave", "TechElite", "HomeNest", "SportZone", "ReadMore"]}
        filterKey="brand"
      />
      <FilterButton
        label="Payment Method"
        options={["Wallet", "Net Banking", "UPI", "Credit Card", "Debit Card", "Cash"]}
        filterKey="paymentMethod"
      />
      <FilterButton
        label="Order Status"
        options={["Pending", "Completed", "Cancelled", "Processing"]}
        filterKey="orderStatus"
      />
      <FilterButton
        label="Delivery Type"
        options={["Express", "Store Pickup", "Standard", "Overnight"]}
        filterKey="deliveryType"
      />
      <FilterButton
        label="Store Location"
        options={["Ahmedabad", "Delhi", "Mumbai", "Bangalore", "Hyderabad"]}
        filterKey="storeLocation"
      />
    </div>
  )
}
