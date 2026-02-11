"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { TrendingUp, ShoppingBag, Euro, Percent, ArrowUpRight, Package, Users } from "lucide-react"
import { motion } from "framer-motion"

// Mock data - will be replaced with real queries
const stats = [
  {
    key: "revenue",
    value: 45230,
    change: 20.1,
    icon: Euro,
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-600",
  },
  {
    key: "orders",
    value: 234,
    change: 12.5,
    icon: ShoppingBag,
    gradient: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600",
  },
  {
    key: "aov",
    value: 193,
    change: 5.2,
    icon: TrendingUp,
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-600",
  },
  {
    key: "margin",
    value: 35.2,
    change: 2.1,
    icon: Percent,
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-600",
  },
]

export default function AdminDashboard() {
  const t = useTranslations("admin.overview")

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-light tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground/70 font-light text-lg">
          Overview of your store performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const displayValue = stat.key === "margin" 
            ? `${stat.value}%` 
            : stat.key === "orders"
            ? stat.value
            : formatPrice(stat.value)
          
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-xs font-light text-muted-foreground/60 uppercase tracking-wider">
                    {t(stat.key)}
                  </CardTitle>
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-3xl font-light tracking-tight">{displayValue}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-light">+{stat.change}%</span>
                    <span className="text-muted-foreground/60 font-light">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-light tracking-tight">Recent Orders</CardTitle>
                <ShoppingBag className="h-5 w-5 text-muted-foreground/40" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-light text-sm">Order #{1000 + i}</p>
                        <p className="text-xs text-muted-foreground/60 font-light">2 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-light">{formatPrice(899 + i * 100)}</p>
                      <span className="text-xs text-emerald-600 font-light">Paid</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-border/50 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-light tracking-tight">Top Products</CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground/40" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Xiaomi 13 Pro", sales: 45, revenue: 40455 },
                  { name: "Xiaomi 13", sales: 32, revenue: 22368 },
                  { name: "Xiaomi 12T", sales: 28, revenue: 13972 },
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-light text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground/60 font-light">{product.sales} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-light">{formatPrice(product.revenue)}</p>
                      <span className="text-xs text-muted-foreground/60 font-light">Revenue</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
