import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. We've sent a confirmation email to your inbox.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <p className="text-sm text-muted-foreground">
              Your order is being processed and will be shipped within 2-3 business days.
            </p>
            <p className="text-sm text-muted-foreground">
              You'll receive a tracking number via email once your order ships.
            </p>
          </CardContent>
        </Card>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
