import { useSelector } from 'react-redux'
import {Stack, Paper, Typography, Grid, Box} from '@mui/material'
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
          <Grid spacing={2} container sx={{ marginBottom: '30px' }}>
        <Grid item xs={8}>
          <Box sx={{ background: 'linear-gradient(125deg, rgba(91,208,236,1) 60%, rgba(255,255,255,1) 65%)',  padding: '35px', borderRadius: '5px', boxShadow:'0px 1px 2px gray' }} >

              {<Typography variant={'h3'}>Welcome {userInfo.userName} </Typography>}
            </Box>
        </Grid>

          <Grid item xs={4}>
          <Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', }}  onClick={handleStartTaskOpen} >
          <AddIcon sx={{ fontSize: 80,  cursor: 'pointer' }} />
          <Typography variant="h6" >Commencer une tâche </Typography>
        </Paper>
          </Grid>
      </Grid>


        <StartTask devId={userInfo.userId} startTaskOpen={startTaskOpen} handleStartTaskClose={handleStartTaskClose}   />


    </>
)
}

export default HomeBody