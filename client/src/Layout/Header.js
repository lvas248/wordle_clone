import { useContext } from 'react'
import { UserContext } from'../App'
import { useNavigate } from 'react-router-dom'
import howTo from '../Assets/Icons/icons8-question-100.png'
import stats from '../Assets/Icons/icons8-bar-graph-100.png'
import settings from '../Assets/Icons/icons8-settings-100.png'


function Header({ toggleStatistics}) {

    const [ user, setUser ] = useContext(UserContext)
    const navigate = useNavigate()

    function logout(){
        fetch('/logout',{
          method: 'DELETE'
        }).then(res => {
            if(res.ok){ 
                setUser({loggedIn: false})
                navigate('/')
            }} 
                
          )
      }

    return ( 
    <div className='header'>
        
        <p className={`logo ${ !user.loggedIn && 'mx-auto'}`}>Wordle Clone</p>

        <div className={`${ user.loggedIn ? 'flex' : 'hidden'} headerBtnContainer`}>

            <button> <img  className='headerIcon' alt='text' src={howTo} /> </button>
            <button onClick={toggleStatistics}> <img className='headerIcon' alt='text' src={stats} /> </button>
            <button> <img className='headerIcon' alt='text' src={settings} /> </button>
            <button onClick={logout} className='text-sm border border-black px-6 rounded-xl '>Logout</button>
       
        </div>




    </div> 
    );
}

export default Header;