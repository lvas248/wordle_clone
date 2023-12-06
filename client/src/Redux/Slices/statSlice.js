import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entity: {
        best_streak: 0,
        current_streak: 0,
        games_played: 0,
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
        }
    }
})

export const { addStats, removeStats } = statSlice.actions
export default statSlice.reducer;

