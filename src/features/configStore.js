import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import authReducer from './auth/authSlice'
import projectReducer from './project/projectSlice'
import allProjectReducer from './project/allProjectSlice'
import selectedProjectReducer from './project/selectedProjectSlice'
import  storage from 'redux-persist/lib/storage'


const persistConfig ={
    key: 'root',
    version:1,
    storage
}

const reducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    allProjects:allProjectReducer,
    selectedProject: selectedProjectReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
reducer: persistedReducer
})

export default store