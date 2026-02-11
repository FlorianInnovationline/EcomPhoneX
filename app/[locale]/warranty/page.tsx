import { Section, SectionHeader } from "@/components/storefront/section"

export default function WarrantyPage() {
  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <SectionHeader 
            title="Warranty Information" 
            subtitle="Comprehensive coverage for your peace of mind"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-4">Official Warranty</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                All products come with official manufacturer warranty. Most devices include a 2-year 
                warranty covering manufacturing defects and hardware issues.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">What's Covered</h2>
              <ul className="space-y-2 text-muted-foreground/80 font-light list-disc list-inside">
                <li>Manufacturing defects</li>
                <li>Hardware malfunctions</li>
                <li>Battery issues (within warranty period)</li>
                <li>Display defects</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Warranty Claims</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                To make a warranty claim, please contact us with your order number and a description 
                of the issue. We'll guide you through the process and arrange for repair or replacement.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
