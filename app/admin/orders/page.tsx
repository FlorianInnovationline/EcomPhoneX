import { requireAdmin } from "@/lib/auth-helpers"
import { getOrders } from "@/lib/data"
import { OrdersList } from "./orders-list"

export default async function AdminOrdersPage() {
  await requireAdmin()
  const orders = await getOrders()

  return <OrdersList orders={orders} />
}
