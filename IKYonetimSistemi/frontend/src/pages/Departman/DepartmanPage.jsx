
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { departmanData } from "../../data/personeller";
import DepartmanTable from "../../components/departman/DepartmanTable/DepartmanTable";
import Button from "../../components/common/Button/Button";

function DepartmanPage() {
  const navigate = useNavigate();
  const [departmanlar, setDepartmanlar] = useState(departmanData);

  const onDelete = (id) => {
    const yeniListe = departmanlar.filter((d) => d.id !== id);
    setDepartmanlar(yeniListe);
    const index = departmanData.findIndex((d) => d.id === id);
    if (index !== -1) {
      departmanData.splice(index, 1);
    }
  };

  const onEdit = (id) => {
    navigate(`/departman/duzenle/${id}`);
  };

  const handleCreate = () => {
    navigate("/departman/ekle");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Departmanlar</h1>
        <Button text="Yeni Departman Ekle" onClick={handleCreate} />
      </div>
      <DepartmanTable
        departmanlar={departmanlar}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default DepartmanPage;