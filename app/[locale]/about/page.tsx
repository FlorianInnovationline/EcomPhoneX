import { Section, SectionHeader } from "@/components/storefront/section"

export default function AboutPage() {
  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl">
          <SectionHeader 
            title="About Us" 
            subtitle="Premium smartphones, delivered with care"
            align="left"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="space-y-6 text-muted-foreground/80 font-light leading-relaxed">
              <p className="text-lg">
                We are dedicated to bringing you the finest selection of premium smartphones, 
                starting with Xiaomi's flagship devices. Our mission is to provide exceptional 
                service, genuine products, and a seamless shopping experience.
              </p>
              <p>
                Every device we offer comes with official manufacturer warranty, ensuring 
                peace of mind with your purchase. We believe in transparency, quality, 
                and customer satisfaction above all else.
              </p>
              <p>
                Based in Portugal, we're expanding across the EU to make premium technology 
                accessible to everyone. Our team is passionate about technology and committed 
                to helping you find the perfect device for your needs.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
