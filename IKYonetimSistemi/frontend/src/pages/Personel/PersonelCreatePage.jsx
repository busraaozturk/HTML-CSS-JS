import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonelForm from "../../components/personel/PersonelForm/PersonelForm";
import { createPersonel } from "../../api/personelApi";

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

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    if (
      !formData.ad ||
      !formData.soyad ||
      !formData.email ||
      !formData.telefon ||
      !formData.departmanId ||
      !formData.olusturmaTarihi
    ) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    try {
      setLoading(true);

      await createPersonel({
        ...formData,
        departmanId: Number(formData.departmanId),
      });

      alert("Personel başarıyla eklendi.");

      navigate("/personel");
    } catch (error) {
      console.error(error);
      alert("Personel eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
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
        buttonText={
          loading
            ? "Kaydediliyor..."
            : "Personel Ekle"
        }
      />
    </div>
  );
}

export default PersonelCreatePage;