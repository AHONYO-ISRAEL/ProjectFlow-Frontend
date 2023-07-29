import { useSelector } from 'react-redux'
import VerticalNavBar from '../../components/VerticalNavBar'
import HomeBody from '../../components/adminComponents/HomeBody'
import DashboardBody from '../../components/adminComponents/DashboardBody'
import ProjectsBody from '../../components/adminComponents/ProjectsBody'
import CollaborateBody from '../../components/adminComponents/CollaborateBody'
import ManageAccountsBody from '../../components/adminComponents/ManageAccountsBody'
import {Typography} from '@mui/material'


const Home = ()=>{
    const userInfo = useSelector((state)=>state.auth)

return(
    <>
    <VerticalNavBar      Home =  { 
        <>
        <HomeBody    child={
    <Typography variant="h4">Welcome {userInfo.userName}  </Typography>
   }/>
 
    </>
    }
    Dashboard={
        <DashboardBody/>
    }

    Projects ={
        <ProjectsBody/>
    }
    Collaborate ={
<CollaborateBody/>
    }

    ManageAccounts={
        <ManageAccountsBody/>
    }
    

/>
    </>
)
}
export default Home