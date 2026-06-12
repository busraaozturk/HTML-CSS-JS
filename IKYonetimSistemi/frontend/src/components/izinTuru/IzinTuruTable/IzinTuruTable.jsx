import IconButton from "../../common/IconButton/IconButton";

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
            <th className="px-4 py-3 font-semibold">İzin Türü</th>
            <th className="px-4 py-3 font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-accent/40">
          {izinTurleri.map((t) => (
            <tr key={t.id} className="transition hover:bg-background">
              <td className="px-4 py-3">{t.name}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <IconButton icon="ti-edit" label="Düzenle" onClick={() => onEdit(t.id)} />
                  <IconButton icon="ti-trash" variant="danger" label="Sil" onClick={() => handleDeleteClick(t.id)} />
                </div>
              </td>
            </tr>
          ))}

          {izinTurleri.length === 0 && (
            <tr>
              <td colSpan={2} className="px-4 py-6 text-center text-muted">
                İzin türü bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IzinTuruTable;
