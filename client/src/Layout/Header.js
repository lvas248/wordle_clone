import { useNavigate } from 'react-router-dom'
import howTo from '../Assets/Icons/icons8-question-100.png'
import stats from '../Assets/Icons/icons8-bar-graph-100.png'
import settings from '../Assets/Icons/icons8-settings-100.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSession } from '../Redux/Slices/sessionSlice'


function Header({ toggleStatistics}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedIn = useSelector( state => state.session.loggedIn)

    function logout(){
        dispatch(logoutSession())
        .then(res => {
            if(res.meta.requestStatus === 'fulfilled') navigate('/')
        })
      }

    return ( 
    <div className='header'>
        
        <button onClick={()=>navigate('/')} className={`logo ${ !loggedIn && 'mx-auto'}`}>Wordle Clone</button>

        <div className={`${ loggedIn ? 'flex' : 'hidden'} headerBtnContainer`}>

            <button> <img  className='headerIcon' alt='text' src={howTo} /> </button>
            <button onClick={toggleStatistics}> <img className='headerIcon' alt='text' src={stats} /> </button>
            <button> <img className='headerIcon' alt='text' src={settings} /> </button>
            <button onClick={logout} className='text-sm border border-black px-6 rounded-xl '>Logout</button>
       
        </div>




    </div> 
    );
}

export default Header;