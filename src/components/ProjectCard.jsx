import {  Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types'




const ProjectCard = ({ project }) => {

    
  return (
    <Card sx={{ minWidth: 350,maxWidth: 350, minHeight: 400, maxHeight:400,  margin: '10px', display: 'flex'  ,padding : '30px' }}>
      <CardContent>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}  variant='h3' >
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
      </CardContent>
    </Card>
  );
};


ProjectCard.propTypes={
    project: PropTypes.object,
}

export default  ProjectCard

/*
const TwoDimensionLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TwoDimensionLayout;
*/