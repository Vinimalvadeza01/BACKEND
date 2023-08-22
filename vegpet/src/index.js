import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './Pages/Home/App';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import Login from './Pages/Login';
import CriarConta from './Pages/CriarConta/';
import Endereco from './Pages/Endereco';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router>
        <Route path='/Home' element={<App/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/CriarConta' element={<CriarConta/>}></Route>
        <Route path='/Endereco' element={<Endereco/>}></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        <Route path=''></Route>
        
      </Router>
    </BrowserRouter>
  </React.StrictMode>
);

