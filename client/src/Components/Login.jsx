import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic
    
    console.log('Logging in with email:', username, 'and password:', password);
    try {
      const response = await fetch('http://localhost:2211/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
          
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response from server:', data.message);
          console.log('Session:', data.session);
          //console.log(response);
          // You can handle the response from the server accordingly, such as redirecting the user or showing a success message
          if (isLogin) {
            // Example: Set session data in local storage after successful login
            localStorage.setItem('session', JSON.stringify(data.session));
            // Example: Redirect user to dashboard page after successful login
            alert('Login successful.');
            // Redirect to dashboard or home page
            window.location.href = '/';

          } else {
            // Example: Show a success message to the user after successful signup
            alert('Signup successful. Please login to continue.');
            // Optionally, you can also toggle the form to show the login form after successful signup
            setIsLogin(true);
          }
      } else {
          console.error('Failed to submit form:', response.statusText);
          // Handle error response from server
      }
  } catch (error) {
      console.error('Error submitting form:', error);
      // Handle any errors that occur during the form submission process
  }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic
    console.log('username',username, ' Signing up with email:', email, 'and password:', password, 'confirmPassword', confirmPassword);
    try{
    const response = await fetch('http://localhost:2211/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        role: "user",
        password: password,
        confirmPassword: password
      })
    })
      if (response.ok) {
        // Redirect to signup success page
        console.log("successful register")
        alert('Register successful.');
        //window.location.href = '/admin';
        //window.location.href = '/signup-success';
      } else {
        console.error('Signup failed');
        // Handle signup failure
      }
    }catch(error) {
      console.error('Error:', error);
    };
  };

  const handleGoogleLogin = () => {
    // Handle login with Google logic
    console.log('Logging in with Google');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? 'Log in' : 'Sign up'}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-indigo-600 hover:text-indigo-500">{isLogin ? 'Sign up' : 'Log in'}</button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={isLogin ? handleLogin : handleSignup}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input id="username" name="username" type="name" autoComplete="Username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              {!isLogin && (
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            )}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input id="confirmPassword" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none" onClick={handleGoogleLogin}>
                Log in with Google
              </button>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: lock-closed */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M4 8V6a6 6 0 1112 0v2h2a1 1 0 011 1v7a3 3 0 01-3 3H4a3 3 0 01-3-3V9a1 1 0 011-1h2zm8 2h-4a1 1 0 00-1 1v5h6v-5a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
