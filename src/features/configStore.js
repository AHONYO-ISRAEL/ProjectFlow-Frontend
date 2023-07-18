import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import authReducer from './auth/authSlice'
import projectReducer from './project/projectSlice'
import  storage from 'redux-persist/lib/storage'


const persistConfig ={
    key: 'root',
    version:1,
    storage
}

const reducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
reducer: persistedReducer
})

export default store