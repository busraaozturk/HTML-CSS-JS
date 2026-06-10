import { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { getDepartmanlar } from "../../../api/departmanApi";

function PersonelForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
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

    return (
        <div className="card max-w-md p-6 sm:p-8">
            <Input
                label="Ad"
                name="ad"
                value={formData.ad}
                onChange={onChange}
                placeholder="Ad giriniz"
            />

            <Input
                label="Soyad"
                name="soyad"
                value={formData.soyad}
                onChange={onChange}
                placeholder="Soyad giriniz"
            />

            <Input
                label="E-mail"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="E-mail giriniz"
            />

            <Input
                label="Telefon"
                name="telefon"
                value={formData.telefon}
                onChange={onChange}
                placeholder="Telefon giriniz"
            />

            <div className="flex flex-col gap-1 mb-4">
                <label className="field-label">Departman</label>
                <select
                    name="departmanId"
                    value={formData.departmanId}
                    onChange={onChange}
                    className="field-input"
                >
                    <option value="">Departman Seçiniz</option>
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
                placeholder="Oluşturma tarihi giriniz"
            />

            <Button text={buttonText} onClick={onSubmit} className="mt-2" />
        </div>
    );
}

export default PersonelForm;