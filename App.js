import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import Video from './Pages/Video/Video';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import Signup from './Pages/Signup/Signup';
import axios from 'axios'

function App() {
  // useState
  const [sideNavbar, setSideNavbar] = useState(true)

  // useEffect Fetch backend API
  // useEffect(() => {
  //   axios.get('http://localhost:4000/api/getAllVideo').then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [])


  const setSideNavbarFun = (value) => {
    setSideNavbar(value)
  }

  return (
    <div className="App">
      <Navbar setSideNavbarFun={setSideNavbarFun} sideNavbar={sideNavbar} />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
