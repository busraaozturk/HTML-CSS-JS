import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { getDepartmanlar } from "../../../api/departmanApi";

function PersonelForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
}) {
    const navigate = useNavigate();
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

    return (
        <div className="card max-w-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label="Ad"
                    name="ad"
                    value={formData.ad}
                    onChange={onChange}
                    placeholder="Personelin adı"
                    className=""
                />

                <Input
                    label="Soyad"
                    name="soyad"
                    value={formData.soyad}
                    onChange={onChange}
                    placeholder="Personelin soyadı"
                    className=""
                />

                <Input
                    label="E-posta"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="ornek@sirket.com"
                    className=""
                />

                <Input
                    label="Telefon"
                    name="telefon"
                    value={formData.telefon}
                    onChange={onChange}
                    placeholder="0500 000 00 00"
                    className=""
                />

                <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="field-label">Departman</label>
                    <select
                        name="departmanId"
                        value={formData.departmanId}
                        onChange={onChange}
                        className="field-input"
                    >
                        <option value="">Departman seçin...</option>
                        {departmanlar.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <Input
                    label="Oluşturma Tarihi"
                    name="olusturmaTarihi"
                    type="date"
                    value={formData.olusturmaTarihi}
                    onChange={onChange}
                    className="sm:col-span-2"
                />
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-accent/60 pt-4">
                <Button text="İptal" variant="outline" onClick={() => navigate(-1)} />
                <Button text={buttonText} onClick={onSubmit} />
            </div>
        </div>
    );
}

export default PersonelForm;
