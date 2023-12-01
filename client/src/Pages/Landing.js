import grid from '../Assets/Icons/icons8-grid-100.png'
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import loadingIcon from '../Assets/Icons/loading.png'

function Landing() {

    const navigate = useNavigate()
    const [ user ] = useContext(UserContext)
    const [ playLoading, setPlayLoading ] = useState(false)

    function handlePlayClick(){
        setPlayLoading(true)
        fetch('/game',{
            method: 'POST'
        }).then(res => {
            if(res.ok) navigate('/play')
        })
    }


    return ( 
        <div className='landing'>

            <div className='text-center'>
                <img className='mx-auto' alt='text' src={grid} />
                <h1 className='landingTitle'>Wordle Clone</h1>
                <p className='landingSubText'>Get 6 chances to guess a 5-letter word.</p>
            </div>

            <div className='landingBtns'>                       
                <button onClick={handlePlayClick} className='landingbuttons bg-black text-white'>{playLoading ? <img className='loading' alt='loading' src={loadingIcon} /> : 'Play' }</button>
                <button onClick={()=>navigate('/login')} className={`landingbuttons  ${user.loggedIn && 'hidden'}`}>Log in</button>
                <button onClick={()=>navigate('/how-to')} className='landingbuttons'> How to Play</button>
            </div>

        </div> 
    );
}

export default Landing;