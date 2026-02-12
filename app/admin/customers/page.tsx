"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockCustomers = [
  { id: "1", name: "João Silva", email: "joao@example.com", orders: 3, totalSpent: 2497.0, joined: "2024-01-15" },
  { id: "2", name: "Maria Santos", email: "maria@example.com", orders: 1, totalSpent: 899.0, joined: "2024-02-01" },
  { id: "3", name: "Pedro Costa", email: "pedro@example.com", orders: 2, totalSpent: 1398.0, joined: "2024-02-10" },
  { id: "4", name: "Ana Ferreira", email: "ana@example.com", orders: 1, totalSpent: 499.0, joined: "2024-02-20" },
]

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 sm:mb-2">Customers</h1>
        <p className="text-muted-foreground/80 font-light text-sm sm:text-base">
          View and manage customer accounts
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="font-light text-base sm:text-lg">All Customers</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          {/* Mobile/tablet: card layout */}
          <div className="md:hidden space-y-3">
            {mockCustomers.map((customer) => (
              <div
                key={customer.id}
                className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-light text-sm sm:text-base">{customer.name}</p>
                  <span className="text-sm font-light text-muted-foreground/80">
                    €{customer.totalSpent.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/80 font-light truncate">{customer.email}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0 text-xs text-muted-foreground/70">
                  <span>{customer.orders} orders</span>
                  <span>Joined {customer.joined}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Orders</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Total Spent</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-light">{customer.name}</td>
                    <td className="py-4 px-4 text-muted-foreground/80 font-light">{customer.email}</td>
                    <td className="py-4 px-4 font-light">{customer.orders}</td>
                    <td className="py-4 px-4 font-light">€{customer.totalSpent.toFixed(2)}</td>
                    <td className="py-4 px-4 text-muted-foreground/80 font-light text-sm">{customer.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
