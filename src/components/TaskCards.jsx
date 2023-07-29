import { Card, CardHeader, CardContent, Grid, AvatarGroup } from "@mui/material";
import PropTypes from 'prop-types'
import Avatars from './Avatars';
import { blue, orange, green, amber } from '@mui/material/colors';


const TaskCards = ({ tasks }) => {
    const taskStatuses = ["Not Started", "In Progress", "Completed"];
  
    return (
      <Grid container spacing={2}>
        {taskStatuses.map((status, index) => (
          <Grid key={index} item xs={4}>
            <Card>
              <CardHeader
                title={status}
                sx={{
                  color:
                    status === "Not Started"
                      ? blue[500]
                      : status === "In Progress"
                      ? orange[500]
                      : green[500],
               
                }}
              />
              <CardContent>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Card
                      key={task.id}
                      sx={{ mb: 2, backgroundColor: '#037971', color: 'black' }}
                    >
                      <CardHeader title={task.taskName}    />
                      <CardContent>
                        <AvatarGroup>
                          <Avatars Data={task.developers} />
                        </AvatarGroup>
                      </CardContent>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  
TaskCards.propTypes={
    tasks: PropTypes.array,
}

export default TaskCards;
