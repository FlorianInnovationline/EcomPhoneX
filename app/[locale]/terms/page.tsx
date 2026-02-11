import { Section, SectionHeader } from "@/components/storefront/section"

export default function TermsPage() {
  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <SectionHeader 
            title="Terms of Service" 
            subtitle="Terms and conditions for using our service"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and 
                provision of this agreement.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Product Information</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                We strive to provide accurate product information, but we do not warrant that product 
                descriptions or other content on this site is accurate, complete, or error-free.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Pricing</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                All prices are in EUR and are subject to change without notice. We reserve the right to 
                modify prices at any time.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                Our liability is limited to the maximum extent permitted by law. We are not liable for 
                any indirect, incidental, or consequential damages.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
