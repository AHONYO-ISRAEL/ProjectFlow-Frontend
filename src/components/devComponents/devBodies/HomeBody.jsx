import { useSelector } from 'react-redux'
import {Stack, Paper, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import  StartTask from '../devModals/StartTask'
import {useState} from 'react'

const HomeBody = ()=>{
    const userInfo = useSelector((state)=>state.auth)
    console.log(userInfo.userId)
    const [startTaskOpen, setStartTaskOpen] = useState(false)
    const handleStartTaskOpen= ()=> setStartTaskOpen(true)
    const handleStartTaskClose =()=> setStartTaskOpen(false)
return(
    <>
          <Stack spacing={2} direction="row">
        <Paper sx={{ width: '60vw', padding: '50px',  }}   >
        <h1>Welcome {userInfo.userName}  </h1>

        </Paper>
        <Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', width: '30vw', padding: '50px', backgroundColor: '#6C63FF' }}  onClick={handleStartTaskOpen} >
          <AddIcon sx={{ fontSize: 100, marginRight: '10px', cursor: 'pointer' }} />
          <Typography variant="h6" >Commencer une tâche </Typography>
        </Paper>
        <StartTask devId={userInfo.userId} startTaskOpen={startTaskOpen} handleStartTaskClose={handleStartTaskClose}   />
      </Stack>

    </>
)
}

export default HomeBody