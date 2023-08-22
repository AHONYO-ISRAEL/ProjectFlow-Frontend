import {  Modal, TableContainer, Table, TableHead, TableRow, TableCell, Box, TableBody, Button, Snackbar} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import  {useEffect, useState} from 'react'

const formStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    bgcolor: 'background.paper',
    border:'solid 1px rgba(91,208,236,1) ',
    boxShadow: 24,
    p: 4,
    padding: '70px',
    borderRadius: '5px'
  };
const baseUrl = 'http://localhost:3000/api/'


  
const DevList = ({ isDevOpen, handleDevClose, taskId, }) => {
const [taskWithDevs, setTasksWithDevs] =useState([])
const getTaskWithDevs = async ()=>{
    try {
        if(taskId>0){
            const taskResponse = await axios.get(baseUrl+`admin/task/${taskId}/dev`)
            if(taskResponse.status ===200 ){
                setTasksWithDevs(taskResponse.data)
            }
        }

    } catch (error) {
        console.log(error)
    }
}


    useEffect(()=>{
        getTaskWithDevs()
    })


        const onUnassign = async(devId)=>{
            try{
            await axios.post(baseUrl+ `developer/${devId}/unassign/task/${taskId}`)

    }
   catch(error){
    console.log(error)
   }
        }
  return (
    <>
    <Snackbar></Snackbar>
       <Modal   open={isDevOpen} onClose={handleDevClose} >
        <Box  sx={formStyles}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Nom du developpeur</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                
                              {
                                taskWithDevs.developers?.map(dev=>(
                                    <TableRow key={dev.id}>
                                    <TableCell > {dev.user.username} </TableCell>
                                    <TableCell>
                                        <Button   onClick={()=>{
                                            onUnassign(dev.id)
                                        }} >
                                        Retirer de la tâche
                                        </Button>
                                        
                                    </TableCell>
                                    </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
      </Modal> 
    </>
  )
}

DevList.propTypes={
    taskId : PropTypes.object,
    handleDevClose: PropTypes.func,
    isDevOpen:PropTypes.bool,
}

export default DevList
