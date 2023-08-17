import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Box, Typography, Grid, Paper, LinearProgress , Stack} from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
const baseUrl = 'http://localhost:3000/api/'
const TasksStats = () => {
    const userInfo = useSelector((state) => state.auth)

    const [tasksData, setTasksData] = useState([])
    const getAssignedTasks = async () => {
        try {
            const tasksResponse = await axios.get(baseUrl + `dev/${userInfo.userId}/tasks/all/get`)
            if (tasksResponse.status === 200) {
                setTasksData(tasksResponse.data.developers.tasks)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAssignedTasks()
    })

    console.log(tasksData)

    const  getTimeToDueDate   =(task)=> {
         const startDate = new Date(task.startDate);
        const durationMillis = (task.durationDays * 24 * 60 * 60 * 1000) + (task.durationHours * 60 * 60 * 1000);
        const dueDate = new Date(startDate.getTime() + durationMillis);
      
        const currentDate = new Date();
      
        if (currentDate > dueDate) {
          return (
            <Stack  direction={'row'}  sx={{marginTop:'10px'}}>
                <TimerOffIcon  sx={{color:'#fff'}}  />
            <Typography  sx={{color:'#fff'}}  > Retard  </Typography>
            </Stack>
          );
        }
      
        const timeDiffMillis = dueDate - currentDate;
        const days = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiffMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
        return   (
           <Stack   direction={'row'}   sx={{marginTop:'10px'}}>
                <TimerIcon   sx={{color:'#fff'}} />
                 <Typography sx={{color:'#fff'}} >
                {days} jour(s) et {hours} heures
                </Typography>
                </Stack>
        )
      }
      
    return (
        <>
            <Box  >
                {
                    tasksData?.length === 0 ? (
                        <Typography>Aucune tâche ne vous est assignée à l&apos;instant</Typography>
                    ) : (
                        <>
                            <Typography variant='h5' sx={{ marginBottom: '20px', fontWeight: 'bold' }} >Ma Progression</Typography>
                            <Grid xs={12} item>
                                <Box sx={{ width: '80%', backgroundColor: 'bgcolor.paper' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {`${tasksData.filter(
                                            (task) => task.status === 'Completed'
                                        ).length} / ${tasksData.length} tâches completées`}
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            (tasksData.filter(
                                                (task) => task.status === 'Completed'
                                            ).length /
                                                tasksData.length) *
                                            100
                                        }
                                    />
                                </Box>
                            </Grid>

                            <Box sx={{marginTop:'30px'}}>
                                <Typography variant={'h5'}  sx={{fontWeight:'bold'}} >Mes taches en cours</Typography>
                                <Grid container spacing={2}>
                                    {
                                        tasksData
                                        .filter((task)=>task.status !=='Completed')
                                        .map((task) => (
                                            <Grid key={task.id} item xs={12} sm={6} md={4} lg={3} >

                                                <Paper  sx={{height:'100px',background: 'linear-gradient(119deg, rgba(0,109,244,1) 24%, rgba(91,208,236,1) 69%)', padding:'20px'}}  >
                                                    <Typography  variant={'h6'}  sx={{color:'#fff'}} >{task.taskName}</Typography>
                                                   {
                                                    getTimeToDueDate(task)
                                                   }
                                                </Paper>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                        </>
                    )
                }
            </Box>
        </>
    )
}




export default TasksStats