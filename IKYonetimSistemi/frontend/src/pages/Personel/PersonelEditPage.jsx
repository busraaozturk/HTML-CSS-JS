import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonelForm from "../../components/personel/PersonelForm/PersonelForm";
import { personelData } from "../../data/personeller";

function PersonelEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    departmanId: "",
    olusturmaTarihi: "",
  });

  useEffect(() => {
    const personel = personelData.find((p) => p.id === parseInt(id));
    if (personel) {
      setFormData({
        ad: personel.ad,
        soyad: personel.soyad,
        email: personel.email,
        telefon: personel.telefon,
        departmanId: personel.departmanId,
        olusturmaTarihi: personel.olusturmaTarihi,
      });
    }
  }, [id]);

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

    const personelIndex = personelData.findIndex((p) => p.id === parseInt(id));
    if (personelIndex !== -1) {
      personelData[personelIndex] = {
        id: parseInt(id),
        ...formData,
        departmanId: parseInt(formData.departmanId),
      };
      console.log("Personel Güncellendi:", personelData[personelIndex]);
      navigate("/personel");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Personel Düzenle
      </h1>

      <PersonelForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        buttonText="Güncelle"
      />
    </div>
  );
}

export default PersonelEditPage;