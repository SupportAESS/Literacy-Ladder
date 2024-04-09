// Function to handle the click event for switching to the signup form
function handleSignupLinkClick(event) {
  event.preventDefault();
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('signup-form').classList.add('active');
}

// Function to handle the click event for switching to the login form
function handleLoginLinkClick(event) {
  event.preventDefault();
  document.getElementById('signup-form').classList.remove('active');
  document.getElementById('login-form').classList.add('active');
}

// Function to handle the form submission for login
function handleLoginFormSubmit(event) {
  event.preventDefault();
  var username = document.getElementById('login-username').value;
  var password = document.getElementById('login-password').value;

  // Make POST request to Node.js server for login
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
}

// Function to handle the form submission for signup
function handleSignupFormSubmit(event) {
  event.preventDefault();
  var username = document.getElementById('signup-username').value;
  var email = document.getElementById('signup-email').value;
  var role = document.getElementById('signup-role').value;
  var password = document.getElementById('signup-password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  // Make POST request to Node.js server for signup
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
      alert('Register successful.');
      window.location.href = '/admin';
    } else {
      console.error('Signup failed');
      // Handle signup failure
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Event listeners
document.getElementById('signup-link').addEventListener('click', handleSignupLinkClick);
document.getElementById('login-link').addEventListener('click', handleLoginLinkClick);
document.getElementById('login-form').addEventListener('submit', handleLoginFormSubmit);
document.getElementById('signup-form').addEventListener('submit', handleSignupFormSubmit);
