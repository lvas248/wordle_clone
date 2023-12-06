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
        updateStatsForWin: ( state ) => {
            state.entity.games_played++
            state.entity.games_won++
        },
        updateStatsForLoss: ( state ) =>{
            debugger
            state.entity.games_played++
        }
    
    }
})

export const { addStats, removeStats, updateStatsForWin, updateStatsForLoss } = statSlice.actions
export default statSlice.reducer;

