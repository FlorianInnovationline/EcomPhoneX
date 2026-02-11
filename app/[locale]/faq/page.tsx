import { Section, SectionHeader } from "@/components/storefront/section"

export default function FAQPage() {
  const faqs = [
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within Portugal. We're expanding to other EU countries soon.",
    },
    {
      question: "What is your return policy?",
      answer: "You can return any product within 14 days of delivery for a full refund, provided it's in original condition.",
    },
    {
      question: "Do products come with warranty?",
      answer: "Yes, all products come with official manufacturer warranty. Most devices have a 2-year warranty.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping within Portugal takes 2-3 business days. Express shipping is available for next-day delivery.",
    },
    {
      question: "Are the products genuine?",
      answer: "Absolutely. We only sell genuine, brand-new products directly from authorized distributors.",
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a tracking number via email. You can track it on our Track Order page.",
    },
  ]

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4 max-w-3xl">
          <SectionHeader 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions"
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4 max-w-3xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border/50 bg-muted/30 space-y-3"
              >
                <h3 className="text-lg font-light">{faq.question}</h3>
                <p className="text-muted-foreground/80 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
