import axios from 'axios';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getInProgress, resetProgressProjects } from '../features/project/projectSlice';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Card, CardContent,  } from '@mui/material';
import {useState, useEffect} from 'react'

const Projects = () => {
  const dispatch = useDispatch();
  const InProgress = useSelector((state) => state.project);
  dispatch(resetProgressProjects());
  const [loading, setLoading] = useState(true);
const [progressData, setProgressData] = useState([])
  // Fetch projects from the API and update the Redux state
  const getProgressProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/project/progress/get');
      console.log(response.data);
      dispatch(resetProgressProjects());
      dispatch(getInProgress(response.data.projects)); // Dispatch the 'getInProgress' action to update the Redux state
      setProgressData(response.data.projects)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProgressProjects();
  });

  // Show a skeleton loader if projects are being fetched
  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
        <Skeleton variant="circle" width={80} height={80} />
        <Skeleton variant="text" width={150} height={40} style={{ marginTop: '10px' }} />
        <Skeleton variant="rectangular" width={400} height={200} style={{ marginTop: '20px' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
{
  progressData.length>0?(
    <Grid container spacing={2}>
          {progressData.map((project) => (
            <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
  ): InProgress.length > 0 ? (
    <Grid container spacing={2}>
      {InProgress.map((project) => (
        <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
      <CardContent>
        <AssignmentTurnedInIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No Projects in Progress
        </Typography>
        <Typography variant="body2" color="textSecondary">
          There are currently no projects in progress.
        </Typography>
      </CardContent>
    </Card>
  )
}

    
    </Box>
  );
};

export default Projects;
