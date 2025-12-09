import { Package, DollarSign, Tag } from "lucide-react"

export default function SummaryCards({ data }) {
  console.log("[v0] SummaryCards received data:", data?.length || 0, "items")

  let totalUnits = 0
  let totalAmount = 0
  let totalTransactions = 0

  data.forEach((item) => {
    if (item.quantity) totalUnits += item.quantity
    if (item.finalAmount) totalAmount += item.finalAmount
    totalTransactions += 1
  })

  const totalDiscount = data.reduce((sum, item) => {
    return sum + ((item.totalAmount || 0) - (item.finalAmount || 0))
  }, 0)

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded border border-gray-200 flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-2">Total units sold</p>
          <p className="text-3xl font-bold text-gray-900">{totalUnits}</p>
        </div>
        <Package size={32} className="text-orange-300 opacity-60" />
      </div>
      <div className="bg-white p-6 rounded border border-gray-200 flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-2">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{totalAmount.toLocaleString("en-IN")}{" "}
            <span className="text-xs font-normal text-gray-500">({totalTransactions} SRs)</span>
          </p>
        </div>
        <DollarSign size={32} className="text-yellow-400 opacity-60" />
      </div>
      <div className="bg-white p-6 rounded border border-gray-200 flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-2">Total Discount</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{totalDiscount.toLocaleString("en-IN")}{" "}
            <span className="text-xs font-normal text-gray-500">({totalTransactions} SRs)</span>
          </p>
        </div>
        <Tag size={32} className="text-pink-300 opacity-60" />
      </div>
    </div>
  )
}
