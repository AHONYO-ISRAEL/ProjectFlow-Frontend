import { useSelector } from 'react-redux'
import { Paper, Typography, Grid, Box,Tabs, Tab} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import  StartTask from '../devModals/StartTask'
import {useState} from 'react'
import  TasksStats from '../TasksStats'



const HomeBody = ()=>{
    const userInfo = useSelector((state)=>state.auth)
    console.log(userInfo.userId)
    const [startTaskOpen, setStartTaskOpen] = useState(false)
    const handleStartTaskOpen= ()=> setStartTaskOpen(true)
    const handleStartTaskClose =()=> setStartTaskOpen(false)

    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    
return(
    <>
          <Grid spacing={2} container sx={{ marginBottom: '30px' }}>
        <Grid item xs={8}>
          <Box sx={{ background: 'linear-gradient(125deg, rgba(91,208,236,1) 60%, rgba(255,255,255,1) 65%)',  padding: '35px', borderRadius: '5px', boxShadow:'0px 1px 2px gray' }} >

              {<Typography variant={'h3'}  sx={{color:'#fff'}}>Welcome {userInfo.userName} </Typography>}
              <Box sx={{ borderTop: 1, borderColor: 'divider', marginTop: '30px' }}>
					<Tabs value={activeTab} onChange={handleTabChange}  >
						<Tab label="Mes projets" />
						<Tab label="Mes tâches" />
					</Tabs>
				</Box  >
            </Box>
        </Grid>

          <Grid item xs={4}>
          <Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', height:'100%'}}  onClick={handleStartTaskOpen} >
          <AddIcon sx={{ fontSize: 80,  cursor: 'pointer' }} />
          <Typography variant="h6" >Commencer une tâche </Typography>
        </Paper>
          </Grid>
      </Grid>


        <StartTask devId={userInfo.userId} startTaskOpen={startTaskOpen} handleStartTaskClose={handleStartTaskClose}   />
<Box sx={{ display: activeTab === 1 ? 'block' : 'none', marginTop: '20px' }}   >
<TasksStats/>
</Box>

    </>
)
}

export default HomeBody