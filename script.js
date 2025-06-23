document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const li = document.createElement('li');
        li.innerText = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = '';

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerText = task.text;

            if (task.completed) {
                li.classList.add('completed');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(deleteBtn);

            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }
});
