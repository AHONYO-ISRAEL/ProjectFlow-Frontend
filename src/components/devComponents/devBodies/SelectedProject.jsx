import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState, } from "react";
import { Box, Typography, Grid , Card, CardContent, Stack, Button} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';


const SelectedProject = () => {
    const { projectId } = useParams()


    const [projectData, setProjectData] = useState('');
    const [clientName, setClientName] = useState('');
    const [loading, setLoading] = useState(true);
    const getAProject = async () => {
        try {
            const response = axios.get(`http://localhost:3000/api/admin/project/get/${projectId}`)
            setProjectData((await response).data.project)
            setClientName((await response).data.clientName)
            setLoading(false)
        } catch (error) {
            console.error('error getting project ', error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getAProject()
    }, [projectId])

    return (
        <>
            <Grid container  spacing={2} >
                <Grid item xs={8}>
                    <Box sx={{ backgroundColor: '#037971', padding: '30px', borderRadius:'10px'}} >
                        <Typography variant="h1" >    {projectData.name}   </Typography>
                        <Typography variant='p' > {projectData.description}  </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} >
				<Card sx={{ Width: 400, display: 'flex', paddingBottom: '20px', textAlign: 'center' }}>
					<CardContent sx={{textAlign:'center'}}>

						<Stack direction={'column'}>
                            <InfoIcon  sx={{ fontSize: 100, marginRight: '10px', cursor: 'pointer' }} />
							{projectData.clientId === null ? <Button variant="contained" color="primary" sx={{ marginTop: '50px' }}  >Ajouter le client </Button> : <Typography variant='h6' > {clientName}  </Typography>
							}

						</Stack>
					</CardContent>
				</Card>
                </Grid>
            </Grid>
        </>
    )
}

export default SelectedProject