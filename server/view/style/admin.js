// Function to show add user modal
function showAddUserModal() {
    var modal = document.getElementById("add-user-modal");
    modal.style.display = "block";
  }
  
  // Function to close add user modal
  function closeAddUserModal() {
    var modal = document.getElementById("add-user-modal");
    modal.style.display = "none";
  }
  
  // Function to show add product modal
  function showAddProductModal() {
    var modal = document.getElementById("add-product-modal");
    modal.style.display = "block";
  }
  
  // Function to close add product modal
  function closeAddProductModal() {
    var modal = document.getElementById("add-product-modal");
    modal.style.display = "none";
  }

  // Function to show Remove product modal
  function showRemoveProductModal() {
    var modal = document.getElementById("remove-product-modal");
    modal.style.display = "block";
  }
  
  // Function to close Remove product modal
  function closeRemoveProductModal() {
    var modal = document.getElementById("remove-product-modal");
    modal.style.display = "none";
  }

  // Function to show Remove product modal
  function showUpdateProductModal() {
    var modal = document.getElementById("update-product-modal");
    modal.style.display = "block";
  }
  
  // Function to close Update product modal
  function closeUpdateProductModal() {
    var modal = document.getElementById("update-product-modal");
    modal.style.display = "none";
  }

  // Function to show Update product modal
  function showViewProductModal() {
    var modal = document.getElementById("view-product-modal");
    modal.style.display = "block";
  }
  
  // Function to close Remove product modal
  function closeViewProductModal() {
    var modal = document.getElementById("view-product-modal");
    modal.style.display = "none";
  }
  
  // Function to handle form submission for adding a user
  function addUser(event) {
    event.preventDefault();
  
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var role = document.getElementById('signup-role').value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    console.log("username: "+ username + ", email: "+ email + ", role: "+ role + ", password "+ password + ", confirmPassword: "+ confirmPassword);
  
    // Perform validation and submit data to backend
    // You'll need to use fetch or XMLHttpRequest to send data to the server
  }
  
  // Function to handle form submission for adding a product
  function addProduct(event) {
    event.preventDefault();
  
    var bookName = document.getElementById("bookName").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var productType = document.getElementById("productType").value;
    var productPrice = document.getElementById("price").value;
    var productQuantity = document.getElementById("quantity").value;
    var productDescription = document.getElementById("description").value;

    console.log(bookName, author, productPrice, productQuantity, productType,  genre, productDescription);

    fetch('/addBooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookName: bookName,
        author: author,
        productPrice: productPrice,
        productQuantity: productQuantity,
        productType: productType,
        genre: genre,
        productDescription: productDescription
      })
    })
    .then(response => {
      if (response.ok) {
        // Redirect to dashboard upon successful login
        window.location.href = '/admin';
      } else {
        console.error('Add product failed');
        // Handle login failure
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    // Perform validation and submit data to backend
    // You'll need to use fetch or XMLHttpRequest to send data to the server
  }

  // Function to handle form submission for removing a product
  function removeProduct(event) {
    event.preventDefault();
  
    var productName = document.getElementById("bookName").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var description = document.getElementById("description").value;
  
    // Perform validation and submit data to backend
    // You'll need to use fetch or XMLHttpRequest to send data to the server
  }

  // Function to handle form submission for removing a product
  function updateProduct(event) {
    event.preventDefault();
  
    var productName = document.getElementById("bookName").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var description = document.getElementById("description").value;
  
    // Perform validation and submit data to backend
    // You'll need to use fetch or XMLHttpRequest to send data to the server
  }

  // Function to handle form submission for removing a product
  function viewProduct(event) {
    event.preventDefault();
  
    var productName = document.getElementById("bookName").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var description = document.getElementById("description").value;
  
    // Perform validation and submit data to backend
    // You'll need to use fetch or XMLHttpRequest to send data to the server
  }
  
  // Event listeners
  document.getElementById("add-user-btn").addEventListener("click", showAddUserModal);
  document.getElementById("add-user-form").addEventListener("submit", addUser);
  document.getElementsByClassName("close")[0].addEventListener("click", closeAddUserModal);
  
  document.getElementById("add-product-btn").addEventListener("click", showAddProductModal);
  document.getElementById("add-product-form").addEventListener("submit", addProduct);
  document.getElementsByClassName("close")[1].addEventListener("click", closeAddProductModal);

  document.getElementById("remove-product-btn").addEventListener("click", showRemoveProductModal);
  document.getElementById("remove-product-form").addEventListener("submit", removeProduct);
  document.getElementsByClassName("close")[2].addEventListener("click", closeRemoveProductModal);

  document.getElementById("update-product-btn").addEventListener("click", showUpdateProductModal);
  document.getElementById("update-product-form").addEventListener("submit", updateProduct);
  document.getElementsByClassName("close")[3].addEventListener("click", closeUpdateProductModal);

  document.getElementById("view-product-btn").addEventListener("click", showViewProductModal);
  // document.getElementById("view-product-form").addEventListener("submit", viewProduct);
  document.getElementsByClassName("close")[4].addEventListener("click", closeViewProductModal);

  // Dark mode toggle functionality
/*function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
  }
  
  // Event listener for dark mode toggle button
  document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);*/


  document.getElementById("apply-filter").addEventListener("click", function() {
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;
  
    // Dummy data for demonstration

    var purchaseData = [
      { date: "2024-03-01", amount: 100 },
      { date: "2024-03-02", amount: 150 },
      { date: "2024-03-03", amount: 200 },
      { date: "2024-03-04", amount: 180 },
      { date: "2024-03-05", amount: 220 },
      { date: "2024-03-06", amount: 250 },
      { date: "2024-03-07", amount: 280 },
      // Add more data...
    ];
  
    // Process the data and create charts
    renderSalesChart(purchaseData);
  });
  
  function renderSalesChart(data) {
    var chartType = document.getElementById("chart-select").value;
    var ctx = document.getElementById("sales-chart").getContext("2d");
    
    // Determine which type of chart to render based on the selected value
    var chartConfig;
    switch(chartType) {
      case "line":
        chartConfig = {
          type: "line",
          data: {
            labels: data.map(item => item.date),
            datasets: [{
              label: "Sales",
              data: data.map(item => item.amount),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };
        break;
      case "bar":
        chartConfig = {
          type: "bar",
          data: {
            labels: data.map(item => item.date),
            datasets: [{
              label: "Sales",
              data: data.map(item => item.amount),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };
        break;
      case "pie":
        chartConfig = {
          type: "pie",
          data: {
            labels: data.map(item => item.date),
            datasets: [{
              label: "Sales",
              data: data.map(item => item.amount),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#007bff", "#28a745", "#fd7e14", "#6610f2"],
            }]
          }
        };
        break;
      // Add more cases for other chart types if needed
    }
    
    // Create Chart.js chart
    var myChart = new Chart(ctx, chartConfig);
  }
  
  
  
  document.getElementById("fetch-products").addEventListener("click", function() {
    var filterType = document.querySelector('input[name="filter-type"]:checked').value;
    var filterValue;
  
    if (filterType === "genre") {
      filterValue = document.getElementById("genre-select").value;
      fetchGenreProducts(filterValue);
    } else if (filterType === "name") {
      filterValue = document.getElementById("name-search").value.trim();
      if (filterValue === "") {
        alert("Please enter a product name to search.");
        return;
      }
      fetchProductsByName(filterValue);
    } else {
      // Fetch all products
      fetchAllProducts();
    }
  });
  
  // Function to fetch products for a selected genre
  function fetchGenreProducts(genre) {
    // Your logic to fetch products for the selected genre goes here
    // Example dummy data
    var products = [
      { name: "Book 1", author: "Author 1", genre: "Fiction", price: 20, quantity: 10, description: "Description 1" },
      { name: "Book 2", author: "Author 2", genre: "Non-fiction", price: 25, quantity: 15, description: "Description 2" },
      // Add more products as needed
    ];
    displayProducts(products);
  }
  
  // Function to fetch products by name
  function fetchProductsByName(name) {
    // Your logic to fetch products by name goes here
    // Example dummy data
    var products = [
      { name: "Book 1", author: "Author 1", genre: "Fiction", price: 20, quantity: 10, description: "Description 1" },
      { name: "Book 2", author: "Author 2", genre: "Non-fiction", price: 25, quantity: 15, description: "Description 2" },
      // Add more products as needed
    ];
    var filteredProducts = products.filter(function(product) {
      return product.name.toLowerCase().includes(name.toLowerCase());
    });
    displayProducts(filteredProducts);
  }
  
  // Function to fetch all products
  function fetchAllProducts() {
    // Your logic to fetch all products goes here
    // Example dummy data
    var products = [
      { name: "Book 1", author: "Author 1", genre: "Fiction", price: 20, quantity: 10, description: "Description 1" },
      { name: "Book 2", author: "Author 2", genre: "Non-fiction", price: 25, quantity: 15, description: "Description 2" },
      // Add more products as needed
    ];
    displayProducts(products);
  }
  
  // Function to display products in the modal
  function displayProducts(products) {
    var productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    products.forEach(function(product) {
      var productItem = document.createElement("div");
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Author:</strong> ${product.author}</p>
        <p><strong>Genre:</strong> ${product.genre}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>Description:</strong> ${product.description}</p>
      `;
      productList.appendChild(productItem);
    });
  }
  
  // Show/hide genre filter based on selection
  document.querySelectorAll('input[name="filter-type"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
      if (this.value === "genre") {
        document.getElementById("genre-filter").style.display = "block";
        document.getElementById("name-filter").style.display = "none";
      } else if (this.value === "name") {
        document.getElementById("name-filter").style.display = "block";
        document.getElementById("genre-filter").style.display = "none";
      } else {
        document.getElementById("genre-filter").style.display = "none";
        document.getElementById("name-filter").style.display = "none";
      }
    });
  });
  
  
  
  