const departmanBadgePalette = ["badge-green", "badge-blue", "badge-purple", "badge-yellow", "badge-red"];

export function getDepartmanBadgeClass(departmanId) {
  if (departmanId === undefined || departmanId === null || departmanId === "") {
    return "badge-green";
  }

  const index = Number(departmanId) % departmanBadgePalette.length;
  return departmanBadgePalette[Math.abs(index)];
}

export function getDurumBadgeClass(durum) {
  switch (durum) {
    case "Onaylandı":
      return "badge-green";
    case "Reddedildi":
      return "badge-red";
    default:
      return "badge-yellow";
  }
}
