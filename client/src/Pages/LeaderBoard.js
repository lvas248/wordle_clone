import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { sortByGamesWon, sortByWinPercentage, sortByAvgGuesses } from '../Redux/Slices/leaderboardSlice'

function LeaderBoard({display, toggleDisplay}){

    const dispatch = useDispatch()

    const userStats = useSelector( state => state.leaderboard.entity)

    const currentUser = useSelector( state => state.user.entity.username)
    
    const [ selectedStat, setSelectedStat ] = useState('Wins')

    const renderUserStats = userStats?.slice(0,10).map( (u, index) => {

        const { username, games_played, games_won, guess_average } = u

        const winPercentage = Math.round(games_won / games_played * 100)

        return <div key={username} className={`grid grid-cols-5 gap-8 text-center text-sm py-2 hover:bg-slate-200  ${ currentUser === username && 'bg-slate-200 font-semibold'}`}>
                    <p>#{index + 1}</p>
                    <p>{username}</p>
                    <p>{games_won}</p>
                    <p>{winPercentage}</p>
                    <p>{guess_average}</p>
                    </div>
    })

    function handleSelectStat(e){
        setSelectedStat(e.target.name)
        switch (e.target.name){
            case 'Wins':
                dispatch(sortByGamesWon())
                break
            case 'Win Percentage':
                dispatch(sortByWinPercentage())
                break
            case 'Guess Average (Wins)':
                dispatch(sortByAvgGuesses())
                break
        }
    }

    return ( 
        
        <div className={`${display ? 'grid' : 'hidden' } popupContainer max-h-3/4`}>

            <div className='popupContent overflow-y-auto'>

                <h1 className='text-[28px] font-bold'>Leaderboard: </h1>
                <h2 className='text-[20px] font-semibold'>{selectedStat}</h2>

                <div className='divide-y divide-slate-200 border-b'>
                    
                    <div className='grid grid-cols-5 gap-8 items-center text-center text-sm border p-2 bg-slate-200' >
                        <p>Rank</p>
                        <p>User</p>
                        <button onClick={handleSelectStat} name='Wins' className='underline underline-offset-2'>Games Won</button>
                        <button onClick={handleSelectStat} name='Win Percentage' className='underline underline-offset-2'>Win %</button>
                        <button onClick={handleSelectStat} name='Guess Average (Wins)' className='underline underline-offset-2'>Guess Avg (wins)</button>
                    </div>

                    {renderUserStats}

                </div>


                <button onClick={toggleDisplay} className='bg-black text-white uppercase rounded-md font-bold h-[5svh] w-full max-w-[500px] mx-auto'>back</button>

            </div>

        </div> 
    
    );
}

export default LeaderBoard;