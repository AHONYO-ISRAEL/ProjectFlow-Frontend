import { useSelector } from 'react-redux';
import { Grid, Card, CardHeader, Typography, Stack, CircularProgress } from '@mui/material';

const DashboardBody = () => {
  const allProjects = useSelector((state) => state.allProjects);
  const projectStatuses = ["Not Started", "In Progress", "Completed"];


  return (
    <>
      <Grid container spacing={2}>
        {projectStatuses.map((status, index) => {
          const statusProjects = allProjects.filter((project) => project.status === status);
          const percentComplete = (statusProjects.length / allProjects.length) * 100;

          return (
            <Grid
              key={index}
              item
              xs={4}
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                paddingTop: '15px', 
              }}
            >
              <Card sx={{ height: '30vh', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' , }}>
                <CardHeader title={status} />
                <Stack direction="column" sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: '10px' }}>
                  <CircularProgress
                    variant="determinate"
                    value={percentComplete}
                    size={100}
                    sx={{
                      color: `linear-gradient(70deg, rgba(91,208,236,1), rgba(255,255,255,1) 65%)`,
                      position: 'relative',
                    }}
                 / >
   
                  <Typography variant="h6" component="div" color="textSecondary">
                      {statusProjects.length} / {allProjects.length}
                    </Typography>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default DashboardBody;
