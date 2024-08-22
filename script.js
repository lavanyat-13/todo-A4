document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let tasks = [];
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            return filter === 'completed' ? task.completed : !task.completed;
        });
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.index = index;
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    };
    const handleTaskAction = (e) => {
        const target = e.target;
        const taskIndex = target.parentElement.parentElement.dataset.index;
        if (target.classList.contains('edit-btn')) {
            const newTaskText = prompt('Edit task:', tasks[taskIndex].text);
            if (newTaskText) {
                tasks[taskIndex].text = newTaskText;
                renderTasks();
            }
        }
        if (target.classList.contains('complete-btn')) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            renderTasks();
        }
        if (target.classList.contains('delete-btn')) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    };
    const filterTasks = (e) => {
        const filter = e.target.dataset.filter;
        renderTasks(filter);
    };
    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskAction);
    filterBtns.forEach(btn => btn.addEventListener('click', filterTasks));
    renderTasks();
});
