"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice, formatDate } from "@/lib/utils"
import { ShoppingBag, CheckCircle2, Clock, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/lib/types"

const statusConfig = {
  PAID: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  FULFILLED: { icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  PENDING: { icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  CANCELLED: { icon: XCircle, color: "text-red-600", bg: "bg-red-500/10", border: "border-red-500/20" },
  REFUNDED: { icon: XCircle, color: "text-gray-600", bg: "bg-gray-500/10", border: "border-gray-500/20" },
}

interface OrdersListProps {
  orders: Order[]
}

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-light tracking-tight mb-2">Orders</h1>
        <p className="text-muted-foreground/70 font-light text-lg">
          View and manage customer orders
        </p>
      </motion.div>

      <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-light tracking-tight">All Orders</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground/40" />
          </div>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground/60 font-light">No orders yet</div>
          ) : (
            <div className="space-y-3">
              {orders.map((order, index) => {
                const status = order.status as keyof typeof statusConfig
                const config = statusConfig[status] || statusConfig.PENDING
                const StatusIcon = config.icon

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group flex items-center justify-between p-5 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center`}>
                        <StatusIcon className={`h-6 w-6 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-light text-base">Order #{order.id.slice(-8)}</h3>
                          <Badge variant="outline" className={`${config.bg} ${config.border} ${config.color} border font-light text-xs px-2 py-0.5`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-muted-foreground/70 font-light">{order.email}</span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="text-muted-foreground/70 font-light">{formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-light text-lg mb-1">{formatPrice(order.total)}</p>
                      <p className="text-xs text-muted-foreground/60 font-light">{order.items.length} items</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
