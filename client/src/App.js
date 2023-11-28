import { useState, React, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
// import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import Header from './Layout/Header';

export const UserContext = createContext()

function App() {

  const [ user, setUser ] = useState({ loggedIn: false })

  useEffect(()=>{
    fetch('/me').then(res => {
      if(res.ok) res.json().then(data => setUser({...data, loggedIn: true}))
    })
  },[])

 
  return (

    <UserContext.Provider value={ [user, setUser]}>

      <div className="App">

        <Header />

        <Routes>

          <Route path='/login' element={<Login />}/>

          <Route path='/signup' element={<Signup />}/>

          <Route path='/home' element={<Home />} />

          <Route path='/' element={<Landing />} />

        </Routes>


      </div>     

    </UserContext.Provider>


  );
}

export default App;