import Button from "../../common/Button/Button";

function IzinTuruTable({ izinTurleri, onDelete, onEdit }) {
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Bu izin türünü silmek istediğinize emin misiniz?"
    );

    if (!confirmDelete) return;

    onDelete(id);
  };

  return (
    <div className="table-card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-accent/40 text-title">
            <th className="px-4 py-3 font-semibold">ID</th>
            <th className="px-4 py-3 font-semibold">Ad</th>
            <th className="px-4 py-3 font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-accent/40">
          {izinTurleri.map((t) => (
            <tr key={t.id} className="transition hover:bg-background">
              <td className="px-4 py-3">{t.id}</td>
              <td className="px-4 py-3">{t.name}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button text="Düzenle" onClick={() => onEdit(t.id)} />
                  <Button text="Sil" variant="outline" onClick={() => handleDeleteClick(t.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IzinTuruTable;
