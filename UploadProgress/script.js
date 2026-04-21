// Dosya yükleme simülasyonu için gerçekçi bir hız ve hata senaryosu ekleyelim
function upload(file, callback) {
    let current = 0;
    const total = Math.max(file?.size || 0, 1);

    // Gerçekçi yükleme hızı simülasyonu: 10MB/s
    const UPLOAD_SPEED_MBPS = 10;
    const UPLOAD_SPEED_BPS = UPLOAD_SPEED_MBPS * 1024 * 1024; // bytes/s cinsinden
    const targetDurationMs = (total / UPLOAD_SPEED_BPS) * 1000; // Dosya boyutuna göre süre hesapla
    
    const tickMs = 100;
    const steps = Math.max(Math.ceil(targetDurationMs / tickMs), 1);
    const chunkSize = Math.max(Math.ceil(total / steps), 1);

    // Eski davranistaki gibi hata simulasyonunu koru (upload basina %10)
    const shouldFail = Math.random() < 0.1;
    const failAt = shouldFail ? Math.max(Math.floor(total * (0.2 + Math.random() * 0.6)), 1) : -1;

    const interval = setInterval(() => {
        if (!isUploading) {
            clearInterval(interval);
            return;
        }
        
        if (isPaused) return;  // Pause durumunda devam etme
        
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
const pauseBtn = document.getElementById("pauseBtn");
const fileInput = document.getElementById("fileInput");
const fileInfoEl = document.getElementById("fileDetails");
const previewBox = document.getElementById("filePreviewBox");
const dropZone = document.getElementById("dropZone");

let selectedFile = null;
let selectedFiles = [];
let selectedFilesStatus = {}; // Dosya durumlarını takip etmek için
let uploadIntervals = {}; // Her dosyanin upload interval'ini tut
let fileObjectURL = null;
let isUploading = false;    // Yukleme durumunu takip etmek icin
let isPaused = false;       // Genel pause durumu

const setUploadingState = (isLoading) => {
    isUploading = isLoading;
    fileInput.disabled = isLoading;
    pauseBtn.classList.toggle('hidden', !isLoading);
};

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

const getPreviewHTML = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const docTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'];
    const audioTypes = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'];
    const videoTypes = ['mp4', 'avi', 'mov', 'mkv', 'wmv'];
    
    let previewHTML = `<div class="file-preview">`;
    
    if (imageTypes.includes(ext)) {
        const url = URL.createObjectURL(file);
        previewHTML += `<img src="${url}" alt="preview">`;
    } else if (audioTypes.includes(ext)) {
        previewHTML += `<div class="file-preview-icon">🎵</div>`;
    } else if (videoTypes.includes(ext)) {
        previewHTML += `<div class="file-preview-icon">🎬</div>`;
    } else if (docTypes.includes(ext)) {
        const iconMap = { pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📈', pptx: '📈', txt: '📃', rtf: '📄' };
        previewHTML += `<div class="file-preview-icon">${iconMap[ext] || '📁'}</div>`;
    } else {
        previewHTML += `<div class="file-preview-icon">📁</div>`;
    }
    
    previewHTML += `</div>`;
    return previewHTML;
};

// Dosya listesini durumla birlikte güncelleyecek fonksiyon
const updateFileListUI = (allFiles) => {
    const totalBytes = allFiles.reduce((sum, f) => sum + (f?.size || 0), 0);
    const completed = Object.values(selectedFilesStatus).filter(s => s === 'completed').length;
    const errors = Object.values(selectedFilesStatus).filter(s => s === 'error').length;
    
    let fileListHTML = `<div class="file-list">`;
    allFiles.forEach((f, idx) => {
        const size = formatBytes(f.size);
        const preview = getPreviewHTML(f);
        const status = selectedFilesStatus[idx] || 'waiting';
        const rowClass = status === 'error' ? 'file-item-error' : '';
        
        let statusIconHtml = '';
        if (status === 'uploading') {
            statusIconHtml = `<div class="file-status">
                <svg class="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.3)" stroke-width="2"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#6366f1" stroke-width="2" stroke-linecap="round" fill="none" stroke-dasharray="15.7 62.8"/>
                </svg>
            </div>`;
        } else if (status === 'completed') {
            statusIconHtml = `<div class="file-status">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#10b981" stroke-width="2"/>
                    <path d="M8 12l2 2 6-6" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>`;
        } else if (status === 'error') {
            statusIconHtml = `<div class="file-status">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
                    <path d="M15 9L9 15M9 9L15 15" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>`;
        }
        
        fileListHTML += `<div class="file-item-with-preview ${rowClass}">${preview}
        <div>
        <div class="file-name">${f.name}</div>
        <div class="file-size">${size}</div>
        </div>${statusIconHtml}</div>`;
    });
    fileListHTML += `</div>`;
    fileInfoEl.innerHTML = `<div style="margin-bottom: 0.5rem; font-weight: 500;">Toplam: ${allFiles.length} dosya (${formatBytes(totalBytes)}) | ✅ ${completed} | ❌ ${errors}</div>` + fileListHTML;
};

const showFileInfo = (file, allFiles = [file]) => {
    
    // Dosya durumlarını başlat ve takip etmek için bir nesne oluştur
    selectedFilesStatus = {};
    allFiles.forEach((f, idx) => {
        selectedFilesStatus[idx] = 'waiting';
    });
    
    // Div'i görünür yap
    fileInfoEl.classList.remove('hidden');
    
    // Birden fazla dosya varsa listesini göster
    if (allFiles.length > 1) {
        updateFileListUI(allFiles);
        previewBox.classList.add('hidden');
    } else {
        fileInfoEl.innerHTML = `Dosya: 1<br>Boyut: ${formatBytes(file.size)}<br>${file.name}`;
        // Tekli dosya için preview göster
        previewBox.classList.remove('hidden');
        previewBox.innerHTML = getPreviewHTML(file);
    }
};

// Yuklemeyi baslatan ana fonksiyon
const startUpload = () => {
    if (!selectedFiles.length || isUploading) return;
    isUploading = true;

    // Yukleme sirasinda sifirla butonunu devre disi birak
    setUploadingState(true);

    // Barı baslangic haline getir
    progressBar.className = 'h-5 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500';
    progressBar.style.width = '0%';
    progressText.innerText = 'Yukleniyor...';

    const totalBytes = Math.max(selectedFiles.reduce((sum, file) => sum + (file?.size || 0), 0), 1);
    let uploadedBytes = 0;
    let fileIndex = 0;

    const updateOverallProgress = (currentFileBytes) => {
        const loaded = Math.min(uploadedBytes + currentFileBytes, totalBytes);
        const percent = Math.min(100, Math.floor((loaded / totalBytes) * 100));
        const safepercent = isNaN(percent) ? 0 : percent;
        progressBar.style.width = safepercent + '%';
        progressText.innerText = '%' + safepercent;

        // Yuklenirken parlama efekti
        if (safepercent < 100) {
            progressBar.classList.add('glow');
        }

        if (safepercent === 100) {
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
        selectedFilesStatus[fileIndex] = 'uploading';
        if (selectedFiles.length > 1) updateFileListUI(selectedFiles);
        
        const interval = upload(file, (current, total) => {
            if (current === 'error') {
                // Hata durumunda: hatalı dosya işaretlensin ama progress bar güncellenmemesin
                selectedFilesStatus[fileIndex] = 'error';
                if (selectedFiles.length > 1) updateFileListUI(selectedFiles);
                // Diğer dosyalara geç (bu dosyanın byte'ları sayılmaz)
                fileIndex += 1;
                uploadNextFile();
                return;
            }

            // Dosya yüklenirken progress bar'ı güncelle (bu dosyada ne kadar yüklendiği)
            updateOverallProgress(current);

            if (current >= total) {
                selectedFilesStatus[fileIndex] = 'completed';
                if (selectedFiles.length > 1) updateFileListUI(selectedFiles);
                uploadedBytes += total;
                fileIndex += 1;
                uploadNextFile();
            }
        });
        
        uploadIntervals[fileIndex] = interval;
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
    // Tüm aktif interval'ları temizle
    Object.values(uploadIntervals).forEach(interval => clearInterval(interval));
    
    progressBar.style.width = "0%";
    progressBar.className = 'h-5 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500';
    progressText.innerText = '%0';
    fileInfoEl.innerHTML = '';
    fileInfoEl.classList.add('hidden');
    previewBox.innerHTML = '';
    previewBox.classList.add('hidden');
    fileInput.value = '';
    fileInput.disabled = false;
    selectedFile = null;
    selectedFiles = [];
    selectedFilesStatus = {};
    uploadIntervals = {};
    isUploading = false;
    isPaused = false;
    pauseBtn.textContent = 'Durdur';
    pauseBtn.classList.add('hidden');

    if (fileObjectURL) {
        URL.revokeObjectURL(fileObjectURL);
        fileObjectURL = null;
    }
});

pauseBtn.addEventListener("click", () => {
    if (!isUploading) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Devam Et' : 'Durdur';
    
    const spinners = document.querySelectorAll('.spinner');
    
    if (isPaused) {
        progressBar.classList.remove('glow');
        spinners.forEach(spinner => spinner.style.animationPlayState = 'paused');
    } else {
        const percent = parseInt(progressText.innerText.substring(1)) || 0;
        if (percent < 100) {
            progressBar.classList.add('glow');
        }
        spinners.forEach(spinner => spinner.style.animationPlayState = 'running');
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
