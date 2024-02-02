import { Route, Routes } from "react-router-dom";
import AdminOrdersPage from "./Pages/MainPage/View/AdminOrdersPage";
import AdminOrderPage from "./Pages/OrderPage/AdminOrderPage";
import { createContext } from "react";
import OrderContextProvider from "./Pages/OrderPage/OrderContext/OrderContext";
const ctx = createContext();
export default function AdminOrdersRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminOrdersPage />} />
            <Route path="/:id" element={<OrderContextProvider><AdminOrderPage /></OrderContextProvider>} />
        </Routes>
    );
}