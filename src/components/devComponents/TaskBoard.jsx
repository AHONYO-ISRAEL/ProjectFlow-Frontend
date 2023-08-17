import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, CardHeader, Grid, Box, Button , Stack} from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { blue, orange, green, } from '@mui/material/colors';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


const TaskBoard = ({ projectId, userId }) => {
  const [sectionsData, setSectionsData] = useState([])

  const getSectionsData = async () => {
    try {
      const sectionResponse = await axios.get(`http://localhost:3000/api/developer/${userId}/project/${projectId}/sections/tasks/get`)
      if (sectionResponse.status === 200) {
        setSectionsData(sectionResponse.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSectionsData()
  })
  const taskStatuses = ["Not Started", "In Progress", "Completed"];



  return (
    <>
      <Box>
        {sectionsData.map((sectionData) => (
          <Accordion key={sectionData.id} sx={{ marginTop: '50px' }} >
            <AccordionSummary >
              <Typography fontWeight={'bold'} variant='h5'>{sectionData.sectionName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {taskStatuses.map((status, index) => (
                  <Grid key={index} item xs={4}>
                    <Card   >
                      <CardHeader
                        title={status}
                        sx={{
                          color:
                            status === "Not Started"
                              ? blue[500]
                              : status === "In Progress"
                                ? orange[500]
                                : green[500],

                        }}
                      />
                      <CardContent>
                        {sectionData.tasks
                          .filter((task) => task.status === status)
                          .map((task) => (
                            <Card
                              key={task.id}
                              sx={{ mb: 2, background: 'linear-gradient(135deg, rgba(91,208,236,1) 70%, rgba(255,255,255,1) 75%)', color: '#fff' }}
                            >
                              <CardHeader title={task.taskName} />
                              <CardContent>
                                {
                               task.status==='Not Started'?<Button variant={'outlined'} sx={{ color: 'inherit' }} value={task.id} onClick={async () => {
                                   
                                     const newStatus = 'In Progress'
                                     await axios.post(`http://localhost:3000/api/task/${task.id}/update/status/${newStatus}`);
                                
                                   }}><DoubleArrowIcon /></Button> :task.status==='In Progress'?  <Stack  direction={'row'}>   
                                      <Button sx={{ color: 'inherit', transform: 'rotate(180deg)' }} onClick={async () => {
                                      const newStatus = 'Not Started'
                                      await axios.post(`http://localhost:3000/api/task/${task.id}/update/status/${newStatus}`)  }} >   <DoubleArrowIcon variant={'outlined'} value={task.id} /></Button>  
                                    <Button variant={'outlined'} sx={{ color: 'inherit' }} value={task.id} onClick={async () => {
                                    const newStatus = 'Completed'
                                    await axios.post(`http://localhost:3000/api/task/${task.id}/update/status/${newStatus}`);
                               
                                  }}><DoubleArrowIcon /></Button>    </Stack>:
                                      <Button sx={{ color: 'inherit', transform: 'rotate(180deg)' }} onClick={async () => {
                                           const newStatus = 'In Progress'
                                           await axios.post(`http://localhost:3000/api/task/${task.id}/update/status/${newStatus}`);
      
                                        }} >   <DoubleArrowIcon variant={'outlined'} value={task.id} /></Button>

                                }
                              </CardContent>
                            </Card>
                          ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

TaskBoard.propTypes = {
  userId: PropTypes.number,
  projectId: PropTypes.number
}

export default TaskBoard;
