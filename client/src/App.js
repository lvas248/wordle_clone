import { useState, React, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
// import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import Header from './Layout/Header';
import Game from './Pages/Game/Game';
import StatisticsPage from './Pages/Game/StatisticsPage';
export const UserContext = createContext()

function App() {

  const [ user, setUser ] = useState({ loggedIn: false })
  const [ displayStatistics, setDisplayStatistics ] = useState(false)

  function toggleStatistics(){
    setDisplayStatistics(!displayStatistics)
  }
  useEffect(()=>{
    fetch('/me').then(res => {
      if(res.ok) res.json().then(data => {
          console.log(data)
          setUser({...data, loggedIn: true}
        )})
    })
  },[])

 
  return (

    <UserContext.Provider value={ [user, setUser]}>

      <div className="App bg-[#e3e3e1] min-h-screen relative">

        <Header toggleStatistics={toggleStatistics}/>

        <StatisticsPage display={displayStatistics} toggleDisplay={toggleStatistics}/>

        <Routes>

          <Route path='/play' element={<Game toggleStatistics={toggleStatistics}/>}/>

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