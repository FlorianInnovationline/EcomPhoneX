"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store/cart-store"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
  const t = useTranslations("cart")
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Portugal",
  })

  const subtotal = getTotal()
  const shipping = 0
  const tax = subtotal * 0.23
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement Stripe checkout when backend is added
    // For now, just redirect to success page
    const locale = window.location.pathname.split('/')[1] || 'en'
    window.location.href = `/${locale}/order/success`
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.productName} x{item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("shipping")}</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("tax")}</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>{t("total")}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Complete Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
