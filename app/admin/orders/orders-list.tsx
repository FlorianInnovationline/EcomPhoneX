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
    <div className="space-y-6 sm:space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-1 sm:mb-2">Orders</h1>
        <p className="text-muted-foreground/70 font-light text-sm sm:text-lg">
          View and manage customer orders
        </p>
      </motion.div>

      <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-4 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-light tracking-tight">All Orders</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground/40 shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground/60 font-light text-sm sm:text-base">No orders yet</div>
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
                    className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className={`h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center`}>
                        <StatusIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${config.color}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5 sm:mb-1">
                          <h3 className="font-light text-sm sm:text-base">Order #{order.id.slice(-8)}</h3>
                          <Badge variant="outline" className={`${config.bg} ${config.border} ${config.color} border font-light text-xs px-2 py-0.5 shrink-0`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs sm:text-sm text-muted-foreground/70 font-light">
                          <span className="truncate">{order.email}</span>
                          <span className="text-muted-foreground/40 hidden sm:inline">•</span>
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right pl-[3.25rem] sm:pl-0 shrink-0">
                      <p className="font-light text-base sm:text-lg mb-0.5 sm:mb-1">{formatPrice(order.total)}</p>
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
