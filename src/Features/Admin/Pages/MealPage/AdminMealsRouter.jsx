import { Route, Routes } from "react-router-dom";
import MealsMainPage from "./pages/MainPage/view/MainPage";
import AddNewMeal from "./pages/AddMeal/View/AddNewMeal";
import MealPage from "./pages/MealPage/View/MealPage";
import AdminOrdersPage from "../OrdersPage/Pages/MainPage/View/AdminOrdersPage";


export default function AdminMealsRouter() {
    return (
        <Routes>
            <Route path="/" element={<MealsMainPage />} />
            <Route path="/new-meal" element={<AddNewMeal />} />
            <Route path="/:id" element={<MealPage />} />
            <Route path="/:mealId/orders" element={<AdminOrdersPage />} />
            <Route path="/:id/edit" element={<AddNewMeal editMode={true} />} />

        </Routes>
    );
}