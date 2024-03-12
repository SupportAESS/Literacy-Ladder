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
  
  // Function to handle form submission for adding a user
  function addUser(event) {
    event.preventDefault();
  
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    console.log("username: "+ username + ", email: "+ email + ", password "+ password + ", confirmPassword: "+ confirmPassword);
  
    // Perform validation and submit data to backend
    // You'll need to use fetch or XMLHttpRequest to send data to the server
  }
  
  // Function to handle form submission for adding a product
  function addProduct(event) {
    event.preventDefault();
  
    var productName = document.getElementById("product-name").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var price = document.getElementById("product-price").value;
    var quantity = document.getElementById("product-quantity").value;
    var description = document.getElementById("product-description").value;
  
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

  // Dark mode toggle functionality
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
  }
  
  // Event listener for dark mode toggle button
  document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
  
  