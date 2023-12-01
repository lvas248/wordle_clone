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

    const winPercentage = Math.round(user?.stats?.games_won / user?.stats?.games_played * 100)

    return ( 
        <div className={`${display ? 'grid' : 'hidden' } bg-white text-black absolute top-0 h-[100svh] w-[100vw] grid place-content-center z-50`}>
            
            <button onClick={navigateHome} className='px-5 h-fit w-fit ml-auto rounded-2xl mb-4 '>X</button>

            <div className='bg-white h-[50svh] w-[35vw] max-w-[343px] min-w-[300px] flex flex-col gap-4 '>
                
                <div>

                    <p className='uppercase text-[14px] font-bold'>statistics</p>
                    
                    <div className='flex justify-between'>
                        <div className='statContainer'>
                            <p className='stat'>{user?.stats?.games_played}</p>
                            <p>Played</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{winPercentage || 0}</p>
                            <p>Win %</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{user?.stats?.current_streak}</p>
                            <p>Streak</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{user?.stats?.best_streak}</p>
                            <p>Max</p>
                            <p>Streak</p>
                        </div>
                    
                    </div>

                </div>

                <div>
                    <p className='uppercase text-[14px] font-bold'>guess distribution</p>
                    <div>

                    </div>

                </div>

            </div>


            


        </div> 
    );
}

export default StatisticsPage;