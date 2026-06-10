import Button from "../../common/Button/Button";

function IzinTable({ izinler, onEdit, onDelete, getPersonelAdi, getDepartmanAdi, getIzinTuruAdi }) {
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Bu izni silmek istediğinize emin misiniz?"
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
            <th className="px-4 py-3 font-semibold">Personel</th>
            <th className="px-4 py-3 font-semibold">Departman</th>
            <th className="px-4 py-3 font-semibold">Başlangıç Tarihi</th>
            <th className="px-4 py-3 font-semibold">Bitiş Tarihi</th>
            <th className="px-4 py-3 font-semibold">İzin Türü</th>
            <th className="px-4 py-3 font-semibold">Durum</th>
            <th className="px-4 py-3 font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-accent/40">
          {izinler.map((izin) => (
            <tr key={izin.id} className="transition hover:bg-background">
              <td className="px-4 py-3">{izin.id}</td>
              <td className="px-4 py-3">{getPersonelAdi(izin.personelId)}</td>
              <td className="px-4 py-3">{getDepartmanAdi(izin.departmanId)}</td>
              <td className="px-4 py-3">{izin.baslangicTarih}</td>
              <td className="px-4 py-3">{izin.bitisTarih}</td>
              <td className="px-4 py-3">{getIzinTuruAdi(izin.izinTuruId)}</td>
              <td className="px-4 py-3">{izin.durum}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button text="Düzenle" onClick={() => onEdit(izin.id)} />
                  <Button text="Sil" variant="outline" onClick={() => handleDeleteClick(izin.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IzinTable;
