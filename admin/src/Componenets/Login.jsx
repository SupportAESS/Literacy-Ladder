import React, { useState } from 'react';


function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
        let url = isLogin ? 'http://localhost:2211/login' : 'http://localhost:2211/signup'; // Determine the correct endpoint based on isLogin state
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data.message);
            console.log('Session:', data.session);
            // You can handle the response from the server accordingly, such as redirecting the user or showing a success message
            if (isLogin) {
              // Example: Set session data in local storage after successful login
              localStorage.setItem('session', JSON.stringify(data.session));
              // Example: Redirect user to dashboard page after successful login
              alert('Login successful.');
              // Redirect to dashboard or home page
              window.location.href = '/admindeshboard';
            } else {
              // Example: Show a success message to the user after successful signup
              alert('Signup successful. Please login to continue.');
              // Optionally, you can also toggle the form to show the login form after successful signup
              setIsLogin(true);
            }
        } else {
            console.error('Failed to submit form:', response.statusText);
            if(!isLogin){
              if(response.status == 400){
                alert('Password and Confirm Password is not matched.');
              }else if(response.status == 500){
                alert('Email Already exist.');
              }
            }else{
              alert('Email Or Password is incorrect.');
            }
            
            // Handle error response from server
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle any errors that occur during the form submission process
    }
    
};


  return (
    <div className="flex justify-center items-center h-screen bg-white text-black">
      <div className="bg-gray-200 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="username">Username</label>
              <input className="w-full px-3 py-2 border border-gray-400 rounded" type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            </div>
         
          {!isLogin && (
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border border-gray-400 rounded" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
           )}
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input className="w-full px-3 py-2 border border-gray-400 rounded" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="confirm-password">Confirm Password</label>
              <input className="w-full px-3 py-2 border border-gray-400 rounded" type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          )}
          <button className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200" type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <hr className="my-8 border-gray-400" />
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            className="text-gray-400 hover:text-black focus:outline-none"
            onClick={toggleForm}
            type="button"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
