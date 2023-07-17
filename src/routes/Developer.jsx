import  DeveloperElement from  '../roleElement/DeveloperElement'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/client/Home'

const Developer= ()=>{
return(
    <Routes>
        <Route path={'/client/home'}    element=  {
  <DeveloperElement>
<Home/>
  </DeveloperElement>
}  />
    </Routes>
)
}

export default Developer