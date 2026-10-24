import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import logo from './assets/logo.svg';
import {Home, CreatePost} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='sticky top-0 z-50 w-full flex justify-between items-center bg-white/80 backdrop-blur-xl sm:px-8 px-4 py-4 border-b border-black/5'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-36 object-contain' />
        </Link>

        <Link
          to='/create-post'
          className='font-inter text-sm font-medium bg-neutral-900 text-white px-5 py-2.5 rounded-full hover:bg-neutral-700 transition'
        >
          Create
        </Link>
      </header>
      <main className='sm:px-8 px-4 py-10 w-full min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
