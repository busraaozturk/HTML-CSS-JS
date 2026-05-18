import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonelForm from "../../components/personel/PersonelForm/PersonelForm";
import { personelData } from "../../data/personeller";

function PersonelCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    departmanId: "",
    olusturmaTarihi: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (!formData.ad || !formData.soyad || !formData.email || !formData.telefon || !formData.departmanId || !formData.olusturmaTarihi) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    const yeniPersonel = {
      id: Math.max(...personelData.map(p => p.id), 0) + 1,
      ...formData,
      departmanId: parseInt(formData.departmanId),
    };

    personelData.push(yeniPersonel);
    console.log("Yeni Personel Eklendi:", yeniPersonel);

    setFormData({
      ad: "",
      soyad: "",
      email: "",
      telefon: "",
      departmanId: "",
      olusturmaTarihi: "",
    });

    navigate("/personel");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Yeni Personel
      </h1>
      <PersonelForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        buttonText="Personel Ekle"
      />
    </div>
  );
}

export default PersonelCreatePage;