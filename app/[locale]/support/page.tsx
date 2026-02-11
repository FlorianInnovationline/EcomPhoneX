import { Section, SectionHeader } from "@/components/storefront/section"
import { SupportCards } from "@/components/storefront/support-cards"
import { getTranslations } from "next-intl/server"

export default async function SupportPage() {
  const t = await getTranslations("support")
  
  const supportCards = [
    {
      title: t("trackOrder"),
      description: t("trackOrderDesc"),
      href: "/track",
    },
    {
      title: t("shippingInfo"),
      description: t("shippingInfoDesc"),
      href: "/shipping",
    },
    {
      title: t("returnsExchanges"),
      description: t("returnsExchangesDesc"),
      href: "/returns",
    },
    {
      title: t("warrantyCoverage"),
      description: t("warrantyCoverageDesc"),
      href: "/warranty",
    },
    {
      title: t("contactUs"),
      description: t("contactUsDesc"),
      href: "/contact",
    },
    {
      title: t("faq"),
      description: t("faqDesc"),
      href: "/faq",
    },
  ]

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4">
          <SectionHeader 
            title={t("title")} 
            subtitle={t("subtitle")}
          />
        </div>
      </Section>

      <Section>
        <div className="container px-4">
          <SupportCards cards={supportCards} />
        </div>
      </Section>
    </div>
  )
}
