import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import ClubPage from './pages/ClubPage';
import RegisterPage from './pages/RegisterPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={ <HomePage /> } />
        <Route path='/club' element={ <ClubPage /> } />
        <Route path='/cadastro' element={ <RegisterPage /> } />
      </Route>
    </Routes>
  )
}

export default App
