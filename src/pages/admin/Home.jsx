import { useSelector } from 'react-redux'
import VerticalNavBar from '../../components/VerticalNavBar'
import HomeBody from '../../components/HomeBody'
import {Typography} from '@mui/material'


const Home = ()=>{
    const userInfo = useSelector((state)=>state.auth)

return(
    <>
    <VerticalNavBar      body =  { 
        <>
        <HomeBody    child={
    <Typography variant='h2'>Welcome {userInfo.userName}  </Typography>

        }/>
    </>
    }
/>
    </>
)
}
export default Home