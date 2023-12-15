import { createSlice } from "@reduxjs/toolkit";

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
            state.entity.sort( (a,b) => a.guess_average - b.guess_average)   
        },
        updateLeaderBoard: ( state, action ) =>{
            const updatedleaderBoard = state.entity.map( s => {
                if(s.username === action.payload.username) return action.payload
                else return s
            })
            state.entity = updatedleaderBoard.sort((a,b) => b.games_won - a.games_won)

        }
    }
})

export const { addLeaderboard, sortByGamesWon, sortByWinPercentage, sortByAvgGuesses, updateLeaderBoard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
