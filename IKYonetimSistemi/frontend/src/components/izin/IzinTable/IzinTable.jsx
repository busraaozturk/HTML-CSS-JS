import IconButton from "../../common/IconButton/IconButton";
import { getDurumBadgeClass } from "../../../utils/badge";
import { formatDate } from "../../../utils/format";

function IzinTable({ izinler, onEdit, onDelete, getPersonelAdi, getIzinTuruAdi }) {
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
            <th className="px-4 py-3 font-semibold">Personel Adı</th>
            <th className="px-4 py-3 font-semibold">Başlangıç</th>
            <th className="px-4 py-3 font-semibold">Bitiş</th>
            <th className="px-4 py-3 font-semibold">İzin Türü</th>
            <th className="px-4 py-3 font-semibold">Durum</th>
            <th className="px-4 py-3 font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-accent/40">
          {izinler.map((izin) => (
            <tr key={izin.id} className="transition hover:bg-background">
              <td className="px-4 py-3">{getPersonelAdi(izin.personelId)}</td>
              <td className="px-4 py-3">{formatDate(izin.baslangicTarih)}</td>
              <td className="px-4 py-3">{formatDate(izin.bitisTarih)}</td>
              <td className="px-4 py-3">{getIzinTuruAdi(izin.izinTuruId)}</td>
              <td className="px-4 py-3">
                <span className={`badge ${getDurumBadgeClass(izin.durum)}`}>{izin.durum}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <IconButton icon="ti-edit" label="Düzenle" onClick={() => onEdit(izin.id)} />
                  <IconButton icon="ti-trash" variant="danger" label="Sil" onClick={() => handleDeleteClick(izin.id)} />
                </div>
              </td>
            </tr>
          ))}

          {izinler.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-muted">
                İzin kaydı bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IzinTable;
