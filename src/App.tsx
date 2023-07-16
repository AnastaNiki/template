import React from 'react';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import { Main } from './components/Main/main';
import { Search } from './components/Search/search';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">

      <Header />
      <Routes>
			  <Route path="/" element={<Main />} />
			  <Route path={"search"} element={<Search />} />
	    </Routes>
      <Footer />

    </div>
  );
}

export default App;
