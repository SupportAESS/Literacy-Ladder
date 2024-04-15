import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/user/Login';
import Cart from './Components/Cart';
import UserProfile from './Components/user/dashboard';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import Checkout from './Components/Order/CheckOut';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home />}/>
      <Route path='about' element={<About />}/>
      <Route path='login' element={<Login />}/>
      <Route path='cart' element={<Cart />}/>
      <Route path='userProfile' element={<ProtectedRoute Component={UserProfile} />}/> {/*Use ProtectedRoute for userProfile*/}
      <Route path='/cart/checkout' element={<ProtectedRoute Component={Checkout} />}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </React.StrictMode>
);

