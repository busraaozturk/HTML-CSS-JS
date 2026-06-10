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

export const validateDepartman = (data) => {
    const errors = [];

    // Ad doğrulaması
    if (!data.name || data.name.trim() === "") {
        errors.push("Departman adı alanı zorunludur.");
    }

    // Açıklama doğrulaması
    if (!data.description || data.description.trim() === "") {
        errors.push("Açıklama alanı zorunludur.");
    }

    return errors;
}

export const validateIzin = (data) => {
    const errors = [];

    // Personel doğrulaması
    if (!data.personelId) {
        errors.push("Personel alanı zorunludur.");
    }

    // Departman doğrulaması
    if (!data.departmanId) {
        errors.push("Departman alanı zorunludur.");
    }

    // Başlangıç tarihi doğrulaması
    if (!data.baslangicTarih || data.baslangicTarih.trim() === "") {
        errors.push("Başlangıç tarihi alanı zorunludur.");
    }

    // Bitiş tarihi doğrulaması
    if (!data.bitisTarih || data.bitisTarih.trim() === "") {
        errors.push("Bitiş tarihi alanı zorunludur.");
    }

    // Tarih sıralaması doğrulaması
    if (
        data.baslangicTarih &&
        data.bitisTarih &&
        new Date(data.bitisTarih) < new Date(data.baslangicTarih)
    ) {
        errors.push("Bitiş tarihi, başlangıç tarihinden önce olamaz.");
    }

    // İzin türü doğrulaması
    if (!data.izinTuruId) {
        errors.push("İzin türü alanı zorunludur.");
    }

    // Durum doğrulaması
    if (!data.durum || data.durum.trim() === "") {
        errors.push("Durum alanı zorunludur.");
    }

    return errors;
}

export const validateIzinTuru = (data) => {
    const errors = [];

    // Ad doğrulaması
    if (!data.name || data.name.trim() === "") {
        errors.push("İzin türü adı alanı zorunludur.");
    }

    return errors;
}
