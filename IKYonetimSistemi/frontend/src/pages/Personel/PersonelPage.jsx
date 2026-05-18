import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { personelData } from "../../data/personeller";
import PersonelTable from "../../components/personel/PersonelTable/PersonelTable";

function PersonelPage() {
  const navigate = useNavigate();
  const [personeller, setPersoneller] = useState(personelData);

  const onDelete = (id) => {
    const yeniListe = personeller.filter((p) => p.id !== id);
    setPersoneller(yeniListe);
    const index = personelData.findIndex((p) => p.id === id);
    if (index !== -1) {
      personelData.splice(index, 1);
    }
  }; 

  const onEdit = (id) => {
    navigate(`/personel/duzenle/${id}`);
  };

  const handleCreate = () => {
    navigate("/personel/ekle");
  };
  
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