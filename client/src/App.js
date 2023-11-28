import { useState, React, createContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';

export const UserContext = createContext()

function App() {

  const [ user, setUser ] = useState({ loggedIn: false })


  return (

    <UserContext.Provider value={ [user, setUser]}>

      <div className="App">

        <Navbar />



        <Routes>

          <Route path='/signup' element={<Signup />}/>

          <Route path='/home' element={<Home />} />



        </Routes>


      </div>     

    </UserContext.Provider>


  );
}

export default App;