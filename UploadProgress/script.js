function upload(file, callback) {
    let current = 0;
    const total = Math.max(file?.size || 0, 1);

    // Yaklasik 5 sn surede tamamlama hedefi (dosya boyutuna gore byte bazli ilerleme)
    const tickMs = 100;
    const targetDurationMs = 5000;
    const steps = Math.max(Math.ceil(targetDurationMs / tickMs), 1);
    const chunkSize = Math.max(Math.ceil(total / steps), 1);

    // Eski davranistaki gibi hata simulasyonunu koru (upload basina %10)
    const shouldFail = Math.random() < 0.1;
    const failAt = shouldFail ? Math.max(Math.floor(total * (0.2 + Math.random() * 0.6)), 1) : -1;

    const interval = setInterval(() => {
        current = Math.min(current + chunkSize, total);

        if (shouldFail && current >= failAt) {
            clearInterval(interval);
            callback('error');
            return;
        }

        callback(current, total);

        if (current >= total) {
            clearInterval(interval);
        }
    }, tickMs);
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
let selectedFiles = [];
let fileObjectURL = null;
let isUploading = false;    // Yukleme durumunu takip etmek icin

const setUploadingState = (isLoading) => {
    isUploading = isLoading;
    resetBtn.disabled = isLoading;
};

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

const showFileInfo = (file, allFiles = [file]) => {
    const totalBytes = allFiles.reduce((sum, f) => sum + (f?.size || 0), 0);
    const ext = file.name.split('.').pop().toLowerCase();
    fileInfoEl.innerHTML = `Dosya: ${allFiles.length}<br>Toplam Boyut: ${formatBytes(totalBytes)}<br>Ilk Dosya: ${file.name} (.${ext})`;

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

// Yuklemeyi baslatan ana fonksiyon
const startUpload = () => {
    if (!selectedFiles.length || isUploading) return;
    isUploading = true;

    // Yukleme sirasinda sifirla butonunu devre disi birak
    setUploadingState(true);

    // Bari baslangic haline getir
    progressBar.className = 'h-5 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500';
    progressBar.style.width = '0%';
    progressText.innerText = 'Yukleniyor...';

    const totalBytes = Math.max(selectedFiles.reduce((sum, file) => sum + (file?.size || 0), 0), 1);
    let uploadedBytes = 0;
    let fileIndex = 0;

    const updateOverallProgress = (currentFileBytes) => {
        const loaded = Math.min(uploadedBytes + currentFileBytes, totalBytes);
        const percent = Math.min(100, Math.floor((loaded / totalBytes) * 100));
        progressBar.style.width = percent + '%';
        progressText.innerText = '%' + percent;

        // Yuklenirken parlama efekti
        if (percent < 100) {
            progressBar.classList.add('glow');
        }

        if (percent === 100) {
            progressBar.classList.remove('glow');
            progressText.innerText = "Yukleme tamamlandi! 🎉";
            isUploading = false;
            setUploadingState(false);

            confetti({
                particleCount: 200,
                spread: 100,
                startVelocity: 40,
                scalar: 1.2,
                origin: { y: 0.6 }
            });
        }
    };

    const uploadNextFile = () => {
        if (fileIndex >= selectedFiles.length) {
            updateOverallProgress(totalBytes);
            return;
        }

        const file = selectedFiles[fileIndex];
        upload(file, (current, total) => {
            if (current === 'error') {
                progressBar.style.width = "100%";
                progressBar.className = 'h-5 bg-red-500 transition-all duration-500';
                progressText.innerText = "Yukleme basarisiz!";
                isUploading = false;
                setUploadingState(false);
                return;
            }

            updateOverallProgress(current);

            if (current >= total) {
                uploadedBytes += total;
                fileIndex += 1;
                uploadNextFile();
            }
        });
    };

    uploadNextFile();
};

fileInput.addEventListener("change", (e) => {
    selectedFiles = Array.from(e.target.files || []);
    selectedFile = selectedFiles[0] || null;

    if (selectedFile) {
        showFileInfo(selectedFile, selectedFiles);
        startUpload(); // Dosya secildiginde otomatik olarak yuklemeye basla
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
    selectedFiles = [];
    isUploading = false;

    if (fileObjectURL) {
        URL.revokeObjectURL(fileObjectURL);
        fileObjectURL = null;
    }
});

// Drag & Drop + Click-to-select
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

// Surukle birak yapilinca otomatik baslar
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("border-blue-400");

    selectedFiles = Array.from(e.dataTransfer.files || []);
    selectedFile = selectedFiles[0] || null;

    if (selectedFile) {
        showFileInfo(selectedFile, selectedFiles);
        startUpload(); // Dosya birakildiginda otomatik olarak yuklemeye basla
    }
});
