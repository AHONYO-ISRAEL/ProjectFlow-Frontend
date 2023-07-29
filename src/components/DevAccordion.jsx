import {Accordion, AccordionSummary,  AccordionDetails, Card, CardHeader,Stack,Typography,CardContent} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DevAccordion = ()=>{
return(
    <Accordion    >
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
 
    >
        <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold', fontSize: '28px' }}>
         
        </Typography>
        <Typography sx={{ marginLeft: '50px', left: 0 }}  >   </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Stack direction={'row'}>
            <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 400, margin: '10px', display: 'flex', padding: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                        title="Not Started"
                        titleTypographyProps={{ style: { color: 'blue' } }}
                    />
                    <CardContent>
              
                    </CardContent>
                </div>
            </Card>
            <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 400, margin: '10px', display: 'flex', padding: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                        title="In Progress"
                        titleTypographyProps={{ style: { color: 'orange' } }}
                    />
                    <CardContent>
               
                    </CardContent>
                </div>
            </Card>
            <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 400, margin: '10px', display: 'flex', padding: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                        title="Completed"
                        titleTypographyProps={{ style: { color: 'green' } }}
                    />
                    <CardContent>
                
                    </CardContent>
                </div>
            </Card>

        </Stack>

    </AccordionDetails>
</Accordion>
)
}

export default DevAccordion