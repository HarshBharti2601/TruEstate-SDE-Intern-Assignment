export default function DataTable({ data }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Transaction ID</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Customer ID</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Customer Name</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone Number</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Gender</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Age</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Product Name</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Brand</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Quantity</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Price/Unit</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Total Amount</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Final Amount</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Discount %</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Payment Method</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Order Status</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Delivery Type</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Store Location</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700">Employee Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-6 py-3 text-gray-900">{row.transactionId}</td>
            <td className="px-6 py-3 text-gray-900">{row.date ? row.date.split("T")[0] : "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.customerId || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.customerName || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.phoneNumber || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.gender || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.age || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.productName || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.brand || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.category || "-"}</td>
            <td className="px-6 py-3 text-gray-900 font-medium">{String(row.quantity || 0).padStart(2, "0")}</td>
            <td className="px-6 py-3 text-gray-900">₹{(row.pricePerUnit || 0).toLocaleString("en-IN")}</td>
            <td className="px-6 py-3 text-gray-900">₹{(row.totalAmount || 0).toLocaleString("en-IN")}</td>
            <td className="px-6 py-3 text-gray-900">₹{(row.finalAmount || 0).toLocaleString("en-IN")}</td>
            <td className="px-6 py-3 text-gray-900">{row.discountPercentage || 0}%</td>
            <td className="px-6 py-3 text-gray-900">{row.paymentMethod || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.orderStatus || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.deliveryType || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.storeLocation || "-"}</td>
            <td className="px-6 py-3 text-gray-900">{row.employeeName || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
