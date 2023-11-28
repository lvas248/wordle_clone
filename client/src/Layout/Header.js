import { useContext } from 'react'
import { UserContext } from'../App'
import howTo from '../Assets/Icons/icons8-question-100.png'
import stats from '../Assets/Icons/icons8-bar-graph-100.png'
import settings from '../Assets/Icons/icons8-settings-100.png'


function Header() {

    const [ user, ] = useContext(UserContext)

    return ( 
    <div className='header'>
        
        <p className={`logo ${ !user.loggedIn && 'mx-auto'}`}>Wordle Clone</p>

        <div className={`${ user.loggedIn ? 'flex' : 'hidden'} headerBtnContainer`}>

            <button> <img  className='headerIcon' alt='text' src={howTo} /> </button>
            <button> <img className='headerIcon' alt='text' src={stats} /> </button>
            <button> <img className='headerIcon' alt='text' src={settings} /> </button>

        </div>




    </div> 
    );
}

export default Header;