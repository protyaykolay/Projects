// Get HTML elements

const employeeForm =
    document.getElementById("employeeForm");

const nameInput =
    document.getElementById("name");

const employeeIdInput =
    document.getElementById("employeeId");

const emailInput =
    document.getElementById("email");

const departmentInput =
    document.getElementById("department");

const salaryInput =
    document.getElementById("salary");

const employeeList =
    document.getElementById("employeeList");

const employeeCount =
    document.getElementById("employeeCount");

const searchInput =
    document.getElementById("searchInput");

const filterDepartment =
    document.getElementById("filterDepartment");


// Get employees from localStorage

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];


// Display employees when page loads

displayEmployees();


// Add employee

employeeForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addEmployee();

    }
);


// Add employee function

function addEmployee() {

    const name =
        nameInput.value.trim();

    const employeeId =
        employeeIdInput.value.trim();

    const email =
        emailInput.value.trim();

    const department =
        departmentInput.value;

    const salary =
        parseFloat(salaryInput.value);


    // Validate name

    if (name === "") {

        alert("Please enter employee name.");

        return;

    }


    // Validate employee ID

    if (employeeId === "") {

        alert("Please enter employee ID.");

        return;

    }


    // Check duplicate employee ID

    const existingEmployee =
        employees.find(function(employee) {

            return employee.employeeId === employeeId;

        });


    if (existingEmployee) {

        alert("Employee ID already exists.");

        return;

    }


    // Validate email

    if (email === "") {

        alert("Please enter email.");

        return;

    }


    // Validate salary

    if (isNaN(salary) || salary <= 0) {

        alert("Please enter a valid salary.");

        return;

    }


    // Create employee object

    const employee = {

        id: Date.now(),

        name: name,

        employeeId: employeeId,

        email: email,

        department: department,

        salary: salary

    };


    // Add employee to array

    employees.push(employee);


    // Save employees

    saveEmployees();


    // Display employees

    displayEmployees();


    // Clear form

    employeeForm.reset();

}


// Save employees

function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}


// Display employees

function displayEmployees() {

    employeeList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    const selectedDepartment =
        filterDepartment.value;


    employees.forEach(function(employee) {


        // Search condition

        const matchesSearch =

            employee.name
                .toLowerCase()
                .includes(searchText)

            ||

            employee.employeeId
                .toLowerCase()
                .includes(searchText);


        // Department condition

        const matchesDepartment =

            selectedDepartment === "All"

            ||

            employee.department ===
                selectedDepartment;


        // Display matching employees

        if (
            matchesSearch &&
            matchesDepartment
        ) {

            const row =
                document.createElement("tr");


            // Name

            const nameCell =
                document.createElement("td");

            nameCell.textContent =
                employee.name;


            // Employee ID

            const idCell =
                document.createElement("td");

            idCell.textContent =
                employee.employeeId;


            // Email

            const emailCell =
                document.createElement("td");

            emailCell.textContent =
                employee.email;


            // Department

            const departmentCell =
                document.createElement("td");

            departmentCell.textContent =
                employee.department;


            // Salary

            const salaryCell =
                document.createElement("td");

            salaryCell.textContent =
                "₹" +
                employee.salary.toFixed(2);


            // Action

            const actionCell =
                document.createElement("td");


            // Edit button

            const editButton =
                document.createElement("button");

            editButton.textContent = "Edit";

            editButton.className = "edit-btn";


            editButton.addEventListener(
                "click",
                function() {

                    editEmployee(employee.id);

                }
            );


            // Delete button

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.className =
                "delete-btn";


            deleteButton.addEventListener(
                "click",
                function() {

                    deleteEmployee(employee.id);

                }
            );


            // Add buttons

            actionCell.appendChild(editButton);

            actionCell.appendChild(deleteButton);


            // Add cells

            row.appendChild(nameCell);

            row.appendChild(idCell);

            row.appendChild(emailCell);

            row.appendChild(departmentCell);

            row.appendChild(salaryCell);

            row.appendChild(actionCell);


            // Add row

            employeeList.appendChild(row);

        }

    });


    // Update employee count

    employeeCount.textContent =
        employees.length;

}


// Edit employee

function editEmployee(id) {

    const employee =
        employees.find(function(employee) {

            return employee.id === id;

        });


    const newName =
        prompt(
            "Enter employee name:",
            employee.name
        );


    if (
        newName === null ||
        newName.trim() === ""
    ) {

        return;

    }


    const newEmail =
        prompt(
            "Enter employee email:",
            employee.email
        );


    if (
        newEmail === null ||
        newEmail.trim() === ""
    ) {

        return;

    }


    const newSalary =
        prompt(
            "Enter employee salary:",
            employee.salary
        );


    const salary =
        parseFloat(newSalary);


    if (isNaN(salary) || salary <= 0) {

        alert("Please enter a valid salary.");

        return;

    }


    employee.name =
        newName.trim();

    employee.email =
        newEmail.trim();

    employee.salary =
        salary;


    saveEmployees();

    displayEmployees();

}


// Delete employee

function deleteEmployee(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (confirmDelete) {

        employees =
            employees.filter(function(employee) {

                return employee.id !== id;

            });


        saveEmployees();

        displayEmployees();

    }

}


// Search employee

searchInput.addEventListener(
    "input",
    displayEmployees
);


// Department filter

filterDepartment.addEventListener(
    "change",
    displayEmployees
);