import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { calculateAverage } from '../Helpers/calculateAverage'
import { sortByGamesWon, sortByWinPercentage, sortByAvgGuesses } from '../Redux/Slices/leaderboardSlice'

function LeaderBoard({display, toggleDisplay}){

    const dispatch = useDispatch()

    const userStats = useSelector( state => state.leaderboard.entity)
    
        const renderUserStats = userStats?.map( (u, index) => {

        const { username, games_played, games_won, guess_average } = u

        const winPercentage = Math.round(games_won / games_played * 100)
        
        return <div key={username} className='grid grid-cols-5 gap-8 text-center text-sm py-2 hover:bg-slate-200'>
                    <p>#{index + 1}</p>
                    <p>{username}</p>
                    <p>{games_won}</p>
                    <p>{winPercentage}</p>
                    <p>{guess_average}</p>
                </div>
    })

    return ( 
        
        <div className={`${display ? 'grid' : 'hidden' } bg-white text-black absolute top-0 h-[100svh] w-[100vw] grid place-content-center z-50`}>
            
            <p className='font-bold text-xl my-6'>LeaderBoard</p>

            <div className='divide-y divide-slate-200 border-b'>
                
                <div className='grid grid-cols-5 gap-8 text-center text-sm border p-2 bg-slate-200' >
                    <p>Rank</p>
                    <p>User</p>
                    <button onClick={(e)=>dispatch(sortByGamesWon())} className='underline underline-offset-2'>Games Won</button>
                    <button onClick={()=>dispatch(sortByWinPercentage())} className='underline underline-offset-2'>Win %</button>
                    <button onClick={()=>dispatch(sortByAvgGuesses())} className='underline underline-offset-2'>Guess Avg (wins)</button>
                </div>

                {renderUserStats}

            </div>


            <button className='my-6 text-right' onClick={toggleDisplay}>Back</button>

        </div> 
    
    );
}

export default LeaderBoard;