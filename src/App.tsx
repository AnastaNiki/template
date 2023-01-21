import React from 'react';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import { Main } from './components/Main/main';
import { Search } from './components/Search/search';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
    <div id="root"></div>

    <Header />
    <Routes>
			<Route path="/" element={<Main />} />
			<Route path={"search/"} element={<Search />} />
	  </Routes>
    <Footer />
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    </div>
  );
}

export default App;
