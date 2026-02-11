// Brand configuration - replace as needed
export const config = {
  brand: {
    name: "Xeno Mobile",
    shortName: "Xeno",
  },
  currency: {
    code: "EUR",
    symbol: "€",
    locale: "pt-PT", // Will be overridden by user locale
  },
  shipping: {
    defaultZone: "PT",
    zones: ["PT"], // Expand to EU later
  },
  features: {
    multiCurrency: false, // v2
    multiCountry: false, // v2
  },
} as const
