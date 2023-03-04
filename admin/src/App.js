import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import SideBar from './components/Sidebar/SideBar';
import Home from './pages/home/Home';

function App() {
  return (
    <>
    <Navbar/>
    <div className='row '>
    <div className='col-3'>
    <SideBar/>
    </div>
    <div className='col-9'>
    <Home/>
    </div>
    

    </div>
    
    </>

    
  );
}

export default App;
