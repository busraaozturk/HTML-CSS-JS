let tasks = []; //Görevlerin Tutulacağı Dizi

const button = document.querySelector(".addBtn");
const taskText = document.querySelector('.taskText');
const tasklist = document.querySelector('.taskList');

// Butona tıklandığında
button.addEventListener('click',AddTask);

// Görev Ekleme Fonksiyonu
function AddTask() {
    const text = taskText.value.trim();
    if (text === "") {
        return;
    }

    tasks.push({
        id:Date.now(),
        text:text,
        completed: false
    });

    taskText.value = "";
    RenderTask();
}

// Görev Silme Fonksiyonu
function DeleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if(index !== -1)
    {
        tasks.splice(index,1);
    }

    RenderTask();
}

// Görev Tamamlama
function CompletedTask(id){
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
    }

    RenderTask();
}

// Görev Düzenleme
function EditTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return;
    }

    const newText = prompt("Görevi Düzenle : ", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
    }

    RenderTask();
}

// UI 
function RenderTask() {
    tasklist.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.style.display="flex";
        taskDiv.style.alignItems="center";
        taskDiv.style.justifyContent="space-between";
        taskDiv.style.marginTop="10px";
        taskDiv.style.border="1px solid black";
        taskDiv.style.padding="8px";
        taskDiv.style.borderRadius="5px";

        // Sol taraf (checkbox + text)
        const leftSide = document.createElement("div");
        leftSide.style.display = "flex";
        leftSide.style.alignItems = "center";
        leftSide.style.gap = "8px";

        // Checkbox
        const checkInput = document.createElement("input");
        checkInput.type = "checkbox";
        checkInput.checked = task.completed;

        checkInput.addEventListener("change", () => {
            CompletedTask(task.id);
        });

        // Text
        const textSpan = document.createElement("span");
        textSpan.innerText = task.text;

        if (task.completed) {
            textSpan.style.textDecoration = "line-through";
            textSpan.style.color = "gray";
        }

        leftSide.appendChild(checkInput);
        leftSide.appendChild(textSpan);

        // Butonlar
        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.gap = "8px";

        // Check Button
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
        completedBtn.onclick = () => CompletedTask(task.id);

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 
        12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
        editBtn.onclick = () => EditTask(task.id);

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 
        3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
        deleteBtn.onclick = () => DeleteTask(task.id);

        buttonGroup.appendChild(completedBtn);
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        taskDiv.appendChild(textSpan);
        taskDiv.appendChild(buttonGroup);

        tasklist.appendChild(taskDiv);
    });
}