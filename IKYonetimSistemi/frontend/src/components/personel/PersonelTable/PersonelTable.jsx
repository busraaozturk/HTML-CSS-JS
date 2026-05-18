import Button from "../../common/Button/Button";
import { departmanData } from "../../../data/personeller";

function PersonelTable({
    personeller,
    onDelete,
    onEdit,
}) {
    const getDepartmanAdi = (departmanId) => {
        const departman = departmanData.find(d => d.id === departmanId);
        return departman ? departman.ad : "Bilinmiyor";
    };

    return (
        <table className="w-full border mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Ad</th>
                    <th className="p-2 border">Soyad</th>
                    <th className="p-2 border">E-mail</th>
                    <th className="p-2 border">Telefon</th>
                    <th className="p-2 border">Departman</th>
                    <th className="p-2 border">Oluşturma Tarihi</th>
                    <th className="p-2 border">İşlemler</th>
                </tr>
            </thead>

            <tbody>
                {personeller.map((p) => (
                <tr key={p.id} className="text-center">
                    <td className="border p-2">{p.id}</td>
                    <td className="border p-2">{p.ad}</td>
                    <td className="border p-2">{p.soyad}</td>
                    <td className="border p-2">{p.email}</td>
                    <td className="border p-2">{p.telefon}</td>
                    <td className="border p-2">{getDepartmanAdi(p.departmanId)}</td>
                    <td className="border p-2">{p.olusturmaTarihi}</td>
                    <td className="border p-2">
                    <div className="flex justify-center gap-2">
                        <Button
                        text="Düzenle"
                        onClick={() => onEdit(p.id)}
                        />

                        <Button
                        text="Sil"
                        onClick={() => onDelete(p.id)}
                        />
                    </div>
                    </td>
                </tr>
                ))} 
            </tbody>
        </table>
    );
}

export default PersonelTable;