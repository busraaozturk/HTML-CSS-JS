import {BrowserRouter, Routes, Route} from "react-router-dom";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PersonelPage from "../pages/Personel/PersonelPage";
import IzinPage from "../pages/Izin/IzinPage";
import DepartmanPage from "../pages/Departman/DepartmanPage";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/personel" element={<PersonelPage/>}/>
                <Route path="/izin" element={<IzinPage/>}/>
                <Route path="/departman" element={<DepartmanPage/>}/>  
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter; 