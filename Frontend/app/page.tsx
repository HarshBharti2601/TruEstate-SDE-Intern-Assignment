"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import SearchBar from "@/components/search-bar"
import Filters from "@/components/filters"
import DataTable from "@/components/data-table"
import SummaryCards from "@/components/summary-cards"
import { Pagination } from "@/components/pagination"

export default function Home() {
  const [allTransactions, setAllTransactions] = useState([])
  const [paginatedData, setPaginatedData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    customerType: "",
    minAge: "",
    maxAge: "",
    category: "",
    brand: "",
    tags: "",
    paymentMethod: "",
    orderStatus: "",
    deliveryType: "",
    storeLocation: "",
    employeeName: "",
    startDate: "",
    endDate: "",
    minQuantity: "",
    maxQuantity: "",
    minDiscountPercentage: "",
    maxDiscountPercentage: "",
    minTotalAmount: "",
    maxTotalAmount: "",
  })
  const [sort, setSort] = useState("customerName")
  const [page, setPage] = useState(1)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const transactionsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const hasSearch = search.trim().length > 0
        const hasFilters = Object.values(filters).some((f) => f)

        let allCustomers = []

        if (hasSearch || hasFilters) {
          const queryParams = new URLSearchParams()

          if (search) queryParams.append("search", search)
          if (filters.region) queryParams.append("region", filters.region)
          if (filters.gender) queryParams.append("gender", filters.gender)
          if (filters.customerType) queryParams.append("customerType", filters.customerType)
          if (filters.minAge) queryParams.append("minAge", filters.minAge)
          if (filters.maxAge) queryParams.append("maxAge", filters.maxAge)
          if (filters.category) queryParams.append("category", filters.category)
          if (filters.brand) queryParams.append("brand", filters.brand)
          if (filters.tags) queryParams.append("tags", filters.tags)
          if (filters.paymentMethod) queryParams.append("paymentMethod", filters.paymentMethod)
          if (filters.orderStatus) queryParams.append("orderStatus", filters.orderStatus)
          if (filters.deliveryType) queryParams.append("deliveryType", filters.deliveryType)
          if (filters.storeLocation) queryParams.append("storeLocation", filters.storeLocation)
          if (filters.employeeName) queryParams.append("employeeName", filters.employeeName)
          if (filters.startDate) queryParams.append("startDate", filters.startDate)
          if (filters.endDate) queryParams.append("endDate", filters.endDate)
          if (filters.minQuantity) queryParams.append("minQuantity", filters.minQuantity)
          if (filters.maxQuantity) queryParams.append("maxQuantity", filters.maxQuantity)
          if (filters.minDiscountPercentage) queryParams.append("minDiscountPercentage", filters.minDiscountPercentage)
          if (filters.maxDiscountPercentage) queryParams.append("maxDiscountPercentage", filters.maxDiscountPercentage)
          if (filters.minTotalAmount) queryParams.append("minTotalAmount", filters.minTotalAmount)
          if (filters.maxTotalAmount) queryParams.append("maxTotalAmount", filters.maxTotalAmount)

          const res = await fetch(`https://search-api-harsh.vercel.app/searchall?${queryParams.toString()}`)
          const result = await res.json()
          allCustomers = result.data || []
        } else {
          let pageNum = 1
          let hasMore = true

          while (hasMore) {
            const res = await fetch(`https://search-api-harsh.vercel.app/search?page=${pageNum}&limit=10`)
            const result = await res.json()
            const customers = result.data || []

            if (customers.length === 0) {
              hasMore = false
            } else {
              allCustomers = allCustomers.concat(customers)
              pageNum++
            }
          }
        }

        const flattenedTransactions = []
        let transactionCounter = 1

        allCustomers.forEach((customer) => {
          if (customer.sales && Array.isArray(customer.sales) && customer.sales.length > 0) {
            customer.sales.forEach((sale) => {
              flattenedTransactions.push({
                transactionId: transactionCounter++,
                customerId: customer.id,
                customerName: customer.customerName,
                phoneNumber: customer.phoneNumber,
                gender: customer.gender,
                age: customer.age,
                region: customer.region,
                customerType: customer.customerType,
                saleId: sale.id,
                date: sale.date,
                quantity: sale.quantity,
                pricePerUnit: sale.pricePerUnit,
                discountPercentage: sale.discountPercentage,
                totalAmount: sale.totalAmount,
                finalAmount: sale.finalAmount,
                paymentMethod: sale.paymentMethod,
                orderStatus: sale.orderStatus,
                deliveryType: sale.deliveryType,
                productName: sale.product?.productName || "-",
                brand: sale.product?.brand || "-",
                category: sale.product?.category || "-",
                tags: sale.product?.tags || "-",
                storeLocation: sale.store?.location || "-",
                employeeName: sale.employee?.employeeName || "-",
              })
            })
          }
        })

        if (sort === "customerName") {
          flattenedTransactions.sort((a, b) => a.customerName.localeCompare(b.customerName))
        } else if (sort === "date") {
          flattenedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (sort === "quantity") {
          flattenedTransactions.sort((a, b) => b.quantity - a.quantity)
        }

        setAllTransactions(flattenedTransactions)
        setTotalTransactions(flattenedTransactions.length)
        setPage(1)

        const startIdx = 0
        const endIdx = transactionsPerPage
        setPaginatedData(flattenedTransactions.slice(startIdx, endIdx))
      } catch (error) {
        console.error("Error:", error)
        setAllTransactions([])
        setPaginatedData([])
        setTotalTransactions(0)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [search, filters, sort])

  useEffect(() => {
    const startIdx = (page - 1) * transactionsPerPage
    const endIdx = startIdx + transactionsPerPage
    setPaginatedData(allTransactions.slice(startIdx, endIdx))
  }, [page, allTransactions])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0">
          <h1 className="text-2xl font-bold text-gray-900">Sales Management System</h1>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Summary Cards */}
          <SummaryCards data={allTransactions} />

          {/* Filters and Sort */}
          <div className="mt-6">
            <div className="flex gap-3 items-center flex-wrap mb-3">
              <Filters filters={filters} onFiltersChange={setFilters} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 whitespace-nowrap"
              >
                <option value="customerName">Sort by: Customer Name (A-Z)</option>
                <option value="date">Sort by: Date (Newest)</option>
                <option value="quantity">Sort by: Quantity</option>
              </select>

              {Object.values(filters).some((f) => f) && (
                <button
                  onClick={() =>
                    setFilters({
                      region: "",
                      gender: "",
                      customerType: "",
                      minAge: "",
                      maxAge: "",
                      category: "",
                      brand: "",
                      tags: "",
                      paymentMethod: "",
                      orderStatus: "",
                      deliveryType: "",
                      storeLocation: "",
                      employeeName: "",
                      startDate: "",
                      endDate: "",
                      minQuantity: "",
                      maxQuantity: "",
                      minDiscountPercentage: "",
                      maxDiscountPercentage: "",
                      minTotalAmount: "",
                      maxTotalAmount: "",
                    })
                  }
                  className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium whitespace-nowrap"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {Object.values(filters).some((f) => f) && (
              <div className="flex gap-2 flex-wrap mb-4">
                {Object.entries(filters)
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
                    >
                      <span>{value}</span>
                      <button
                        onClick={() => setFilters({ ...filters, [key]: "" })}
                        className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Data Table */}
          <div className="mt-6 bg-white rounded border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : paginatedData.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No results found</div>
            ) : (
              <DataTable data={paginatedData} />
            )}
          </div>

          {totalTransactions > transactionsPerPage && (
            <div className="mt-6">
              <Pagination
                currentPage={page}
                onPageChange={setPage}
                itemsPerPage={transactionsPerPage}
                totalItems={totalTransactions}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
