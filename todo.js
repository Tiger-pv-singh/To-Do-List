document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const taskTimeInput = document.getElementById('task-time');
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    window.addTodo = function () {
        const taskText = todoInput.value.trim();
        const taskTime = taskTimeInput.value.trim();

        if (taskText !== "") {
            const li = document.createElement('li');
            const timeLeftText = taskTime !== "" ? ` (Time left: ${taskTime} mins)` : "";
            li.textContent = `${taskText}${timeLeftText}`;

            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.onclick = () => {
                li.classList.add('completed');
                li.textContent = `${taskText} (Completed)`;
                completedList.appendChild(li);
                li.removeChild(completeBtn);
                li.removeChild(deleteBtn);
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = () => {
                todoList.removeChild(li);
            };

            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            todoInput.value = '';
            taskTimeInput.value = '';

            if (taskTime !== "") {
                // Timer logic
                let timeLeft = parseInt(taskTime);
                const timer = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        li.textContent = `${taskText} (Time left: ${timeLeft} mins)`;
                        li.appendChild(completeBtn);
                        li.appendChild(deleteBtn);
                    } else {
                        clearInterval(timer);
                        li.textContent = `${taskText} (Time's up!)`;
                        li.appendChild(completeBtn);
                        li.appendChild(deleteBtn);
                    }
                }, 60000);
            }
        }
    };

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
        document.getElementById('clock').textContent = strTime;
    }

    setInterval(updateClock, 1000);
    updateClock();
});
