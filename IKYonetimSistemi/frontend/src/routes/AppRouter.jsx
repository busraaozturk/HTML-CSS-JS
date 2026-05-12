import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PersonelPage from "../pages/Personel/PersonelPage";
import IzinPage from "../pages/Izin/IzinPage";
import DepartmanPage from "../pages/Departman/DepartmanPage";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="personel" element={<PersonelPage />} />
                    <Route path="izin" element={<IzinPage />} />
                    <Route path="departman" element={<DepartmanPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter; 