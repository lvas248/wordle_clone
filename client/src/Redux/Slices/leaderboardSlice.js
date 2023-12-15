import { createSlice } from "@reduxjs/toolkit";
import { calculateAverage } from "../../Helpers/calculateAverage";

const initialState = {
    enitity: []
}

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        addLeaderboard: ( state, action ) =>{
            state.entity = action.payload
        },
        sortByGamesWon: ( state, action ) =>{
            state.entity.sort( (a,b)=> b.games_won - a.games_won )
        },
        sortByWinPercentage: ( state ) => {
            state.entity.sort( (a,b) => {
                return (b.games_won / b.games_played) - ( a.games_won / a.games_played)
            } )
        },
        sortByAvgGuesses: ( state ) => {
            state.entity.sort( (a,b) => b.guess_average - a.guess_average)
            
        }


    }
})

export const { addLeaderboard, sortByGamesWon, sortByWinPercentage, sortByAvgGuesses } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
