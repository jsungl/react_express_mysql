import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Board from './components/pages/Board';
import BoardList from './components/pages/BoardList';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import FindAccount from './components/pages/FindAccount';
import BoardWrite from './components/pages/BoardWrite';
import './App.css';

export default function App() {

  return (
    <Routes>
       <Route path='/' element={<Layout />}>
         <Route index element={<Home />}/>
         <Route path='list' element={<BoardList />}/>
         <Route path='board/:postId' element={<Board />} />
         <Route path='boardWrite' element={<BoardWrite />} />
       </Route>
       <Route path='/login' element={<Login />} />
       <Route path='/signUp' element={<SignUp />} />
       <Route path='/findAccount' element={<FindAccount />} />
       <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}


