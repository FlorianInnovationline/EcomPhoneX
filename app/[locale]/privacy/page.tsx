import { Section, SectionHeader } from "@/components/storefront/section"

export default function PrivacyPage() {
  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <SectionHeader 
            title="Privacy Policy" 
            subtitle="How we collect, use, and protect your information"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light mb-4">Information We Collect</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                We collect information that you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support. This includes your name, email address, shipping 
                address, and payment information.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                We use the information we collect to process your orders, communicate with you, and improve 
                our services. We do not sell your personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-4">Data Security</h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed">
                We implement appropriate security measures to protect your personal information. All payment 
                transactions are processed securely through encrypted connections.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
