import  PublicElement from  '../roleElement/PublicElement'
import Login from '../pages/authentication/Login'

import {Routes, Route} from 'react-router-dom'
import Credentials from '../pages/authentication/Credentials'

const Public = ()=>{
    return(
        <Routes>
            <Route path={'/'} element = {
                <PublicElement>
                        <Login/>
                </PublicElement>
            } />

            <Route   path= {'auth/credentials' }  element={
                <PublicElement>
            <Credentials/>
                </PublicElement>
            }    />
        </Routes>
    )
}

export default  Public