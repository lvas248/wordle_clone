import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function StatisticsPage({display, toggleDisplay}) {

    const navigate = useNavigate()
    const { games_played, games_won, guess_distribution, current_streak, best_streak, guess_average } = useSelector(state => state.stat.entity)

    function navigateHome(){
        navigate('/')
        toggleDisplay()
    }

    function getWidth(g){
        return `w-[${Math.round( g / games_won * 100 )}%]`
    }

    const winPercentage = Math.round(games_won / games_played * 100)

    const renderGuessStat = guess_distribution?.map( (g, index) =>{

        return <div key={index} className={`flex gap-4`}> <p className='text-center'>{index + 1}</p> <div className={` ${g > 0 && `bg-black text-white ${getWidth(g)}`} text-center `}>{g}</div> </div>
    
    })

    return ( 

            <div className={`${display ? 'grid' : 'hidden' } popupContainer`}>

                <div className='popupContent'>

                    <h1 className='text-[28px] font-bold'>User Statistics</h1>

                    <div className='flex flex-col  justify-between'>

                        <div className='statContainer '>
                            <p className='stat'>{games_won}</p>
                            <p>Wins</p>
                        </div>

                        <div className='statContainer '>
                            <p className='stat'>{games_played}</p>
                            <p>Games Played</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{winPercentage || 0}</p>
                            <p>Win %</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{current_streak}</p>
                            <p>Current Streak</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{best_streak}</p>
                            <p>Best Streak</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{guess_average}</p>
                            <p>Guess Avg (wins)</p>
                        </div>

                        <div className='flex flex-col gap-2'>

                            <p className='text-[20px]'>Guess Distribution:</p>
                            
                            <div className='grid gap-1 pl-4'>

                                {renderGuessStat}

                            </div>

                        </div>
                        
                    </div>

                    <button onClick={toggleDisplay} className='bg-black text-white uppercase rounded-md font-bold h-[5svh] w-full max-w-[500px] mx-auto'>back</button>

                </div>

            </div>             

    );
}

export default StatisticsPage;