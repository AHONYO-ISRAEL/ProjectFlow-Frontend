import  PublicElement from  '../roleElement/PublicElement'
import Login from '../pages/authentication/Login'

import {Routes, Route} from 'react-router-dom'

const Public = ()=>{
    return(
        <Routes>
            <Route path={'/'} element = {
                <PublicElement>
                        <Login/>
                </PublicElement>
            } />
        </Routes>
    )
}

export default  Public