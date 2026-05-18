import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { departmanData } from "../../../data/personeller";

function PersonelForm({
    formData,
    onChange,
    onSubmit,
    buttonText = "Kaydet",
}) {
    return (
        <div className="max-w-md">
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

            <div className="flex flex-col gap-1 mb-3">
                <label className="text-sm text-gray-600">Departman</label>
                <select
                    name="departmanId"
                    value={formData.departmanId}
                    onChange={onChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Departman Seçiniz</option>
                    {departmanData.map(d => (
                        <option key={d.id} value={d.id}>{d.ad}</option>
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

            <Button text={buttonText} onClick={onSubmit} />
        </div>
    );
}

export default PersonelForm;