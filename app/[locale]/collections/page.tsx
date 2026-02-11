import { getCollections, getProducts } from "@/lib/data"
import { Section, SectionHeader } from "@/components/storefront/section"
import { ProductTile } from "@/components/storefront/product-tile"
import { CollectionCard } from "./collection-card"
import { getTranslations } from "next-intl/server"

export default async function CollectionsPage() {
  const t = await getTranslations("collections")
  const collections = await getCollections()

  // Fetch products for each collection
  const collectionsWithProducts = await Promise.all(
    collections.map(async (collection) => {
      const products = await getProducts({ collectionId: collection.id, active: true })
      return { collection, products }
    })
  )

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
          <div className="grid gap-12 md:gap-16">
            {collectionsWithProducts.map(({ collection, products }, index) => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                products={products}
                index={index} 
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
