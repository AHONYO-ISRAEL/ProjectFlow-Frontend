import { Box, Stack, Button, Modal, Autocomplete, TextField, } from '@mui/material';
import { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const formStyles = {
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
  borderRadius: '5px',
};

const baseUrl = 'http://localhost:3000/api/'

const DevSelectTaskModal = ({ selectTaskOpen, handleSelectTaskClose, devId, devTaskData }) => {

  const [filteredTasks, setFilteredTasks] = useState([])
  const [tasks, setTasks] = useState([]);
  const getAllTasks = async () => {
    try {
      const taskResponse = await axios.get(baseUrl + 'admin/task/all/get')
      if (taskResponse.status === 200) {
        setTasks(taskResponse.data.tasks)
        const unassignedTaskIds = devTaskData.map(item => item.taskId);
        setFilteredTasks(tasks.filter(task => unassignedTaskIds.includes(task.id)));

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllTasks()
  })

  useEffect(() => {
    // Filter tasks based on devTaskData once tasks have been fetched
    const unassignedTaskIds = devTaskData.map(item => item.taskId);
    setFilteredTasks(tasks.filter(task => unassignedTaskIds.includes(task.id)));
  }, [tasks, devTaskData]);

  const [selectedTasks, setSelectedTasks] = useState([]);


  const handleDevTasks = () => {
    try {
      selectedTasks?.forEach(async (selectedTask) => {
        const response2 = await axios.post(`http://localhost:3000/api/admin/dev/assign/task`, { devId: devId, taskId: selectedTask.id});
        if (response2.status === 200) {
   handleSelectTaskClose()
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal open={selectTaskOpen} onClose={handleSelectTaskClose} >
        <Box component="form" sx={formStyles}>
          <Stack direction="row" sx={{ alignItems: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <Autocomplete
              multiple
              id="task-select"
              value={selectedTasks}
              onChange={(event, newValue) => {
                setSelectedTasks(newValue);
              }}
              options={filteredTasks}
              getOptionLabel={(option) => option.taskName}
              renderInput={(params) => <TextField {...params} label="Choisir les taches" />}
              fullWidth
            />

          </Stack>
          <Button sx={{ backgroundColor: 'rgba(91,208,236,1)', marginTop: '30px', marginLeft: '30%' }} onClick={handleDevTasks}>
            Valider
          </Button>

        </Box>
      </Modal>
    </>
  )
}

DevSelectTaskModal.propTypes = {
  handleSelectTaskClose: PropTypes.func,
  selectTaskOpen: PropTypes.bool,
  devId: PropTypes.number,
  devTaskData: PropTypes.array
};

export default DevSelectTaskModal