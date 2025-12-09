"use client"

import { useState } from "react"
import { ChevronDown, LayoutDashboard, Package, Inbox, Wrench, FileText } from "lucide-react"

export default function Sidebar() {
  const [expandedServices, setExpandedServices] = useState(true)
  const [expandedInvoices, setExpandedInvoices] = useState(true)

  return (
    <div className="w-52 bg-slate-900 text-slate-50 flex flex-col border-r border-slate-800">
      {/* Logo / Brand */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-white">H</div>
          <div>
            <p className="text-sm font-semibold">Harsh</p>
            <p className="text-xs text-slate-400">Harsh Bharti</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {/* Dashboard */}
        <div className="px-4 py-2 flex items-center gap-3 text-slate-300 hover:bg-slate-800 rounded cursor-pointer transition-colors">
          <LayoutDashboard size={20} />
          <span className="text-sm font-medium">Dashboard</span>
        </div>

        {/* Nexus */}
        <div className="px-4 py-2 flex items-center gap-3 text-slate-300 hover:bg-slate-800 rounded cursor-pointer transition-colors">
          <Package size={20} />
          <span className="text-sm font-medium">Nexus</span>
        </div>

        {/* Intake */}
        <div className="px-4 py-2 flex items-center gap-3 text-slate-300 hover:bg-slate-800 rounded cursor-pointer transition-colors">
          <Inbox size={20} />
          <span className="text-sm font-medium">Intake</span>
        </div>

        {/* Services (Expandable) */}
        <div>
          <div
            onClick={() => setExpandedServices(!expandedServices)}
            className="px-4 py-2 flex items-center justify-between gap-3 text-slate-300 hover:bg-slate-800 rounded cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Wrench size={20} />
              <span className="text-sm font-medium">Services</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${expandedServices ? "rotate-180" : ""}`} />
          </div>

          {expandedServices && (
            <div className="ml-4 mt-1 space-y-1">
              <div className="px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                Pre-active
              </div>
              <div className="px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                Active
              </div>
              <div className="px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                Blocked
              </div>
              <div className="px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                Closed
              </div>
            </div>
          )}
        </div>

        {/* Invoices (Expandable) */}
        <div>
          <div
            onClick={() => setExpandedInvoices(!expandedInvoices)}
            className="px-4 py-2 flex items-center justify-between gap-3 text-slate-300 hover:bg-slate-800 rounded cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className="text-sm font-medium">Invoices</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${expandedInvoices ? "rotate-180" : ""}`} />
          </div>

          {expandedInvoices && (
            <div className="ml-4 mt-1 space-y-1">
              <div className="px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                Proforma Invoices
              </div>
              <div className="px-4 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                Final Invoices
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
