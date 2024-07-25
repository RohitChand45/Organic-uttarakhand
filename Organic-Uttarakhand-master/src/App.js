import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LeftNav from './components/leftnav/lefnav';
import Routes from './components/routes/routes';
import Dashboard from './Pages/Dashboard/Dashboard' ; 
function App(props) {
  const authStatus =   useSelector(state => state.ins.authStatus)
  return (
    <div class="wrapper">
      {authStatus?(
          <>
         <LeftNav/>
         <Header/>
         </>
      ):(null)}
     
      <Routes/>
      {authStatus?(
          <>
         <Footer/>
         </>
      ):(null)} 

    </div>
  );
}

export default App;
