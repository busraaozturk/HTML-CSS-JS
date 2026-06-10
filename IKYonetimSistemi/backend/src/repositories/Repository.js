import fs from "fs/promises"; 
// Dosya okuma / yazma  
// Node.js'nin dosya sistemi modülünün promises API'sini kullanarak dosya işlemlerini asenkron hale getiriyoruz.

class Repository {
    // Her repository farklı Json dosyasıyla çalışacağı için, dosya yolunu constructor ile alıyoruz.
    constructor(filePath) {
        this.filePath = filePath;
    }

    // Tüm verileri okuma ve JSON formatında döndürme
    async getAll() {
        const data = await fs.readFile(this.filePath, "utf-8");
        return JSON.parse(data);
    }

    // Tüm verileri kaydetme
    async SaveAll(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getById(id) {
        const items = await this.getAll();
        return items.find(item => item.id == id);
    }

    async create(newItem) {
        const items = await this.getAll();

        const createdItem = {
            id: Date.now().toString(),
            ...newItem
        };

        items.push(createdItem);
        await this.SaveAll(items);
        
        return createdItem;
    }

    async update(id, updatedData) {
        const items = await this.getAll();
        const index = items.findIndex(item => item.id == id);

        if (index === -1) {
            return null; // Güncellenecek öğe bulunamazsa null döndür
        }

        items[index] = {
            ...items[index],
            ...updatedData
        };

        await this.SaveAll(items);
        return items[index];
    }

    async delete(id) {
        const items = await this.getAll();
        const filteredItems = items.filter((item) => item.id != id);

        // Gerçekten silinmiş mi kontrol et
        if (items.length === filteredItems.length) {
            return null; // Silinecek öğe bulunamadı
        }

        await this.SaveAll(filteredItems);

        return true;
    }

}

export default Repository;