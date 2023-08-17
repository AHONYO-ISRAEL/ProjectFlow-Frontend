import { Card, CardContent, Typography, Skeleton , Grid} from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProjectsBody = () => {
  const userInfo = useSelector((state) => state.auth);
  const [projectDevsData, setProjectDevsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = parseInt(userInfo.userId)
  const getProjectDevs = async () => {
    try {
      const devResponse = await axios.get(`http://localhost:3000/api/dev/${userId}/projects/get`);
      if (devResponse.status === 200) {
        setProjectDevsData(devResponse.data.projects);
        setLoading(false); 
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    getProjectDevs();
  }, []);

  return (
    <>
      {loading ? ( 
        <div style ={{display: 'flex', justifyContent:'space-between'}}>
          <Skeleton variant="rectangular" height={150} sx={{ marginBottom: '10px' }} />
          <Skeleton variant="rectangular" height={150} sx={{ marginBottom: '10px' }} />
          <Skeleton variant="rectangular" height={150} sx={{ marginBottom: '10px' }} />
        </div>
      ) : (
        <Grid container spacing={3}>
      {  projectDevsData.map((project) => (
                    <Link key={project.id}   style={{textDecoration:'none'}} to={`/project/${project.id}`} >
            <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>

          <Card
            key={project.id}
            sx={{
              minWidth: 300,
              maxWidth: 300,
              minHeight: 250,
              maxHeight: 300,
              margin: '10px',
              display: 'flex',
              padding: '30px',
            }}
          >
            <CardContent>
              <Typography gutterBottom sx={{ fontWeight: 'bold' }} variant="h4">
                {project.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{project.description}</Typography>

              {project.endDate && (
                <Typography sx={{ fontSize: 12, color: '#777' }}>
                  Date de fin: {new Date(project.endDate).toDateString()}
                </Typography>
              )}
              <Typography>Status: {project.status}</Typography>
            </CardContent>
          </Card>
          </Grid>
          </Link>
        ))
        }
        </Grid>
      )}
    </>
  );
};

export default ProjectsBody;
