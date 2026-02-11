"use client"

import { useState } from "react"
import { Section, SectionHeader } from "@/components/storefront/section"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [result, setResult] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tracking result
    setResult({
      status: "In Transit",
      estimatedDelivery: "2024-03-15",
      location: "Lisbon Distribution Center",
      carrier: "DHL Express",
    })
  }

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-2xl">
          <SectionHeader 
            title="Track Your Order" 
            subtitle="Enter your tracking number to see the status of your shipment"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="rounded-full"
              />
            </div>
            <Button type="submit" className="w-full rounded-full">
              Track Order
            </Button>
          </form>

          {result && (
            <div className="mt-12 p-8 rounded-2xl border border-border/50 bg-muted/30 space-y-6">
              <div>
                <div className="text-sm text-muted-foreground/60 mb-2">Status</div>
                <div className="text-xl font-light">{result.status}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground/60 mb-2">Estimated Delivery</div>
                <div className="text-lg font-light">{result.estimatedDelivery}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground/60 mb-2">Current Location</div>
                <div className="text-lg font-light">{result.location}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground/60 mb-2">Carrier</div>
                <div className="text-lg font-light">{result.carrier}</div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
