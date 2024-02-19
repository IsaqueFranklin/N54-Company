import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

import { UserContextProvider } from './UserContext';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import ClubPage from './pages/ClubPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import PublicarPage from './pages/PublicarPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <HomePage /> } />
          <Route path='/club' element={ <ClubPage /> } />
          
          
        </Route>
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/cadastro' element={ <RegisterPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/criar' element={ <PublicarPage /> } />
      </Routes>
    </UserContextProvider>
  )
}

export default App
