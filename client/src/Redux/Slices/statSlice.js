import { createSlice } from "@reduxjs/toolkit";
import { calcualteAverage, calculateAverage } from '../../Helpers/calculateAverage'

const initialState = {
    entity: {
        best_streak: 0,
        current_streak: 0,
        games_played: 0,
        games_won: 0,
        guess_average: 0,
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
        updateStatsAfterWin: ( state, action ) =>{
            state.entity.games_played += 1
            state.entity.games_won += 1
            state.entity.current_streak += 1            
            state.entity.guess_distribution[action.payload] += 1
            if( state.entity.current_streak > state.entity.best_streak ) state.entity.best_streak = state.entity.current_streak
            state.entity.guess_average = calculateAverage(state.entity.guess_distribution)
        },
        updateStatsAfterLoss: ( state ) =>{
            state.entity.games_played += 1
            state.entity.current_streak = 0    
        }

    
    }
})

export const { addStats, removeStats, updateStatsAfterWin, updateStatsAfterLoss } = statSlice.actions
export default statSlice.reducer;

