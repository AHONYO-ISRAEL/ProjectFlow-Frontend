import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel, Typography, Button, Snackbar ,Stack} from '@mui/material';

const StartTask = ({ devId, startTaskOpen, handleStartTaskClose }) => {
  const [devTasks, setDevTasks] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const getDevTasks = async () => {
    try {
      const devResponse = await axios.get(`http://localhost:3000/api/dev/${devId}/tasks/get`);
      if (devResponse.status === 200) {
        setDevTasks(devResponse.data.developers.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevTasks();
  });

  const handleTaskSelection = (event) => {
    setTaskId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const newStatus = 'In Progress'
      setLoading(true);
      const response = await axios.post(`http://localhost:3000/api/task/${taskId}/update/status/${newStatus}`);
        if(response.status === 200){
            setSnackbarOpen(true);

        }
      setLoading(false);

      // Close the modal after successful submission
      handleStartTaskClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={startTaskOpen} onClose={handleStartTaskClose} aria-labelledby="modal-modal-startTask" aria-describedby="modal-startTask-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '25vw',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            padding: '70px',
            borderRadius: '45px',
          }}
          component="form"
        >
            <Stack direction={'column'}>
          <FormControl>
            <FormLabel id="start-a-task">Choisir la tâche</FormLabel>
            
            <RadioGroup
              aria-labelledby="start-task-group-label"
              name="radio-startTask-group"
              value={taskId}
              onChange={handleTaskSelection}
            >
              {devTasks?.length === 0 ? (
                <Typography>Aucune tâche ne vous est affectée pour le moment</Typography>
              ) : (
                devTasks?.map((task) => (
                  <FormControlLabel key={task.id} value={task.id} control={<Radio />} label={task.taskName} />
                ))
              )}
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message="Task submitted successfully!" />
    </>
  );
};

StartTask.propTypes = {
  devId: PropTypes.number,
  handleStartTaskClose: PropTypes.func,
  startTaskOpen: PropTypes.bool,
};

export default StartTask;
