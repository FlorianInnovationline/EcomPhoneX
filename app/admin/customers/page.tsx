"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock customer data
const mockCustomers = [
  { id: "1", name: "João Silva", email: "joao@example.com", orders: 3, totalSpent: 2497.00, joined: "2024-01-15" },
  { id: "2", name: "Maria Santos", email: "maria@example.com", orders: 1, totalSpent: 899.00, joined: "2024-02-01" },
  { id: "3", name: "Pedro Costa", email: "pedro@example.com", orders: 2, totalSpent: 1398.00, joined: "2024-02-10" },
  { id: "4", name: "Ana Ferreira", email: "ana@example.com", orders: 1, totalSpent: 499.00, joined: "2024-02-20" },
]

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Customers</h1>
        <p className="text-muted-foreground/80 font-light">
          View and manage customer accounts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-light">All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
