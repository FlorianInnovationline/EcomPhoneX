import { Section, SectionHeader } from "@/components/storefront/section"

export default function ShippingPage() {
  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <SectionHeader 
            title="Shipping Information" 
            subtitle="Fast and reliable delivery across Portugal"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-4">Free Shipping</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                We offer free shipping across Portugal. All orders are carefully packaged 
                and insured for your peace of mind.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Delivery Times</h2>
              <div className="space-y-3 text-muted-foreground/80 font-light">
                <p><strong className="text-foreground">Standard delivery:</strong> 2-3 business days</p>
                <p><strong className="text-foreground">Express delivery:</strong> 1 business day (available at checkout)</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Tracking</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                Once your order ships, you'll receive a tracking number via email. 
                You can track your shipment on our <a href="/track" className="underline hover:text-foreground">Track Order</a> page.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
