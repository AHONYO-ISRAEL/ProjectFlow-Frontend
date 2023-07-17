import  AdminElement from  '../roleElement/AdminElement'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/admin/Home'

const Admin = ()=>{
return(
    <Routes>
        <Route path={'/admin/home'}    element=  {
  <AdminElement>
<Home/>
  </AdminElement>
}  />
    </Routes>
)
}

export default Admin