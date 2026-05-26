import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PersonelPage from "../pages/Personel/PersonelPage";
import IzinPage from "../pages/Izin/IzinPage";
import DepartmanPage from "../pages/Departman/DepartmanPage";
import DepartmanCreatePage from "../pages/Departman/DepartmanCreatePage";
import DepartmanEditPage from "../pages/Departman/DepartmanEditPage";
import PersonelCreatePage from "../pages/Personel/PersonelCreatePage";
import PersonelEditPage from "../pages/Personel/PersonelEditPage";
import IzinCreatePage from "../pages/Izin/IzinCreatePage";
import IzinEditPage from "../pages/Izin/IzinEditPage";
function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="personel" element={<PersonelPage />} />
                    <Route path="personel/ekle" element={<PersonelCreatePage />} />
                    <Route path="personel/duzenle/:id" element={<PersonelEditPage />} />
                    <Route path="izin" element={<IzinPage />} />
                    <Route path="izin/ekle" element={<IzinCreatePage />} />
                    <Route path="izin/duzenle/:id" element={<IzinEditPage />} />
                    <Route path="departman" element={<DepartmanPage />} />
                    <Route path="departman/ekle" element={<DepartmanCreatePage />} />
                    <Route path="departman/duzenle/:id" element={<DepartmanEditPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;