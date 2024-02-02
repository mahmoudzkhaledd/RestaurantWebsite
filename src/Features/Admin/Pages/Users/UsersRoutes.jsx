import { Route, Routes } from "react-router-dom";
import UsersMainPage from "./pages/MainPage/view/MainPage";
import AdminUserPage from "./pages/UserPage/AdminUserPage";
import AdminOrdersPage from "../OrdersPage/Pages/MainPage/View/AdminOrdersPage";

export default function AdminUsersRouter() {
    return (
        <Routes>
            <Route path="/" element={<UsersMainPage />} />
            <Route path="/:id" element={<AdminUserPage />} />
            <Route path="/:userId/orders" element={<AdminOrdersPage />} />

        </Routes>
    ); 
}