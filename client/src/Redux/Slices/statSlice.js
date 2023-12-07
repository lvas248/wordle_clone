import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entity: {
        best_streak: 0,
        current_streak: 0,
        games_played: 0,
        games_won: 0,
        guess_distribution: []        
    }

}

const statSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        addStats: ( state, action ) => {
            state.entity = action.payload
        }, 
        removeStats: ( state ) =>{
            state.entity = initialState
        }, 
        updateGamesWon: ( state ) => {
            state.entity.games_won++
        },
        updateGamesPlayed: ( state ) =>{
            state.entity.games_played++
        },
        updateStats: ( state ) =>{
            debugger
            state.entity.games_played++
        },
        updateGuessDistribution: ( state, action ) =>{
            state.entity.guess_distribution[action.payload]++
            
        }
    
    }
})

export const { addStats, removeStats, updateGamesWon, updateGamesPlayed, updateStats, updateGuessDistribution } = statSlice.actions
export default statSlice.reducer;

