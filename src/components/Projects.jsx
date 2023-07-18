import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getInProgress } from '../features/project/projectSlice';

const Projects = () => {
  const dispatch = useDispatch();
  const InProgress = useSelector((state) => state.project);

  const [loading, setLoading] = useState(true);

  // Fetch projects from the API and update the Redux state
  const getProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/project/progress/get');
      console.log(response.data);
      dispatch(getInProgress(response.data.projects)); // Dispatch the 'getInProgress' action to update the Redux state
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  console.log(InProgress);

  // Show a loading message if projects are being fetched
  if (loading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  // If projects are available, render them using 'ProjectCard' component
  if (InProgress.length > 0) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {InProgress.map((project) => (
            <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else {
    // If no projects are available, show a message
    return <Typography variant="h3">No Project in progress</Typography>;
  }
};

export default Projects;
