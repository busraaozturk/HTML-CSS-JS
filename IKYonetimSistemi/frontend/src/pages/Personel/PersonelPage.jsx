import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";

function PersonelPage() {
  // Sayfa Yönlendirme İçin
  const navigate = useNavigate();

  //personeller = tablo verisi
  //state = database gibi davranıyor, değişiklikleri takip ediyoruz
  const [personeller, setPersoneller] = useState([
    { id: 1, ad: "Ahmet", soyad: "Yılmaz" },
    { id: 2, ad: "Ayşe", soyad: "Demir" },
    { id: 3, ad: "Mehmet", soyad: "Kara" },
  ]);

  // Personel Silme İşlemi
  const handleDelete = (id) => {
    const yeniListe = personeller.filter(
      (p) => p.id !== id
    );
    setPersoneller(yeniListe);
  }; 

  // Personel Düzenleme İşlemi
  const handleEdit = (id) => {
    navigate(`/personel/duzenle/${id}`);
  };

  // Personel Ekleme Sayfasına Git
  const handleCreate = () => {
    navigate("/personel/ekle");
  };
  
  return (
    <div className="p-6">
      {/* Sayfa Üst Alan */}
      <div className="text-2xl font-bold">
        <h1 className="text-xl font-bold mb-4">Personel Listesi</h1>

        <Button text="Yeni Personel Ekle" onClick={handleCreate} />
      </div>

      {/* Tablo */}
      <table className="w-full border">
        {/* Tablo Başlık */}
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ad</th>
            <th className="p-2 border">Soyad</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>

        {/* Tablo İçerik */}
        <tbody>
          {personeller.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.ad}</td>
              <td className="border p-2">{p.soyad}</td>
              <td className="border p-2">
                <Button text="Düzenle" onClick={() => handleEdit(p.id)}></Button>
                <Button text="Sil" onClick={() => handleDelete(p.id)}></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonelPage;