// Get HTML elements

const taskInput =
    document.getElementById("taskInput");

const addButton =
    document.getElementById("addButton");

const searchInput =
    document.getElementById("searchInput");

const taskList =
    document.getElementById("taskList");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// Get tasks from localStorage

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


// Current filter

let currentFilter = "all";


// Display tasks when page loads

displayTasks();


// Add Task

addButton.addEventListener("click", addTask);


// Also allow Enter key

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Add task function

function addTask() {

    const taskText =
        taskInput.value.trim();


    // Check empty task

    if (taskText === "") {

        alert("Please enter a task.");

        return;

    }


    // Create task object

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array

    tasks.push(task);


    // Save tasks

    saveTasks();


    // Display tasks

    displayTasks();


    // Clear input

    taskInput.value = "";

}


// Save tasks in localStorage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Display tasks

function displayTasks() {

    taskList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    tasks.forEach(function(task) {


        // Search condition

        const matchesSearch =
            task.text
                .toLowerCase()
                .includes(searchText);


        // Filter condition

        let matchesFilter = true;


        if (currentFilter === "completed") {

            matchesFilter =
                task.completed === true;

        }


        if (currentFilter === "pending") {

            matchesFilter =
                task.completed === false;

        }


        // Display only matching tasks

        if (matchesSearch && matchesFilter) {

            const li =
                document.createElement("li");


            li.className = "task-item";


            // Left side

            const leftDiv =
                document.createElement("div");

            leftDiv.className = "task-left";


            // Checkbox

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked =
                task.completed;


            checkbox.addEventListener(
                "change",
                function() {

                    toggleTask(task.id);

                }
            );


            // Task text

            const taskText =
                document.createElement("span");

            taskText.className = "task-text";

            taskText.textContent =
                task.text;


            if (task.completed) {

                taskText.classList.add("completed");

            }


            leftDiv.appendChild(checkbox);

            leftDiv.appendChild(taskText);


            // Action buttons

            const actions =
                document.createElement("div");

            actions.className = "task-actions";


            // Edit button

            const editButton =
                document.createElement("button");

            editButton.textContent = "Edit";

            editButton.className = "edit-btn";


            editButton.addEventListener(
                "click",
                function() {

                    editTask(task.id);

                }
            );


            // Delete button

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.className = "delete-btn";


            deleteButton.addEventListener(
                "click",
                function() {

                    deleteTask(task.id);

                }
            );


            actions.appendChild(editButton);

            actions.appendChild(deleteButton);


            li.appendChild(leftDiv);

            li.appendChild(actions);


            taskList.appendChild(li);

        }

    });

}


// Mark task completed

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed =
                !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();

}


// Delete task

function deleteTask(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this task?");


    if (confirmDelete) {

        tasks = tasks.filter(function(task) {

            return task.id !== id;

        });


        saveTasks();

        displayTasks();

    }

}


// Edit task

function editTask(id) {

    const task =
        tasks.find(function(task) {

            return task.id === id;

        });


    const newText =
        prompt("Edit your task:", task.text);


    if (
        newText !== null &&
        newText.trim() !== ""
    ) {

        task.text =
            newText.trim();


        saveTasks();

        displayTasks();

    }

}


// Search task

searchInput.addEventListener(
    "input",
    displayTasks
);


// Filter buttons

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            currentFilter =
                button.dataset.filter;


            // Remove active class

            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove("active");

                }
            );


            // Add active class

            button.classList.add("active");


            displayTasks();

        }
    );

});