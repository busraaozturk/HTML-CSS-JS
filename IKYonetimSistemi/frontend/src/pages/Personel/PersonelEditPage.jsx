import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonelForm from "../../components/personel/PersonelForm/PersonelForm";
import {getPersonelById, updatePersonel} from "../../api/personelApi";

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

  const [loading, setLoading] = useState(true);

  // Get Personel by ID (API)
  useEffect(() => {
    const fetchPersonel = async () => {
      try {
        setLoading(true);

        const personel = await getPersonelById(parseInt(id));

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
      } catch (error) {
        console.error("Personel bilgisi getirilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonel();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // update işlemi (API)
  const onSubmit = async () => {
    if (!formData.ad || !formData.soyad || !formData.email || !formData.telefon || !formData.departmanId || !formData.olusturmaTarihi) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    try {
      await updatePersonel(id,{
        ...formData,
        departmanId: Number(formData.departmanId),
      });

      console.log("Personel güncellendi:", formData);

      navigate("/personel");

    } catch (error) {
      console.error("Personel güncellenirken hata oluştu:", error);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted">Personel bilgileri yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-title">
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