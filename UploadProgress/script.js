function upload(callback) {
    let current = 0;
    const total = 10;

    const interval = setInterval(() => {
        current++;

        // Random error simulation
        if (Math.random() < 0.1) {
            clearInterval(interval);
            callback('error');
            return;
        }

        callback(current, total);

        if (current === total) {
            clearInterval(interval);
        }
    }, 500);
}

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const resetBtn = document.getElementById("resetBtn");
const fileInput = document.getElementById("fileInput");
const fileInfoEl = document.getElementById("fileDetails");
const filePreviewImg = document.getElementById("filePreview");
const fileTypeIcon = document.getElementById("fileTypeIcon");
const dropZone = document.getElementById("dropZone");

let selectedFile = null;
let fileObjectURL = null;
let isUploading = false;    // Yükleme durumunu takip etmek için

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

const showFileInfo = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    fileInfoEl.innerHTML = `Ad: ${file.name}<br>Boyut: ${formatBytes(file.size)}<br>Uzantı: .${ext}`;

    // Temizle
    filePreviewImg.src = '';
    filePreviewImg.classList.add('hidden');
    fileTypeIcon.classList.add('hidden');

    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const docTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'];

    if (imageTypes.includes(ext)) {
        if (fileObjectURL) {
            URL.revokeObjectURL(fileObjectURL);
        }
        fileObjectURL = URL.createObjectURL(file);
        filePreviewImg.src = fileObjectURL;
        filePreviewImg.classList.remove('hidden');
        fileTypeIcon.classList.add('hidden');
    } else if (docTypes.includes(ext)) {
        filePreviewImg.classList.add('hidden');
        fileTypeIcon.classList.remove('hidden');

        const iconMap = {
            pdf: '📄',
            doc: '📝',
            docx: '📝',
            xls: '📊',
            xlsx: '📊',
            ppt: '📈',
            pptx: '📈',
            txt: '📃',
            rtf: '📄'
        };

        fileTypeIcon.innerText = iconMap[ext] || '📁';
    } else {
        filePreviewImg.classList.add('hidden');
        fileTypeIcon.classList.remove('hidden');
        fileTypeIcon.innerText = '📁';
    }
};

// Yüklemeyi başlatan yeni ana fonksiyon
const startUpload = () => {
    if (!selectedFile || isUploading) return;
    isUploading = true;

    // Yükleme sırasında sıfırla butonunu devre dışı bırak
    resetBtn.disabled = true; 

    // Barı başlangıç haline getir
    progressBar.className = 'h-5 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500';
    progressBar.style.width = '0%';
    progressText.innerText = 'Yükleniyor...';

    upload((current, total) => {
        if (current === 'error') {
            progressBar.style.width = "100%";
            progressBar.className = 'h-5 bg-red-500 transition-all duration-500';
            progressText.innerText = "Yükleme başarısız!";
            isUploading = false;
            return;
        }

        const percent = Math.floor((current / total) * 100);
        progressBar.style.width = percent + '%';
        progressText.innerText = '%' + percent;

        // Yüklenirken parlama efekti (glow)
        if(percent < 100) {
            progressBar.classList.add('glow');
        }

        // Başarı Durumu
        if(percent === 100) {
            progressBar.classList.remove('glow');
            progressText.innerText = "Yükleme tamamlandı! 🎉";
            isUploading = false;

            // Confetti Animasyonu
            confetti({
                particleCount: 200,
                spread: 100,
                startVelocity: 40,
                scalar: 1.2,
                origin: { y: 0.6 }
            });
        }
    });

};

fileInput.addEventListener("change", (e) => {
    selectedFile = e.target.files[0] || null;
    if (selectedFile) {
        showFileInfo(selectedFile);
        startUpload(); // Dosya seçildiğinde otomatik olarak yüklemeye başla
    } else {
        fileInfoEl.innerHTML = '';
    }
});

resetBtn.addEventListener("click", () => {
    progressBar.style.width = "0%";
    progressBar.className = 'h-5 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500';
    progressText.innerText = '%0';
    fileInfoEl.innerHTML = '';
    filePreviewImg.classList.add('hidden');
    fileTypeIcon.classList.add('hidden');
    fileInput.value = '';
    selectedFile = null;
    isUploading = false; // Yükleme durumunu sıfırla
    if (fileObjectURL) {
        URL.revokeObjectURL(fileObjectURL);
        fileObjectURL = null;
    }
});

// Drag & Drop + Click-to-select Effect
dropZone.addEventListener("click", () => {
    fileInput.click();
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("border-blue-400");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("border-blue-400");
});

// Sürükle bırak yapılınca otomatik başlar
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    dropZone.classList.remove("border-blue-400");

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
        selectedFile = droppedFile;
        showFileInfo(selectedFile);
        startUpload(); // Dosya bırakıldığında otomatik olarak yüklemeye başla
    }
});