import  ClientElement from  '../roleElement/ClientElement'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/client/Home'

const Client = ()=>{
return(
    <Routes>
        <Route path={'/client/home'}    element=  {
  <ClientElement>
<Home/>
  </ClientElement>
}  />
    </Routes>
)
}

export default Client