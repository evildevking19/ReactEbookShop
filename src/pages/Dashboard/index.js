import { useEffect, useState } from "react"
import { useTitle } from "../../hooks/useTitle"
import { DashboardEmpty } from "./components/DashboardEmpty"
import { DashboardCard } from "./components/DashboardCard"
import { getUserOrders } from "../../services"
import { toast } from "react-toastify"

export const DashbaordPage = () => {
  const [orders, setOrders] = useState([])
  useTitle("Dashboard")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getUserOrders()      
        setOrders(result)
      } catch(e) {
        toast.error(e.message, { closeButton: true, position: "bottom-center" })
      }
    }
    fetchOrders()
  }, [])

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
      </section>
      <section>
        {orders.length && orders.map(order =>
          <DashboardCard key={order.id} order={order} />
        )}
      </section>
      <section>
        {!orders.length && <DashboardEmpty />}
      </section>
    </main>
  )
}  