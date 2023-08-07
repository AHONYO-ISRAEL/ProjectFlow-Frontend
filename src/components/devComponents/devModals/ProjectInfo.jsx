import PropTypes from 'prop-types'
import {Modal, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Stack, Grid, Card, CardHeader, CardContent} from '@mui/material'

const ProjectInfo = ({projectInfoOpen , handleProjectInfoClose, projectData, clientName})=>{
return(
    <>
    <Modal   open ={projectInfoOpen} onClose={handleProjectInfoClose}>
<Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            bgcolor: 'background.paper',
            border:'none',
            p: 4,
            padding: '70px',
            borderRadius: '10px',
          }}
>
    <Grid container spacing={2}>
<Grid item xs={6}>
<Card>
    <CardHeader  title={'Projet'} />
    <CardContent>
    <Typography   variant='h4' fontWeight={'bold'}> {projectData.name}  </Typography>

    </CardContent>
</Card>
</Grid>
<Grid item xs={6}>
<Card>
    <CardHeader  title={'Client'} />
    <CardContent>
    <Typography   variant='h4' fontWeight={'bold'}>   {clientName}  </Typography>

    </CardContent>
</Card>
</Grid>
    </Grid>

<Accordion   sx={{marginTop:'30px'}} >
    <AccordionSummary>
        <Typography>Description</Typography>

    </AccordionSummary>
    <AccordionDetails>
        {projectData.description}
    </AccordionDetails>
</Accordion>
<Stack direction={'row'}>
<Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', width: '30vw', padding: '50px', backgroundColor: 'background.paper' }}>
<Typography sx={{ fontSize: 12, color: '#777' }}>
                Start Date: {new Date(projectData.startDate).toDateString()}
              </Typography>
</Paper>
<Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', width: '30vw', padding: '50px', backgroundColor: 'background.paper' }}>
<Typography sx={{ fontSize: 12, color: '#777' }}>
                End Date: {new Date(projectData.endDate).toDateString()}
              </Typography>
              </Paper>
</Stack>


</Box>

    </Modal>
    </>
)
}

ProjectInfo.propTypes = {
    projectInfoOpen: PropTypes.boolean,
    handleProjectInfoClose: PropTypes.func,
    projectData:PropTypes.object,
    clientName: PropTypes.string
}

export default ProjectInfo