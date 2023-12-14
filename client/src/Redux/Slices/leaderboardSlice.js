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
        updateLeaderboard: ( state, action ) =>{

            // check to see if user is in leader board
            // const position = state.entity.indexOf( s => s.username === action.payload.username)
            // //if yes, update user record then reorganize
            // if(position){
            //     state.entity[position].games_played++
            //     action.payload.status === 'won' && state.entity[position].games_won++
            // }
            // else{
                
            // }
            //if no, add user to leaderboard, reorganize, set top ten to state

         
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
            state.entity.sort( (a,b) => calculateAverage(a.guess_distribution) - calculateAverage(b.guess_distribution))
            
        }


    }
})

export const { addLeaderboard, sortByGamesWon, sortByWinPercentage, sortByAvgGuesses } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
