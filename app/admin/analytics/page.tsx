"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock analytics data
const stats = [
  { label: "Total Revenue", value: "€12,450.00", change: "+12.5%" },
  { label: "Orders", value: "47", change: "+8.2%" },
  { label: "Average Order Value", value: "€264.89", change: "+3.1%" },
  { label: "Customers", value: "124", change: "+15.3%" },
]

const recentOrders = [
  { id: "ORD-001", customer: "João Silva", amount: 899.00, status: "Paid", date: "2024-03-10" },
  { id: "ORD-002", customer: "Maria Santos", amount: 1299.00, status: "Shipped", date: "2024-03-09" },
  { id: "ORD-003", customer: "Pedro Costa", amount: 699.00, status: "Paid", date: "2024-03-08" },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 sm:mb-2">Analytics</h1>
        <p className="text-muted-foreground/80 font-light text-sm sm:text-base">
          Overview of your store performance
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardHeader className="pb-1 sm:pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-light text-muted-foreground/60 uppercase tracking-wider">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-lg sm:text-2xl font-light mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-green-600 font-light">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="font-light text-base sm:text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-light text-muted-foreground/60 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-light">{order.id}</td>
                    <td className="py-4 px-4 text-muted-foreground/80 font-light">{order.customer}</td>
                    <td className="py-4 px-4 font-light">€{order.amount.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-light px-2 py-1 rounded-full bg-muted">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground/80 font-light text-sm">{order.date}</td>
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
