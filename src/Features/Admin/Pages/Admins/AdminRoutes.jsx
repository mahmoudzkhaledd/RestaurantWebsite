import { Route, Routes } from "react-router-dom";
import AdminsMainPage from "./pages/MainPage/view/MainPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AddNewAdmin from "./pages/AddNewAdmin/view/AddNewAdmin";
import AdminOrdersPage from "./pages/AdminOrdersPage/View/AdminOrdersPage";

export default function AdminsRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminsMainPage />} />
            <Route path="/new-admin" element={<AddNewAdmin />} />
            <Route path="/:id" element={<AdminPage />} />
            <Route path="/:id/edit" element={<AddNewAdmin editMode={true} />} />
            <Route path="/:id/orders" element={<AdminOrdersPage />} />
        </Routes>
    );
}