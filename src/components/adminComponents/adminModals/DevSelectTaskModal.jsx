import { Box, Stack, Button, Modal, Autocomplete, TextField,  } from '@mui/material';
import { useEffect, useState,  } from 'react';
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

const DevSelectTaskModal = ({selectTaskOpen,handleSelectTaskClose , devId, devTaskData})=>{
const [selectedTasks, setSelectedTasks] = useState()



console.log(devId)


const handleProjectDevs = ()=>{

}
return(
    <>
    <Modal open={selectTaskOpen} onClose={handleSelectTaskClose} aria-labelledby="modal-modal-selectClient" aria-describedby="modal-modal-description">
    <Box component="form" sx={formStyles}>
      <Stack direction="row">
        <Autocomplete
          multiple
          id="task-select"
          value={selectedTasks}
          onChange={(event, newValue) => {
            setSelectedTasks(newValue);
          }}
          options={devTaskData}
          getOptionLabel={(option) => option.taskName}
          renderInput={(params) => <TextField {...params} label="Choisir les taches" />}
          fullWidth
        />

      </Stack>
      <Button sx={{ backgroundColor: 'rgba(91,208,236,1)' }} onClick={ handleProjectDevs}>
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