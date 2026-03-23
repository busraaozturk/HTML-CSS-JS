const usercontainer = document.getElementById("user-container");
const statusMessage = document.getElementById("status-message");

// Hata durumunu simüle etmek için true yapabilirsiniz
const simulateError = true;

async function fetchUsers() {
    try {
        // yükleniyor mesajının gösterimi
        statusMessage.textContent = "Kullanıcılar yükleniyor...";
        statusMessage.className = "loading";
        usercontainer.innerHTML = ""; // önceki kullanıcıları temizle

        // fetch ile veriyi çekme
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`Veri Çekilemedi! HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        // Eğer simüle edilmiş hata varsa, mesajı göster ama kullanıcıları da yükle
        if (simulateError) {
            statusMessage.textContent = "Mock Data Hatası: Bazı veriler eksik olabilir!";
            statusMessage.className = "error";
        } else {
            statusMessage.textContent = "";
            statusMessage.className = "";
        }

        renderUsers(users);
    }
    catch (error) {
        // Hata durumunda mesaj gösterme
        console.error("Hata:", error);
        statusMessage.textContent = error.message; // "Mock Data Hatası: Sunucuya bağlanılamadı!"
        statusMessage.className = "error"; // CSS class ekle
    }
}

// Kullanıcıları ekrana basan fonksiyon
function renderUsers(users) {
    users.forEach(user => {
        const card = document.createElement("div");
        card.className ="user-card";
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;
        usercontainer.appendChild(card);
    });
}

fetchUsers();