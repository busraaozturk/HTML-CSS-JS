import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { getPersonel, deletePersonel } from "../../api/personelApi";
import PersonelTable from "../../components/personel/PersonelTable/PersonelTable";

function PersonelPage() {
  const navigate = useNavigate();
  const [personeller, setPersoneller] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET Personeller

  const fetchPersoneller = async () => {
    try {
      setLoading(true);
      const data = await getPersonel();
      setPersoneller(data);
    } catch (error) {
      console.error("Personelleri getirirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersoneller();
  }, []);

  // DELETE Personel
  const onDelete = async (id) => {
    try {
      await deletePersonel(id);
      // UI güncellemesi
      setPersoneller((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Personel silinirken hata oluştu:", error);
    }
  };

  // Edit işlemi
  const onEdit = (id) => {
    navigate(`/personel/duzenle/${id}`);
  };

  // Create işlemi
  const handleCreate = () => {
    navigate("/personel/ekle");
  };

  // UI
  if (loading) {
    return (
      <div className="p-6">
        Yükleniyor...
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Personel Listesi</h1>
        <Button text="Yeni Personel Ekle" onClick={handleCreate} />
      </div>

      <PersonelTable
        personeller={personeller}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default PersonelPage;