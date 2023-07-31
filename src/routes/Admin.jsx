import  AdminElement from  '../roleElement/AdminElement'
import {Routes, Route} from 'react-router-dom'
import VerticalNavBar from '../components/layout/adminLayout/VerticalNavBar'
import ProjectsBody from '../components/adminComponents/ProjectsBody'
import HomeBody from '../components/adminComponents/HomeBody'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import ManageAccountsBody from '../components/adminComponents/ManageAccountsBody'
import DashboardBody from '../components/adminComponents/DashboardBody'
import CollaborateBody from '../components/adminComponents/CollaborateBody'
import SelectedProject from '../components/adminComponents/SelectedProject'
import DevelopersBody from '../components/adminComponents/DevelopersBody'
import ClientsBody from '../components/adminComponents/ClientsBody'

const Admin = ()=>{
  const userInfo = useSelector((state)=>state.auth)

return(
    <Routes>
        <Route path={'/admin/home'}    element=  {
          <AdminElement>
    <VerticalNavBar  body={
      <HomeBody child={
        <Typography variant='h2'>Welcome {userInfo.userName}  </Typography>
       }/>
  } />
  </AdminElement>
}  />
<Route  path={'/admin/projects'}    element ={
  <AdminElement>
  <VerticalNavBar  body={
    <ProjectsBody/>
  } />
  </AdminElement>
} />
<Route  path={'/admin/ManageAccounts'}    element ={
  <AdminElement>
  <VerticalNavBar  body={
    <ManageAccountsBody/>
  } />
  </AdminElement>
} />
<Route  path={'/admin/Dashboard'}    element ={
  <AdminElement>
  <VerticalNavBar  body={
    <DashboardBody/>
  } />
  </AdminElement>
} />
<Route  path={'/admin/Collaborate'}    element ={
  <AdminElement>
  <VerticalNavBar  body={
    <CollaborateBody/>
  } />
  </AdminElement>
} />
<Route  path={'/project/:projectId'}    element ={
  <AdminElement>
  <VerticalNavBar  body={
    <SelectedProject/>
  } />
  </AdminElement>
} />
<Route  path={'/admin/Developers'}  element={
  <AdminElement>
    <VerticalNavBar body={
    <DevelopersBody/>

    }/>
  </AdminElement>
}   />
<Route  path={'/admin/Clients'}  element={
  <AdminElement>
    <VerticalNavBar  body={    
    <ClientsBody/>
} />
  </AdminElement>
}   />

    </Routes>
)
}

export default Admin