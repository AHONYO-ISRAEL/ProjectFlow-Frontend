import {useSelector } from 'react-redux'
import {Grid, Card, Typography, Stack} from '@mui/material'
//import {useState} from 'react'

const DashboardBody = () => {
  const allProjects = useSelector((state) => state.allProjects);
  const projectStatuses = ["Not Started", "In Progress", "Completed"];

  return (
    <>
    <Grid  container spacing={2}>
{
  projectStatuses.map((status, index)=>(
    <Grid key={index} item  xs={4}   sx={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent:'center', paddingTop:'30px'}}>
      <Card sx={{height:'30vh'}} >
        <Stack   direction ='column' sx={{textAlign: 'center',  justifyContent: 'center', alignItems: 'center', alignContent:'center', paddingTop:'30px'}}>
<Typography variant = "h2"   >
        {
          allProjects.filter((project)=>project.status === status).length
        }
           </Typography>
           <Typography  variant = "h5">
       {status}   &nbsp;  Projects
        </Typography>
     </Stack>
      </Card>
    </Grid>
    
  ))
}
</Grid>
    </>
  )
}

export default DashboardBody
