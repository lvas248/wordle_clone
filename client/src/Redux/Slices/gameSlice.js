import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateStatsForWin, updateStatsForLoss } from "./statSlice";

export const submitGuess = createAsyncThunk(
    'submit/post',
    async( obj, { dispatch, rejectWithValue })=>{
        const response = await fetch('/guess',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ word: obj })
        })

        const data = await response.json()

        if(response.ok){
            if( data.game_progress === 'win' ) dispatch(updateStatsForWin())
            else if(data.game_progess === 'lost') dispatch(updateStatsForLoss())

            return data
        }
        
        return rejectWithValue(data)
    }
)

const initialState = {
    entity: {
            game_board:  [
                [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
                [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
                [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
                [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
                [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
                [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
            ],
            progress: 'pending',
            word: '',
            attempt: 0
    },
    status: 'idle',
    error: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addGame: ( state, action ) => {
            const copy = [...state.entity.game_board]
            action.payload.game_board.forEach( g => copy[action.payload.game_board.indexOf(g)] = g)
            state.entity.game_board = copy
            state.entity.attempt = action.payload.game_board.length 
        },
        removeGame: ( state ) =>{
            state.entity = initialState
        },
        updateChar: ( state, action ) =>{
            const row = state.entity.attempt 
            state.entity.game_board[row][action.payload.index].char = action.payload.char
        },
        clearGameError: ( state ) => {
            state.error = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(submitGuess.pending, ( state ) =>{
                state.status = 'pending'
            })
            .addCase(submitGuess.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( submitGuess.fulfilled, ( state, action )=>{
                state.status = 'idle'
                state.entity.progress = action.payload.game_progress
                state.entity.game_board[state.entity.attempt] = action.payload.result
                if(action.payload.game_progress === 'pending') state.entity.attempt += 1
                else state.entity.word = action.payload.word

            } )
    }
})

export const { addGame, removeGame, updateChar, clearGameError } = gameSlice.actions
export default gameSlice.reducer

