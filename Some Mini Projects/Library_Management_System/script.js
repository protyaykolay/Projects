// Get HTML elements

const bookForm =
    document.getElementById("bookForm");

const bookIdInput =
    document.getElementById("bookId");

const titleInput =
    document.getElementById("title");

const authorInput =
    document.getElementById("author");

const categoryInput =
    document.getElementById("category");

const bookList =
    document.getElementById("bookList");

const searchInput =
    document.getElementById("searchInput");


// Get books from localStorage

let books =
    JSON.parse(
        localStorage.getItem("books")
    ) || [];


// Display books when page loads

displayBooks();


// Add book

bookForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addBook();

    }
);


// Add book function

function addBook() {

    const bookId =
        bookIdInput.value.trim();

    const title =
        titleInput.value.trim();

    const author =
        authorInput.value.trim();

    const category =
        categoryInput.value;


    // Validate Book ID

    if (bookId === "") {

        alert("Please enter Book ID.");

        return;

    }


    // Validate Title

    if (title === "") {

        alert("Please enter book title.");

        return;

    }


    // Validate Author

    if (author === "") {

        alert("Please enter author name.");

        return;

    }


    // Check duplicate Book ID

    const existingBook =
        books.find(
            function(book) {

                return book.bookId === bookId;

            }
        );


    if (existingBook) {

        alert("Book ID already exists.");

        return;

    }


    // Create book object

    const book = {

        id: Date.now(),

        bookId: bookId,

        title: title,

        author: author,

        category: category,

        status: "Available"

    };


    // Add book to array

    books.push(book);


    // Save books

    saveBooks();


    // Display books

    displayBooks();


    // Clear form

    bookForm.reset();

}


// Save books

function saveBooks() {

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

}


// Display books

function displayBooks() {

    bookList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    books.forEach(
        function(book) {


            // Search condition

            const matchesSearch =

                book.bookId
                    .toLowerCase()
                    .includes(searchText)

                ||

                book.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                book.author
                    .toLowerCase()
                    .includes(searchText);


            // Show matching book

            if (matchesSearch) {

                const row =
                    document.createElement("tr");


                // Book ID

                const idCell =
                    document.createElement("td");

                idCell.textContent =
                    book.bookId;


                // Title

                const titleCell =
                    document.createElement("td");

                titleCell.textContent =
                    book.title;


                // Author

                const authorCell =
                    document.createElement("td");

                authorCell.textContent =
                    book.author;


                // Category

                const categoryCell =
                    document.createElement("td");

                categoryCell.textContent =
                    book.category;


                // Status

                const statusCell =
                    document.createElement("td");

                statusCell.textContent =
                    book.status;


                if (
                    book.status === "Available"
                ) {

                    statusCell.className =
                        "status-available";

                } else {

                    statusCell.className =
                        "status-issued";

                }


                // Action cell

                const actionCell =
                    document.createElement("td");


                // Issue / Return button

                if (
                    book.status === "Available"
                ) {

                    const issueButton =
                        document.createElement("button");

                    issueButton.textContent =
                        "Issue";

                    issueButton.className =
                        "issue-btn";


                    issueButton.addEventListener(
                        "click",
                        function() {

                            issueBook(book.id);

                        }
                    );


                    actionCell.appendChild(
                        issueButton
                    );

                } else {

                    const returnButton =
                        document.createElement("button");

                    returnButton.textContent =
                        "Return";

                    returnButton.className =
                        "return-btn";


                    returnButton.addEventListener(
                        "click",
                        function() {

                            returnBook(book.id);

                        }
                    );


                    actionCell.appendChild(
                        returnButton
                    );

                }


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

                        deleteBook(book.id);

                    }
                );


                actionCell.appendChild(
                    deleteButton
                );


                // Add cells to row

                row.appendChild(idCell);

                row.appendChild(titleCell);

                row.appendChild(authorCell);

                row.appendChild(categoryCell);

                row.appendChild(statusCell);

                row.appendChild(actionCell);


                // Add row to table

                bookList.appendChild(row);

            }

        }
    );

}


// Issue book

function issueBook(id) {

    const book =
        books.find(
            function(book) {

                return book.id === id;

            }
        );


    if (
        book.status === "Available"
    ) {

        book.status = "Issued";

    }


    saveBooks();

    displayBooks();

}


// Return book

function returnBook(id) {

    const book =
        books.find(
            function(book) {

                return book.id === id;

            }
        );


    if (
        book.status === "Issued"
    ) {

        book.status = "Available";

    }


    saveBooks();

    displayBooks();

}


// Delete book

function deleteBook(id) {

    const book =
        books.find(
            function(book) {

                return book.id === id;

            }
        );


    if (
        book.status === "Issued"
    ) {

        alert(
            "Issued book cannot be deleted. Please return the book first."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (confirmDelete) {

        books =
            books.filter(
                function(book) {

                    return book.id !== id;

                }
            );


        saveBooks();

        displayBooks();

    }

}


// Search

searchInput.addEventListener(
    "input",
    displayBooks
);