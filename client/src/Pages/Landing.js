import grid from '../Assets/Icons/icons8-grid-100.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import loadingIcon from '../Assets/Icons/loading.png'
import { useSelector } from 'react-redux';

function Landing() {

    const loggedIn = useSelector( state => state.session.loggedIn )
    const isLoading = useSelector( state => state.status)
    const navigate = useNavigate()

    return ( 
        <div className='landing'>

            <div className='text-center'>
                <img className='mx-auto' alt='text' src={grid} />
                <h1 className='landingTitle'>Wordle Clone</h1>
                <p className='landingSubText'>Get 6 chances to guess a 5-letter word.</p>
            </div>

            <div className='landingBtns'>                       
                <button onClick={()=>navigate('/play')} className={`landingbuttons bg-black text-white ${!loggedIn && 'hidden'}`}>{isLoading ? <img className='loading' alt='loading' src={loadingIcon} /> : 'Play' }</button>
                <button onClick={()=>navigate('/signup')} className={`landingbuttons  ${loggedIn && 'hidden'}`}>Sign up</button>
                <button onClick={()=>navigate('/login')} className={`landingbuttons  ${loggedIn && 'hidden'}`}>Log in</button>
                <button onClick={()=>navigate('/how-to')} className={`landingbuttons ${!loggedIn && 'hidden'}`}> How to Play</button>
            </div>

        </div> 
    );
}

export default Landing;