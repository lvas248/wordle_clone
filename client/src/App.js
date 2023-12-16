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
import HowTo from './Pages/Game/HowTo';

function App() {

  const dispatch = useDispatch()
  
  const [ displayStatistics, setDisplayStatistics ] = useState(false)
  const [ displayLeaderBoard, setDisplayLeaderBoard ] = useState(false)
  const [ displayHowTo, setDisplayHowTo] = useState(false)

  function toggleStatistics(){
    setDisplayStatistics(!displayStatistics)
    setDisplayHowTo(false)
    setDisplayLeaderBoard(false)
  }

  function toggleLeaderBoard(){
    setDisplayLeaderBoard(!displayLeaderBoard)
    setDisplayStatistics(false)
    setDisplayHowTo(false)
  }

  function toggleHowTo(){
    setDisplayHowTo(!displayHowTo)
    setDisplayLeaderBoard(false)
    setDisplayStatistics(false)
  }

  function toggleAllOff(){
    setDisplayHowTo(false)
    setDisplayLeaderBoard(false)
    setDisplayStatistics(false)
  }


  useEffect(()=>{
    dispatch(refreshSession())
  },[])


  return (


      <div className={`App bg-[#e3e3e1] min-h-screen relative `}>

        <Header toggleStatistics={toggleStatistics} toggleLeaderBoard={toggleLeaderBoard} toggleHowTo={toggleHowTo} toggleAllOff={toggleAllOff}/>

        <StatisticsPage display={displayStatistics} toggleDisplay={toggleStatistics}/>

        <LeaderBoard display={displayLeaderBoard} toggleDisplay={toggleLeaderBoard} />

        <HowTo  display={displayHowTo} toggleDisplay={toggleHowTo}/>

        <Routes>

          <Route path='/play' element={<Game toggleStatistics={toggleStatistics}/>}/>

          <Route path='/login' element={<Login />}/>

          <Route path='/signup' element={<Signup />}/>

          <Route path='/home' element={<Home />} />

          <Route exact path='/' element={<Landing />} />

        </Routes>


      </div>     



  );
}

export default App;