class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.term = '';
        this.init();
    }

    init() {
        this.draw();
        document.getElementById('addTaskButton').addEventListener('click', () => this.addTask());
        document.getElementById('search').addEventListener('input', (e) => {
            this.term = e.target.value;
            this.draw();
        });
    }

    draw() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        const tasksToShow = this.getFilteredTasks();
        tasksToShow.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';

            const deadlineText = task.deadline ? ` (Termin: ${new Date(task.deadline).toLocaleString()})` : '';

            taskItem.innerHTML = `
                <span>${this.highlightTerm(task.text)}${deadlineText}</span>
                <button class="delete" onclick="todo.deleteTask(${index})">🗑️</button>
            `;
            
            taskItem.addEventListener('click', () => this.editTask(index));
            taskList.appendChild(taskItem);
        });

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getFilteredTasks() {
        if (!this.term) return this.tasks;
        return this.tasks.filter(task => task.text.toLowerCase().includes(this.term.toLowerCase()));
    }

    highlightTerm(text) {
        if (!this.term) return text;
        const regex = new RegExp(`(${this.term})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    addTask() {
        const newTaskInput = document.getElementById('newTask');
        const taskDeadline = document.getElementById('taskDeadline');
        const taskText = newTaskInput.value.trim();

        if (taskText.length < 3 || taskText.length > 255) {
            alert("Tekst zadania musi mieć od 3 do 255 znaków.");
            return;
        }

        const now = new Date();
        const deadline = new Date(taskDeadline.value);
        if (taskDeadline.value && deadline < now) {
            alert("Data musi być w przyszłości.");
            return;
        }

        this.tasks.push({ text: taskText, deadline: taskDeadline.value });
        newTaskInput.value = '';
        taskDeadline.value = '';
        this.draw();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.draw();
    }

    editTask(index) {
        const taskItem = document.getElementById('taskList').children[index];
        const task = this.tasks[index];
        
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = task.text;
    
        const dateInput = document.createElement('input');
        dateInput.type = 'datetime-local';
        dateInput.value = task.deadline || '';
    
        taskItem.innerHTML = '';
        taskItem.appendChild(textInput);
        taskItem.appendChild(dateInput);
    
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = '🗑️';
        deleteButton.onclick = () => this.deleteTask(index);
        taskItem.appendChild(deleteButton);
    
        const saveChanges = () => {
            const newText = textInput.value.trim();
            const newDeadline = dateInput.value;
    
            if (newText.length < 3 || newText.length > 255) {
                alert("Tekst zadania musi mieć od 3 do 255 znaków.");
                return;
            }
    
            const now = new Date();
            const newDate = new Date(newDeadline);
            if (newDeadline && newDate < now) {
                alert("Data musi być w przyszłości.");
                return;
            }
    
            task.text = newText;
            task.deadline = newDeadline;
            this.draw();
        };
    
        textInput.addEventListener('blur', saveChanges);
        dateInput.addEventListener('blur', saveChanges);
    
        textInput.focus();
    }
}

const todo = new Todo();
