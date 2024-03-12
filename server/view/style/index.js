document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
  });
  
  document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
  });
  
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
  
    // Here you can add your logic for handling login
    // For demonstration purposes, I'm just logging the input values
    console.log("Login clicked with username: " + username + " and password: " + password);
    // Make POST request to Node.js server
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(response => {
        if (response.ok) {
          // Redirect to dashboard upon successful login
          window.location.href = '/admin';
        } else {
          console.error('Login failed');
          // Handle login failure
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    
});
  
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('signup-email').value;
    var role = document.getElementById('signup-role').value;
    var password = document.getElementById('signup-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
  
    // Here you can add your logic for handling signup
    // For demonstration purposes, I'm just logging the input values
    console.log("Signup clicked with username: " + username + ", email: " + email + ", role: " + role + " and password: " + password + "confirm-password: "+  confirmPassword);

    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          role: role,
          password: password,
          confirmPassword: password
        })
      })
      .then(response => {
        if (response.ok) {
          // Redirect to signup success page
          console.log("successful register")
          //window.location.href = '/signup-success';
        } else {
          console.error('Signup failed');
          // Handle signup failure
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  