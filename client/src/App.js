import { useState, React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { refreshSession } from './Redux/Slices/sessionSlice';
// import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import Header from './Layout/Header';
import Game from './Pages/Game/Game';
import LeaderBoard from './Pages/LeaderBoard';
import StatisticsPage from './Pages/Game/StatisticsPage';


function App() {

  const dispatch = useDispatch()
  
  const [ displayStatistics, setDisplayStatistics ] = useState(false)
  const [ displayLeaderBoard, setDisplayLeaderBoard ] = useState(false)

  function toggleStatistics(){
    setDisplayStatistics(!displayStatistics)
  }

  function toggleLeaderBoard(){
    setDisplayLeaderBoard(!displayLeaderBoard)
  }


  useEffect(()=>{
    dispatch(refreshSession())
  },[])

  return (


      <div className="App bg-[#e3e3e1] min-h-screen relative">

        <Header toggleStatistics={toggleStatistics} toggleLeaderBoard={toggleLeaderBoard}/>

        <StatisticsPage display={displayStatistics} toggleDisplay={toggleStatistics}/>

        <LeaderBoard display={displayLeaderBoard} toggleDisplay={toggleLeaderBoard} />

        <Routes>

          <Route path='/play' element={<Game toggleStatistics={toggleStatistics}/>}/>

          <Route path='/login' element={<Login />}/>

          {/* {/* <Route path='/signup' element={<Signup />}/> */}

          <Route path='/home' element={<Home />} />

          <Route exact path='/' element={<Landing />} />

        </Routes>


      </div>     



  );
}

export default App;