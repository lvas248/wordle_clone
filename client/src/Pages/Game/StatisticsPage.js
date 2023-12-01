import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../App'

function StatisticsPage({display, toggleDisplay}) {

    const [ user, ] = useContext(UserContext)
    const navigate = useNavigate()

    function navigateHome(){
        navigate('/')
        toggleDisplay()
    }

    const winPercentage = user?.stats?.games_won / user?.stats?.games_played * 100

    return ( 
        <div className={`${display ? 'grid' : 'hidden' } bg-white text-black absolute top-[20%] right-[15vw] h-[55svh] w-[70vw] drop-shadow-xl z-50 rounded-2xl`}>
            
                <p className='text-2xl font-bold uppercase m-auto'>statistics</p>
                <div className='flex justify-around'>
                    
                    <div className='flex flex-col text-center text-sm'>
                        <p className='text-3xl font-semibold'>{user?.stats?.games_played}</p>
                        <p>Played</p>
                    </div>

                    <div className='flex flex-col text-center text-sm'>
                        <p className='text-3xl font-semibold'>{winPercentage}</p>
                        <p>Win %</p>
                    </div>

                    <div className='flex flex-col text-center text-sm'>
                        <p className='text-3xl font-semibold'>?</p>
                        <p>Streak</p>
                    </div>

                    <div className='flex flex-col text-center text-sm'>
                        <p className='text-3xl font-semibold'>?</p>
                        <p>Max</p>
                        <p>Streak</p>
                    </div>

                </div>

                <button onClick={navigateHome} className='border border-black px-5 h-fit w-fit m-auto rounded-2xl'>home</button>
            


        </div> 
    );
}

export default StatisticsPage;