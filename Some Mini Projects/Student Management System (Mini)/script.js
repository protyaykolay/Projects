// Get HTML elements

const studentForm = document.getElementById("studentForm");

const nameInput = document.getElementById("name");

const rollInput = document.getElementById("roll");

const emailInput = document.getElementById("email");

const departmentInput = document.getElementById("department");

const marksInput = document.getElementById("marks");

const studentTableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("search");

const filterDepartment =
    document.getElementById("filterDepartment");

const submitButton =
    document.getElementById("submitButton");


// Get students from localStorage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Used when editing a student

let editIndex = -1;


// Display students when page loads

displayStudents();


// Add or Update Student

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();

    const roll = rollInput.value.trim();

    const email = emailInput.value.trim();

    const department = departmentInput.value;

    const marks = marksInput.value;


    // Validation

    if (
        name === "" ||
        roll === "" ||
        email === "" ||
        department === "" ||
        marks === ""
    ) {
        alert("Please fill all fields.");

        return;
    }


    // Create student object

    const student = {

        name: name,

        roll: roll,

        email: email,

        department: department,

        marks: marks

    };


    // Check if editing

    if (editIndex === -1) {

        students.push(student);

    } else {

        students[editIndex] = student;

        editIndex = -1;

        submitButton.textContent = "Add Student";

    }


    // Save data

    saveStudents();


    // Display updated list

    displayStudents();


    // Clear form

    studentForm.reset();

});


// Save students to localStorage

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// Display students

function displayStudents() {

    studentTableBody.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();

    const selectedDepartment =
        filterDepartment.value;


    students.forEach(function(student, index) {

        const nameMatch =
            student.name
                .toLowerCase()
                .includes(searchText);

        const rollMatch =
            student.roll
                .toLowerCase()
                .includes(searchText);

        const departmentMatch =
            selectedDepartment === "All" ||
            student.department === selectedDepartment;


        if (
            (nameMatch || rollMatch) &&
            departmentMatch
        ) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${student.name}</td>

                <td>${student.roll}</td>

                <td>${student.email}</td>

                <td>${student.department}</td>

                <td>${student.marks}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${index})"
                    >
                        Delete
                    </button>

                </td>

            `;


            studentTableBody.appendChild(row);

        }

    });

}


// Delete student

function deleteStudent(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");


    if (confirmDelete) {

        students.splice(index, 1);

        saveStudents();

        displayStudents();

    }

}


// Edit student

function editStudent(index) {

    const student = students[index];


    nameInput.value = student.name;

    rollInput.value = student.roll;

    emailInput.value = student.email;

    departmentInput.value = student.department;

    marksInput.value = student.marks;


    editIndex = index;


    submitButton.textContent = "Update Student";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Search

searchInput.addEventListener(
    "input",
    displayStudents
);


// Filter

filterDepartment.addEventListener(
    "change",
    displayStudents
);