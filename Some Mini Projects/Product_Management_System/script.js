// Get HTML elements

const productForm =
    document.getElementById("productForm");

const productNameInput =
    document.getElementById("productName");

const productIdInput =
    document.getElementById("productId");

const priceInput =
    document.getElementById("price");

const categoryInput =
    document.getElementById("category");

const quantityInput =
    document.getElementById("quantity");

const productList =
    document.getElementById("productList");

const productCount =
    document.getElementById("productCount");

const totalValue =
    document.getElementById("totalValue");

const searchInput =
    document.getElementById("searchInput");

const filterCategory =
    document.getElementById("filterCategory");


// Get products from localStorage

let products =
    JSON.parse(localStorage.getItem("products")) || [];


// Display products when page loads

displayProducts();


// Add product

productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addProduct();

    }
);


// Add product function

function addProduct() {

    const productName =
        productNameInput.value.trim();

    const productId =
        productIdInput.value.trim();

    const price =
        parseFloat(priceInput.value);

    const category =
        categoryInput.value;

    const quantity =
        parseInt(quantityInput.value);


    // Validate product name

    if (productName === "") {

        alert("Please enter product name.");

        return;

    }


    // Validate product ID

    if (productId === "") {

        alert("Please enter product ID.");

        return;

    }


    // Check duplicate product ID

    const existingProduct =
        products.find(function(product) {

            return product.productId === productId;

        });


    if (existingProduct) {

        alert("Product ID already exists.");

        return;

    }


    // Validate price

    if (isNaN(price) || price <= 0) {

        alert("Please enter a valid price.");

        return;

    }


    // Validate quantity

    if (isNaN(quantity) || quantity <= 0) {

        alert("Please enter a valid quantity.");

        return;

    }


    // Create product object

    const product = {

        id: Date.now(),

        productName: productName,

        productId: productId,

        price: price,

        category: category,

        quantity: quantity

    };


    // Add product to array

    products.push(product);


    // Save products

    saveProducts();


    // Display products

    displayProducts();


    // Clear form

    productForm.reset();

}


// Save products

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// Display products

function displayProducts() {

    productList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    const selectedCategory =
        filterCategory.value;


    products.forEach(function(product) {


        // Search condition

        const matchesSearch =

            product.productName
                .toLowerCase()
                .includes(searchText)

            ||

            product.productId
                .toLowerCase()
                .includes(searchText);


        // Category condition

        const matchesCategory =

            selectedCategory === "All"

            ||

            product.category ===
                selectedCategory;


        // Display matching products

        if (
            matchesSearch &&
            matchesCategory
        ) {

            const row =
                document.createElement("tr");


            // Product name

            const nameCell =
                document.createElement("td");

            nameCell.textContent =
                product.productName;


            // Product ID

            const idCell =
                document.createElement("td");

            idCell.textContent =
                product.productId;


            // Price

            const priceCell =
                document.createElement("td");

            priceCell.textContent =
                "₹" +
                product.price.toFixed(2);


            // Category

            const categoryCell =
                document.createElement("td");

            categoryCell.textContent =
                product.category;


            // Quantity

            const quantityCell =
                document.createElement("td");

            quantityCell.textContent =
                product.quantity;


            // Inventory value

            const valueCell =
                document.createElement("td");


            const value =
                product.price *
                product.quantity;


            valueCell.textContent =
                "₹" +
                value.toFixed(2);


            // Action cell

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

                    editProduct(product.id);

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

                    deleteProduct(product.id);

                }
            );


            // Add buttons

            actionCell.appendChild(
                editButton
            );

            actionCell.appendChild(
                deleteButton
            );


            // Add cells

            row.appendChild(nameCell);

            row.appendChild(idCell);

            row.appendChild(priceCell);

            row.appendChild(categoryCell);

            row.appendChild(quantityCell);

            row.appendChild(valueCell);

            row.appendChild(actionCell);


            // Add row to table

            productList.appendChild(row);

        }

    });


    // Update product count

    productCount.textContent =
        products.length;


    // Calculate total inventory value

    calculateTotalValue();

}


// Calculate total inventory value

function calculateTotalValue() {

    let total = 0;


    products.forEach(function(product) {

        total +=
            product.price *
            product.quantity;

    });


    totalValue.textContent =
        "₹" + total.toFixed(2);

}


// Edit product

function editProduct(id) {

    const product =
        products.find(function(product) {

            return product.id === id;

        });


    const newName =
        prompt(
            "Enter product name:",
            product.productName
        );


    if (
        newName === null ||
        newName.trim() === ""
    ) {

        return;

    }


    const newPrice =
        prompt(
            "Enter product price:",
            product.price
        );


    const price =
        parseFloat(newPrice);


    if (isNaN(price) || price <= 0) {

        alert("Please enter a valid price.");

        return;

    }


    const newQuantity =
        prompt(
            "Enter product quantity:",
            product.quantity
        );


    const quantity =
        parseInt(newQuantity);


    if (
        isNaN(quantity) ||
        quantity <= 0
    ) {

        alert("Please enter a valid quantity.");

        return;

    }


    product.productName =
        newName.trim();

    product.price =
        price;

    product.quantity =
        quantity;


    saveProducts();

    displayProducts();

}


// Delete product

function deleteProduct(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (confirmDelete) {

        products =
            products.filter(function(product) {

                return product.id !== id;

            });


        saveProducts();

        displayProducts();

    }

}


// Search

searchInput.addEventListener(
    "input",
    displayProducts
);


// Category filter

filterCategory.addEventListener(
    "change",
    displayProducts
);