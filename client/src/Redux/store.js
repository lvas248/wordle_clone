import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './Slices/sessionSlice'
import userReducer from './Slices/userSlice'
import statReducer from './Slices/statSlice'
import gameReducer from './Slices/gameSlice'

const store = configureStore({
    reducer:{
        session: sessionReducer,
        user: userReducer, 
        stat: statReducer, 
        game: gameReducer
    }
})

export default store;