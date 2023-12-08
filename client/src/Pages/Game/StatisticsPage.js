import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function StatisticsPage({display, toggleDisplay}) {

    const navigate = useNavigate()
    const { games_played, games_won, guess_distribution, current_streak, best_streak } = useSelector(state => state.stat.entity)

    function navigateHome(){
        navigate('/')
        toggleDisplay()
    }

    function getWidth(g){
        console.log(`w-[${Math.round( g / games_won * 100 )}%]`)
        return `w-[${Math.round( g / games_won * 100 )}%]`
    }

    const winPercentage = Math.round(games_won / games_played * 100)

    const renderGuessStat = guess_distribution?.map( (g, index) =>{

        return <div key={index} className={`flex gap-4`}> <p className='text-center'>{index + 1}</p> <div className={` ${g > 0 && `bg-black text-white ${getWidth(g)}`} text-center `}>{g}</div> </div>
    
    })


    return ( 
        <div className={`${display ? 'grid' : 'hidden' } bg-white text-black absolute top-0 h-[100svh] w-[100vw] grid place-content-center z-50`}>
            
            <button onClick={navigateHome} className='px-5 h-fit w-fit ml-auto rounded-2xl mb-4 '>X</button>

            <div className='bg-white h-[50svh] w-[35vw] max-w-[343px] min-w-[300px] flex flex-col gap-4 '>
                
                <div>

                    <p className='uppercase text-[14px] font-bold'>statistics</p>
                    
                    <div className='flex justify-between'>
                        <div className='statContainer'>
                            <p className='stat'>{games_played}</p>
                            <p>Played</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{winPercentage || 0}</p>
                            <p>Win %</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{current_streak}</p>
                            <p>Streak</p>
                        </div>

                        <div className='statContainer'>
                            <p className='stat'>{best_streak}</p>
                            <p>Max</p>
                            <p>Streak</p>
                        </div>
                    
                    </div>

                </div>

                <div>
                    <p className='uppercase text-[14px] font-bold'>guess distribution</p>
                    
                    <div className='grid gap-1'>

                        {renderGuessStat}

                    </div>

                </div>

            </div>


            


        </div> 
    );
}

export default StatisticsPage;