import grid from '../Assets/Icons/icons8-grid-100.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

function Landing() {

    const navigate = useNavigate()
    const [ user ] = useContext(UserContext)


    return ( 
        <div className='landing'>

            <div className='text-center'>
                <img className='mx-auto' alt='text' src={grid} />
                <h1 className='landingTitle'>Wordle Clone</h1>
                <p className='landingSubText'>Get 6 chances to guess a 5-letter word.</p>
            </div>

            <div className='landingBtns'>                       
                <button onClick={()=>navigate('/play')} className='landingbuttons bg-black text-white'>Play</button>
                <button onClick={()=>navigate('/login')} className={`landingbuttons  ${user.loggedIn && 'hidden'}`}>Log in</button>
                <button onClick={()=>navigate('/how-to')} className='landingbuttons'> How to Play</button>
            </div>

        </div> 
    );
}

export default Landing;