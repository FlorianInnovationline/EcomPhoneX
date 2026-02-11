import { Section, SectionHeader } from "@/components/storefront/section"

export default function ReturnsPage() {
  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <SectionHeader 
            title="Returns & Exchanges" 
            subtitle="Hassle-free returns within 14 days"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-4">Return Policy</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                You have 14 days from the date of delivery to return your purchase for a full refund. 
                We want you to be completely satisfied with your purchase.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Conditions</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed mb-4">
                To be eligible for a return:
              </p>
              <ul className="space-y-2 text-muted-foreground/80 font-light list-disc list-inside">
                <li>Items must be in original, unused condition</li>
                <li>All original packaging and accessories must be included</li>
                <li>Original receipt or proof of purchase is required</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">How to Return</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                Please contact us at <a href="/contact" className="underline hover:text-foreground">support</a> to initiate a return. 
                We'll provide you with a return authorization and shipping instructions.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
