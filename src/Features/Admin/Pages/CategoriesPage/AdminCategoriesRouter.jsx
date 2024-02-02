import { Route, Routes } from "react-router-dom";
import AdminCategoriesPage from "./Pages/MainPage/View/AdminCategoriesPage";
import AdminCategoryPage from "./Pages/CategoryPage/AdminCategoryPage";
import NewCategoryPage from "./Pages/NewCategoryPage/View/NewCategoryPage";


export default function AdminCategoriesRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminCategoriesPage />} />
            <Route path="/:id" element={<AdminCategoryPage />} />
            <Route path="/:id/edit" element={<NewCategoryPage editMode={true} />} />
            <Route path="/new-category" element={<NewCategoryPage />} />
        </Routes>
    );
}