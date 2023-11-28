import { useState, React, createContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';

export const UserContext = createContext()

function App() {

  const [ user, setUser ] = useState({ loggedIn: false })

  return (

    <UserContext.Provider value={ [user, setUser]}>

      <div className="App">

        <Navbar />

        <Routes>

          <Route path='/home' element={<Home />} />


        </Routes>


      </div>     

    </UserContext.Provider>


  );
}

export default App;