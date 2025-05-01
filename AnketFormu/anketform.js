const digerCheckbox = document.getElementById('diger');
const otherHobbyInput = document.getElementById('otherHobby');

digerCheckbox.addEventListener('change', function() {
    if (this.checked) {
        otherHobbyInput.style.display = 'block'; 
    } else {
        otherHobbyInput.style.display = 'none';  
        otherHobbyInput.value = ""; 
    }
});

//Textarea Karakter Sayacı
const aboutInput = document.getElementById('about');
const charCounter = document.createElement('div');
charCounter.style.fontSize = '12px';
charCounter.style.textAlign = 'right';
charCounter.style.color = '#777';
aboutInput.parentNode.appendChild(charCounter);

const maxChars = aboutInput.maxLength;

// Sayaç işlevi
function updateCounter() {
  charCounter.textContent = `${aboutInput.value.length}/${maxChars} karakter`;
}

// Her inputta güncelle
aboutInput.addEventListener('input', updateCounter);

// Sayfa yüklenince de sayaç gösterilsin
window.addEventListener('DOMContentLoaded', updateCounter);

const form = document.getElementById("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const hobbyCheckboxes = document.querySelectorAll('input[name="hobbies"]');
    const otherCheckbox = document.getElementById('diger');
    const otherInput = document.getElementById('otherHobby');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
  
    const isAnyChecked = Array.from(hobbyCheckboxes).some(cb => cb.checked);
    const isOtherChecked = otherCheckbox.checked;
    const isOtherInputFilled = otherInput.value.trim().length > 0;
  
    // Hiçbir hobi seçilmemişse mesaj verir
    if (!isAnyChecked) {
      alert("Lütfen en az bir hobi seçin.");
      return; 
    }
  
    // 'Diğer' seçili ve açılan input boşsa
    if (isOtherChecked && !isOtherInputFilled) {
      alert("Lütfen 'Diğer' hobinizi yazın.");
      otherInput.focus();
      return; 
    }
  
    // Tüm kontroller geçtiyse gönderme işlemleri başlar
    submitButton.innerHTML = '<span class="spinner"></span> Gönderiliyor...';
    submitButton.disabled = true;
  
    setTimeout(() => {
      alert("Kayıt başarılı!");
      form.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      charCounter.textContent = `0/${maxChars} karakter`;
      otherInput.style.display = 'none';
    }, 2000);
  });
  
  //İnputa sadece rakam girilmesini sağlar
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9-]/g, "");
  });