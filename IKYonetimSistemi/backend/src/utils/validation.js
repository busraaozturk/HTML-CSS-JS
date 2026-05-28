export const validatePersonel = (data) => {
    const errors = [];

    // Ad doğrulaması
    if (!data.ad || data.ad.trim() === "") {
        errors.push("Ad alanı zorunludur.");
    }

    // Soyad doğrulaması
    if (!data.soyad || data.soyad.trim() === "") {
        errors.push("Soyad alanı zorunludur.");
    }

    // E-posta doğrulaması
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push("Geçerli bir e-posta adresi giriniz.");
    }

    // Telefon doğrulaması (opsiyonel)
    if (data.telefon && !/^\d{10}$/.test(data.telefon)) {
        errors.push("Telefon numarası 10 haneli olmalıdır.");
    }

    return errors;
}
