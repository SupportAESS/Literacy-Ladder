import React, { useState } from 'react';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Logging in with email:', email, 'and password:', password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic
    console.log('Signing up with email:', email, 'and password:', password);
  };

  const handleGoogleLogin = () => {
    // Handle login with Google logic
    console.log('Logging in with Google');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{showLogin ? 'Log in' : 'Sign up'}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{showLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
            <button onClick={() => setShowLogin(!showLogin)} className="font-medium text-indigo-600 hover:text-indigo-500">{showLogin ? 'Sign up' : 'Log in'}</button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={showLogin ? handleLogin : handleSignup}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
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
              {showLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
