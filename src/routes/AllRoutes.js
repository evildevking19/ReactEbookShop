import { Routes, Route } from "react-router-dom"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { HomePage, ProductsList, ProductDetailPage, LoginPage, RegisterPage, CartPage, DashbaordPage, OrderPage, PageNotFound } from "../pages"

export const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProtectedRoutes><ProductsList /></ProtectedRoutes>} />
            <Route path="/products/:id" element={<ProtectedRoutes><ProductDetailPage /></ProtectedRoutes>} />
            <Route path="/cart" element={<ProtectedRoutes><CartPage /></ProtectedRoutes>} />
            <Route path="/order-summary" element={<ProtectedRoutes><OrderPage /></ProtectedRoutes>} />
            <Route path="/dashboard" element={<ProtectedRoutes><DashbaordPage /></ProtectedRoutes>} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  )
}
