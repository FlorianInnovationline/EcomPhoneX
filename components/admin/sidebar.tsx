"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, BarChart3, Sparkles, Folder, Tag } from "lucide-react"
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

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 border-r bg-gradient-to-b from-background via-background to-muted/20 backdrop-blur-sm">
      <div className="flex h-20 items-center border-b border-border/50 px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-light tracking-tight">Xeno Mobile</h2>
            <p className="text-xs text-muted-foreground/60 font-light">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="p-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-light transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent text-foreground border border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground/80"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground/60"
              )} />
              <span className="tracking-wide">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
