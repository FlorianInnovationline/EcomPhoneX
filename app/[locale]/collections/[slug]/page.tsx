import { getCollectionBySlug, getProducts } from "@/lib/data"
import { notFound } from "next/navigation"
import { Section, SectionHeader } from "@/components/storefront/section"
import { ProductTile } from "@/components/storefront/product-tile"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTranslations("collections")
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProducts({ collectionId: collection.id })

  return (
    <div>
      <Section className="pt-24 pb-16">
        <div className="container px-4">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 mb-12 flex items-center justify-center p-8 sm:p-12">
            <Image
              src={collection.imageUrl || '/images/placeholders/phone1.png'}
              alt={collection.name}
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4">
                {collection.name}
              </h1>
              {collection.description && (
                <p className="text-lg text-muted-foreground/80 font-light max-w-2xl">
                  {collection.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container px-4">
          {products.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground/80 text-lg font-light">
                {t("noProducts")}
              </p>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
