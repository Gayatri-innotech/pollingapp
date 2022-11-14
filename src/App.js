import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Store from './redux/store';
import { Provider, useDispatch } from 'react-redux';
import AdminHome from './components/adminHome';
import Forms from './components/forms'
import UpdateDetails from './components/updateDetails';
import Users from './components/users';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/form';
import Result from './components/Result';

function App() {

  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/reg' element={<Register />} />
            <Route path='/homes' element={<AdminHome />} />
            <Route path='/form' element={<Forms />} />
            <Route path='/forms/:id' element={<Form />} />
            <Route path='/user' element={<Users />} />
            <Route path='/chart/:id' element={<Result/>}/>
            <Route path='/edit/:id' element={<UpdateDetails />} />
            <Route path='*' element={<p>There's nothing here: 404</p>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;