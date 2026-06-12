import IconButton from "../../common/IconButton/IconButton";

function DepartmanTable({ departmanlar, onDelete, onEdit }) {
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Bu departmanı silmek istediğinize emin misiniz?"
    );

    if (!confirmDelete) return;

    onDelete(id);
  };

  return (
    <div className="table-card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-accent/40 text-title">
            <th className="px-4 py-3 font-semibold">Departman</th>
            <th className="px-4 py-3 font-semibold">Açıklama</th>
            <th className="px-4 py-3 font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-accent/40">
          {departmanlar.map((d) => (
            <tr key={d.id} className="transition hover:bg-background">
              <td className="px-4 py-3">{d.name}</td>
              <td className="px-4 py-3">{d.description}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <IconButton icon="ti-edit" label="Düzenle" onClick={() => onEdit(d.id)} />
                  <IconButton icon="ti-trash" variant="danger" label="Sil" onClick={() => handleDeleteClick(d.id)} />
                </div>
              </td>
            </tr>
          ))}

          {departmanlar.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-muted">
                Departman bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmanTable;
