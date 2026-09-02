// Get HTML elements

const expenseForm =
    document.getElementById("expenseForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const categoryInput =
    document.getElementById("category");

const expenseList =
    document.getElementById("expenseList");

const totalExpense =
    document.getElementById("totalExpense");

const searchInput =
    document.getElementById("searchInput");

const filterCategory =
    document.getElementById("filterCategory");


// Get expenses from localStorage

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];


// Display expenses when page loads

displayExpenses();


// Add expense

expenseForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addExpense();

    }
);


// Add expense function

function addExpense() {

    const description =
        descriptionInput.value.trim();

    const amount =
        parseFloat(amountInput.value);

    const category =
        categoryInput.value;


    // Validate description

    if (description === "") {

        alert("Please enter a description.");

        return;

    }


    // Validate amount

    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    // Create expense object

    const expense = {

        id: Date.now(),

        description: description,

        amount: amount,

        category: category

    };


    // Add expense to array

    expenses.push(expense);


    // Save data

    saveExpenses();


    // Display data

    displayExpenses();


    // Clear form

    expenseForm.reset();

}


// Save expenses in localStorage

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}


// Display expenses

function displayExpenses() {

    expenseList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    const selectedCategory =
        filterCategory.value;


    expenses.forEach(function(expense) {


        // Search condition

        const matchesSearch =
            expense.description
                .toLowerCase()
                .includes(searchText);


        // Category condition

        const matchesCategory =
            selectedCategory === "All" ||
            expense.category === selectedCategory;


        // Display only matching expenses

        if (matchesSearch && matchesCategory) {

            const row =
                document.createElement("tr");


            // Description

            const descriptionCell =
                document.createElement("td");

            descriptionCell.textContent =
                expense.description;


            // Amount

            const amountCell =
                document.createElement("td");

            amountCell.textContent =
                "₹" + expense.amount.toFixed(2);


            // Category

            const categoryCell =
                document.createElement("td");

            categoryCell.textContent =
                expense.category;


            // Action cell

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

                    editExpense(expense.id);

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

                    deleteExpense(expense.id);

                }
            );


            // Add buttons

            actionCell.appendChild(editButton);

            actionCell.appendChild(deleteButton);


            // Add cells to row

            row.appendChild(descriptionCell);

            row.appendChild(amountCell);

            row.appendChild(categoryCell);

            row.appendChild(actionCell);


            // Add row to table

            expenseList.appendChild(row);

        }

    });


    // Calculate total

    calculateTotal();

}


// Calculate total expense

function calculateTotal() {

    let total = 0;


    expenses.forEach(function(expense) {

        total =
            total + expense.amount;

    });


    totalExpense.textContent =
        total.toFixed(2);

}


// Delete expense

function deleteExpense(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this expense?"
        );


    if (confirmDelete) {

        expenses =
            expenses.filter(function(expense) {

                return expense.id !== id;

            });


        saveExpenses();

        displayExpenses();

    }

}


// Edit expense

function editExpense(id) {

    const expense =
        expenses.find(function(expense) {

            return expense.id === id;

        });


    const newDescription =
        prompt(
            "Enter new description:",
            expense.description
        );


    if (
        newDescription === null ||
        newDescription.trim() === ""
    ) {

        return;

    }


    const newAmount =
        prompt(
            "Enter new amount:",
            expense.amount
        );


    const amount =
        parseFloat(newAmount);


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    expense.description =
        newDescription.trim();

    expense.amount =
        amount;


    saveExpenses();

    displayExpenses();

}


// Search

searchInput.addEventListener(
    "input",
    displayExpenses
);


// Category filter

filterCategory.addEventListener(
    "change",
    displayExpenses
);