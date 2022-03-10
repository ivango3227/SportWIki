import React,{useState} from "react";
import { BrowserRouter as Router, Routes,Route, } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import SportArticle from "./SportArticle";

function App() {

  return (
    <Router>
        <Header />
        <Main />
    </Router>
      
    
  );
}

export default App;

function Main(props){
  return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sport/:name" element={<SportArticle />} />
    </Routes>
  )
}