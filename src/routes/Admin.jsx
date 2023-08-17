import  AdminElement from  '../roleElement/AdminElement'
import {Routes, Route} from 'react-router-dom'
import VerticalNavBar from '../components/layout/adminLayout/VerticalNavBar'
import ProjectsBody from '../components/adminComponents/adminBodies/ProjectsBody'
import HomeBody from '../components/adminComponents/adminBodies/HomeBody'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import ManageAccountsBody from '../components/adminComponents/adminBodies/ManageAccountsBody'
import DashboardBody from '../components/adminComponents/adminBodies/DashboardBody'
import CollaborateBody from '../components/adminComponents/adminBodies/CollaborateBody'
import SelectedProject from '../components/adminComponents/adminBodies/SelectedProject'
import DevelopersBody from '../components/adminComponents/adminBodies/DevelopersBody'
import ClientsBody from '../components/adminComponents/adminBodies/ClientsBody'

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