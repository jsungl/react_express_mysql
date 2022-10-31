import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Board from './components/pages/Board';
import BoardList from './components/pages/BoardList';
import NotFound from './components/pages/NotFound';

export default function App() {

  return (
    <Routes>
       <Route path='/' element={<Layout />}>
         <Route index element={<Home />}/>
         <Route path='list' element={<BoardList />}/>
         <Route path='board/:postId' element={<Board />} />
       </Route>
       <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}


