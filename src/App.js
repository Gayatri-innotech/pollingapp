import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Store from './redux/store';
import { Provider } from 'react-redux';
import AdminHome from './components/adminHome';
import Forms from './components/forms';
import UpdateDetails from './components/updateDetails';
import Users from './components/users';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/form';
import Result from './components/Result';
import Protected from './Protected';

function App() {
  return (
    <div className='App'>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/reg' element={<Register />} />
            <Route
              path='/homes'
              element={
                <Protected user={localStorage.getItem('user')}>
                  <AdminHome />
                </Protected>
              }
            />
            <Route
              path='/form'
              element={
                <Protected user={localStorage.getItem('user')}>
                  <Forms />
                </Protected>
              }
            />
            <Route
              path='/forms/:id'
              element={
                <Protected user={localStorage.getItem('user')}>
                  <Form />
                </Protected>
              }
            />
            <Route
              path='/user'
              element={
                <Protected user={localStorage.getItem('user')}>
                  <Users />
                </Protected>
              }
            />
            <Route
              path='/chart/:id'
              element={
                <Protected user={localStorage.getItem('user')}>
                  <Result />
                </Protected>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <Protected user={localStorage.getItem('user')}>
                  <UpdateDetails />
                </Protected>
              }
            />

            <Route
              path='*'
              element={<h1 className='web'>There's nothing here: 404</h1>}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
