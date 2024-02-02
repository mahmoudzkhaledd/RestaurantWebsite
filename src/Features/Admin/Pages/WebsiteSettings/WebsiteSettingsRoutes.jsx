import { Route, Routes } from "react-router-dom";
import WebsiteSettingsMainPage from "./pages/MainPage/MainPage";

export default function WebsiteSettingsRouter() {
    return (
        <Routes>
            <Route path="/" element={<WebsiteSettingsMainPage />} />
        </Routes>
    );
}