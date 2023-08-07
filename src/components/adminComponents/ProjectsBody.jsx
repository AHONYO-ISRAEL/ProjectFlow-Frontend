import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import ProjectCard from '../ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects , resetAllProjects} from '../../features/project/allProjectSlice';
import { Link, useParams } from 'react-router-dom';

const ProjectsBody = () => {
    const {  projectId } = useParams();


  const dispatch = useDispatch();
  const AllProjects = useSelector((state) => state.allProjects);

  const [loading, setLoading] = useState(true);

  // Fetch projects from the API and update the Redux state
  const getAllProject = async () => {

    try {
      const response = await axios.get('http://localhost:3000/api/admin/project/get');
      dispatch(resetAllProjects())
      dispatch(getAllProjects(response.data.projects));
      console.log(response.data.projects);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getAllProject();
  }, []);
/* eslint-enable react-hooks/exhaustive-deps */
  console.log(AllProjects);

  // Show a loading message if projects are being fetched
  if (loading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  // If projects are available, render them using 'ProjectCard' component
  if (AllProjects.length > 0) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex' , marginLeft: '35px'}}>
        <Grid container spacing={2}>
          {AllProjects.map((project) => (
            <Link key={project.id}   style={{textDecoration:'none'}} to={`/project/${project.id}`} >
            <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
              <ProjectCard project={project} />
            </Grid>
            </Link>
          ))}
        </Grid>
      </Box>
    );
  } else {
    return <Typography variant="h3">No Project  Created</Typography>;
  }
};

export default ProjectsBody;
