import { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import { getDepartmanlar } from "../../../api/departmanApi";

function PersonelTable({
    personeller,
    onDelete,
    onEdit,
}) {
    const [departmanlar, setDepartmanlar] = useState([]);

    useEffect(() => {
        const fetchDepartmanlar = async () => {
            try {
                const data = await getDepartmanlar();
                setDepartmanlar(data);
            } catch (error) {
                console.error("Departmanlar getirilirken hata oluştu:", error);
            }
        };

        fetchDepartmanlar();
    }, []);

    const getDepartmanAdi = (departmanId) => {
        const departman = departmanlar.find(d => d.id == departmanId);
        return departman ? departman.name : "Bilinmiyor";
    };

    const handleDeleteClick = (id) => {
        // 1. kullanıcı onayı (gerçekçi sistem davranışı)
        const confirmDelete = window.confirm(
            "Bu personeli silmek istediğinize emin misiniz?"
        );

        if (!confirmDelete) return;

        // 2. parent'a bildir (API çağrısı orada yapılacak)
        onDelete(id);
    };

    return (
        <div className="table-card overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-accent/40 text-title">
                        <th className="px-4 py-3 font-semibold">ID</th>
                        <th className="px-4 py-3 font-semibold">Ad</th>
                        <th className="px-4 py-3 font-semibold">Soyad</th>
                        <th className="px-4 py-3 font-semibold">E-mail</th>
                        <th className="px-4 py-3 font-semibold">Telefon</th>
                        <th className="px-4 py-3 font-semibold">Departman</th>
                        <th className="px-4 py-3 font-semibold">Oluşturma Tarihi</th>
                        <th className="px-4 py-3 font-semibold">İşlemler</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-accent/40">
                    {personeller.map((p) => (
                        <tr key={p.id} className="transition hover:bg-background">
                            <td className="px-4 py-3">{p.id}</td>
                            <td className="px-4 py-3">{p.ad}</td>
                            <td className="px-4 py-3">{p.soyad}</td>
                            <td className="px-4 py-3">{p.email}</td>
                            <td className="px-4 py-3">{p.telefon}</td>
                            <td className="px-4 py-3">
                                {getDepartmanAdi(p.departmanId)}
                            </td>
                            <td className="px-4 py-3">
                                {p.olusturmaTarihi}
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex gap-2">

                                    <Button
                                        text="Düzenle"
                                        onClick={() => onEdit(p.id)}
                                    />

                                    <Button
                                        text="Sil"
                                        variant="outline"
                                        onClick={() => handleDeleteClick(p.id)}
                                    />

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonelTable;