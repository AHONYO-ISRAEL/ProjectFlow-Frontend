import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState, } from "react";
import { Box, Typography, Grid , Card, CardContent, Stack,Tabs, Tab } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import ProjectInfo from "../devModals/ProjectInfo";
import TaskBoard from "../TaskBoard";
import { useSelector } from "react-redux";
import ProjectPublications from "../../ProjectPublications";

const SelectedProject = () => {
    const { projectId } = useParams()
const userInfo = useSelector((state)=>state.auth)

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


const [projectInfoOpen , setProjectInfoOpen] = useState(false)
const  handleProjectInfoOpen = ()=> setProjectInfoOpen(true)
const  handleProjectInfoClose = ()=> setProjectInfoOpen(false)

const [activeTab, setActiveTab] = useState(0);

const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
};

const [pubData, setPubData] = useState([])

const getProjectPubs = async () => {
    try {
        const pubResponse = await axios.get(`http://localhost:3000/api/project/${projectId}/publications/get`)
        if (pubResponse.status === 200) {
            setPubData(pubResponse.data.publications)
        }
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    getProjectPubs()
})
    return (
        <>
            <Grid container  spacing={2}  sx={{marginBottom:'30px'}} >
                <Grid item xs={8}>
                    <Box sx={{ background: 'linear-gradient(125deg, rgba(91,208,236,1) 60%, rgba(255,255,255,1) 65%)', padding: '36px', borderRadius: '5px',  boxShadow:'0px 1px 2px gray'}}  >
                        <Typography variant="h3" >    {projectData.name}   </Typography>
                        <Typography variant='p' > {projectData.description}  </Typography>
                    </Box>
                    <Box sx={{ borderTop: 1, borderColor: 'divider', marginTop: '30px' }}>
					<Tabs value={activeTab} onChange={handleTabChange}  >
						<Tab label="Vue d'ensemble" />
						<Tab label="Sections" />
					</Tabs>
				</Box  >
                </Grid>
                <Grid item xs={4} >
				<Card sx={{ Width: 400, display: 'flex', textAlign: 'center' }} onClick={handleProjectInfoOpen} >  
					<CardContent sx={{textAlign:'center'}}>

						<Stack direction={'column'} sx={{textAlign:'center'}}>
                            <InfoIcon  sx={{ fontSize: 80, cursor: 'pointer' }} />
							<Typography  variant="h6" fontWeight={'bold'}  >Voir les informations du projet </Typography>

						</Stack>
					</CardContent>
				</Card>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1, width: '80vw', display: activeTab === 1 ? 'block' : 'none', marginTop: '20px' }}  >
            <TaskBoard  userId={userInfo.userId}   projectId={ parseInt(projectId)  }  sx={{marginTop:'30px'}}    />

            </Box>
            <Box sx={{ display: activeTab === 0 ? 'block' : 'none', marginTop: '20px' }}  >
            {
							pubData?.length > 0 ? (
								<ProjectPublications pubData={pubData} />
							) : (
								<Typography>Aucune publication </Typography>
							)
						}
            </Box>
            <ProjectInfo  projectInfoOpen={projectInfoOpen}  handleProjectInfoClose={handleProjectInfoClose} projectData={projectData}  clientName={clientName}  />
        </>
    )
}

export default SelectedProject