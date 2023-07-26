import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Stack,   } from '@mui/material';
import axios from "axios"
import { useEffect, useState, } from "react";
import Avatars from './Avatars';








const ProjectCard = ({ project }) => {

const [projectDevsData, setProjectDevsData] = useState([])

  const getProjectDevs = async ()=>{
    try {
      const devResponse = await axios.get(`http://localhost:3000/api/admin/project/${project.id}/dev`)
      if(devResponse.status===200){
        setProjectDevsData(devResponse.data.projectDevs)
        console.log(devResponse.data.projectDevs)

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getProjectDevs()
  })



  return (
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 350,
        minHeight: 300,
        maxHeight: 350,
        margin: '10px',
        display: 'flex',
        padding: '30px',
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }} variant="h3">
          {project.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>{project.description}</Typography>
        <Typography sx={{ fontSize: 12, color: '#777' }}>
          Start Date: {new Date(project.startDate).toDateString()}
        </Typography>
        {project.endDate && (
          <Typography sx={{ fontSize: 12, color: '#777' }}>
            End Date: {new Date(project.endDate).toDateString()}
          </Typography>
        )}
        <Typography>Status: {project.status}</Typography>
        <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Avatars    Data={projectDevsData}/>
      </Stack>
      </CardContent>

    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object,
};

export default ProjectCard;
