"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, BarChart3, Sparkles, Folder, Tag, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/collections", label: "Collections", icon: Folder },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

interface AdminSidebarProps {
  open?: boolean
  onClose?: () => void
}

export function AdminSidebar({ open = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-full w-72 border-r bg-gradient-to-b from-background via-background to-muted/20 backdrop-blur-sm",
        "transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 sm:h-20 items-center justify-between border-b border-border/50 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-light tracking-tight truncate">Xeno Mobile</h2>
            <p className="text-xs text-muted-foreground/60 font-light">Admin Panel</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden p-2 rounded-xl hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="p-4 sm:p-6 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 sm:gap-4 rounded-xl px-3 sm:px-4 py-3 text-sm font-light transition-all duration-200 active:scale-[0.98]",
                isActive
                  ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent text-foreground border border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground/80"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-all duration-200",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground/60"
                )}
              />
              <span className="tracking-wide truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
