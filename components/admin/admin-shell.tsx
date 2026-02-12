"use client"

import { useState, useCallback } from "react"
import { AdminSidebar } from "./sidebar"
import { AdminHeader } from "./header"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Backdrop: mobile/tablet only, when sidebar open */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={closeSidebar}
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          lg:hidden
          ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />
      <AdminSidebar
        open={sidebarOpen}
        onClose={closeSidebar}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader onMenuClick={openSidebar} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12">{children}</main>
      </div>
    </div>
  )
}
