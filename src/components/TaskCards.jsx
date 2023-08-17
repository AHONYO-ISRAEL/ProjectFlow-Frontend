import { Card, CardHeader, CardContent, Grid, AvatarGroup, IconButton } from "@mui/material";
import PropTypes from 'prop-types'
import Avatars from './Avatars';
import { blue, orange, green, } from '@mui/material/colors';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react'
import UpdateTask from './adminComponents/adminModals/UpdateTask'
const TaskCards = ({ tasks }) => {

  const taskStatuses = ["Not Started", "In Progress", "Completed"];
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const handleTaskModalOpen = () => setTaskModalOpen(true);
  const handleTaskModalClose = () => setTaskModalOpen(false);

  const [clickedTask, setClickedTask] = useState({})



  return (
    <>
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
                    <>
                      <UpdateTask taskModalOpen={taskModalOpen} handleTaskModalClose={handleTaskModalClose} task={clickedTask} />
                      <Card
                        key={task.id}
                        sx={{ mb: 2, background: 'linear-gradient(135deg, rgba(91,208,236,1) 70%, rgba(255,255,255,1) 75%)', color: 'black' }}
                      >
                        <CardHeader title={task.taskName} action={
                          <IconButton>
                            <CreateIcon onClick={() => {
                              handleTaskModalOpen()

                              setClickedTask({
                                id: task.id,
                                taskName: task.taskName,
                                description: task.description,
                                durationDays: task.durationDays,
                                durationHours: task.durationHours,
                              })
                            }} />
                          </IconButton>

                        }
                        />
                        <CardContent>
                          <AvatarGroup>
                            <Avatars Data={task.developers} />
                          </AvatarGroup>
                        </CardContent>

                      </Card>
                    </>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

TaskCards.propTypes = {
  tasks: PropTypes.array,
}

export default TaskCards;
