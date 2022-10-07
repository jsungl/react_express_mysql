import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Board from './components/pages/Board';

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />}/>
        <Route path='/board/:postId' element={<Board />} />
      </Route>
    </Routes>
  );
}

export default App;
