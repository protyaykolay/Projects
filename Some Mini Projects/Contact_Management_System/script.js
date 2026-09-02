// Get HTML elements

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const phoneInput =
    document.getElementById("phone");

const emailInput =
    document.getElementById("email");

const addressInput =
    document.getElementById("address");

const contactList =
    document.getElementById("contactList");

const searchInput =
    document.getElementById("searchInput");


// Get contacts from localStorage

let contacts =
    JSON.parse(
        localStorage.getItem("contacts")
    ) || [];


// Display contacts when page loads

displayContacts();


// Add contact

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addContact();

    }
);


// Add contact function

function addContact() {

    const name =
        nameInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const email =
        emailInput.value.trim();

    const address =
        addressInput.value.trim();


    // Validate name

    if (name === "") {

        alert("Please enter name.");

        return;

    }


    // Validate phone

    if (phone === "") {

        alert("Please enter phone number.");

        return;

    }


    // Validate email

    if (email === "") {

        alert("Please enter email.");

        return;

    }


    // Validate address

    if (address === "") {

        alert("Please enter address.");

        return;

    }


    // Create contact object

    const contact = {

        id: Date.now(),

        name: name,

        phone: phone,

        email: email,

        address: address

    };


    // Add contact to array

    contacts.push(contact);


    // Save contacts

    saveContacts();


    // Display contacts

    displayContacts();


    // Clear form

    contactForm.reset();

}


// Save contacts

function saveContacts() {

    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
    );

}


// Display contacts

function displayContacts() {

    contactList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    contacts.forEach(
        function(contact) {


            // Search condition

            const matchesSearch =

                contact.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                contact.phone
                    .toLowerCase()
                    .includes(searchText)

                ||

                contact.email
                    .toLowerCase()
                    .includes(searchText);


            // Display matching contacts

            if (matchesSearch) {

                const row =
                    document.createElement("tr");


                // Name

                const nameCell =
                    document.createElement("td");

                nameCell.textContent =
                    contact.name;


                // Phone

                const phoneCell =
                    document.createElement("td");

                phoneCell.textContent =
                    contact.phone;


                // Email

                const emailCell =
                    document.createElement("td");

                emailCell.textContent =
                    contact.email;


                // Address

                const addressCell =
                    document.createElement("td");

                addressCell.textContent =
                    contact.address;


                // Action

                const actionCell =
                    document.createElement("td");


                // Edit button

                const editButton =
                    document.createElement("button");

                editButton.textContent =
                    "Edit";

                editButton.className =
                    "edit-btn";


                editButton.addEventListener(
                    "click",
                    function() {

                        editContact(contact.id);

                    }
                );


                // Delete button

                const deleteButton =
                    document.createElement("button");

                deleteButton.textContent =
                    "Delete";

                deleteButton.className =
                    "delete-btn";


                deleteButton.addEventListener(
                    "click",
                    function() {

                        deleteContact(contact.id);

                    }
                );


                // Add buttons

                actionCell.appendChild(
                    editButton
                );

                actionCell.appendChild(
                    deleteButton
                );


                // Add cells to row

                row.appendChild(nameCell);

                row.appendChild(phoneCell);

                row.appendChild(emailCell);

                row.appendChild(addressCell);

                row.appendChild(actionCell);


                // Add row to table

                contactList.appendChild(row);

            }

        }
    );

}


// Edit contact

function editContact(id) {

    const contact =
        contacts.find(
            function(contact) {

                return contact.id === id;

            }
        );


    const newName =
        prompt(
            "Enter name:",
            contact.name
        );


    if (
        newName === null ||
        newName.trim() === ""
    ) {

        return;

    }


    const newPhone =
        prompt(
            "Enter phone:",
            contact.phone
        );


    if (
        newPhone === null ||
        newPhone.trim() === ""
    ) {

        return;

    }


    const newEmail =
        prompt(
            "Enter email:",
            contact.email
        );


    if (
        newEmail === null ||
        newEmail.trim() === ""
    ) {

        return;

    }


    const newAddress =
        prompt(
            "Enter address:",
            contact.address
        );


    if (
        newAddress === null ||
        newAddress.trim() === ""
    ) {

        return;

    }


    // Update contact

    contact.name =
        newName.trim();

    contact.phone =
        newPhone.trim();

    contact.email =
        newEmail.trim();

    contact.address =
        newAddress.trim();


    // Save updated data

    saveContacts();


    // Display updated contacts

    displayContacts();

}


// Delete contact

function deleteContact(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this contact?"
        );


    if (confirmDelete) {

        contacts =
            contacts.filter(
                function(contact) {

                    return contact.id !== id;

                }
            );


        saveContacts();

        displayContacts();

    }

}


// Search contact

searchInput.addEventListener(
    "input",
    displayContacts
);