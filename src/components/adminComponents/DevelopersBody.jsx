import axios from 'axios'
import {useEffect, useState} from 'react'
import {Accordion,AccordionSummary, AccordionDetails,Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { blue, orange, green, amber } from '@mui/material/colors';


const DevelopersBody = () => {
const [devData, setDevData] = useState([])

  const getdevData= async()=>{
try{
const devResponse = await axios.get('http://localhost:3000/api/admin/dev/task/get')
setDevData(devResponse.data)
}catch(error){
  console.log(error)
}
  }
  useEffect(()=>{
    getdevData()
  })

  return (
    <>
 {devData.map((dev) => (
        <Accordion key={dev.id} sx={{maxHeight: '70vh', 
        overflowY: 'auto',backgroundColor:'#B0BEA9',}}   >
          <AccordionSummary  sx={{ position: 'sticky', top: 0, zIndex: 1}}>
            <div style={{justifyContent:'space-around ', display:'flex', width:'80vw', alignItems:'center', alignContent:'center',  }} >
            <Typography>ID: {dev.id}</Typography>
            <Typography>Username: {dev.user.username}</Typography>
            <Typography>Email: {dev.email}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> <Typography sx={{fontWeight:'bold', textAlign:'center'}}> Task Name</Typography> </TableCell>
                    <TableCell> <Typography sx={{fontWeight:'bold', textAlign:'center'}}> Status</Typography> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dev.tasks.map((task) => (
                        <TableRow key={task.id} sx={{borderRadius:'30px'}}>
              
                          <TableCell sx={{width:'50%', borderRadius:'30px', textAlign:'center'}}>{task.taskName}</TableCell>
                          <TableCell           sx={{
                  backgroundColor:
                    task.status === "Not Started"
                      ? blue[500]
                      : task.status === "In Progress"
                      ? orange[500]
                      : green[500],
                      borderRadius:'5px',
                      textAlign:'center'
                }}> {task.status} </TableCell>
                        </TableRow>
                      
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

export default DevelopersBody
