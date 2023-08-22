import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

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


const DevProjectList = ({projectDev,projectId, isDevOpen, handleDevClose}) => {
    const onUnassign = async(devId)=>{
        try{
        await axios.post(baseUrl+ `developer/${devId}/unassign/project/${projectId}`)

}
catch(error){
console.log(error)
}
    }
  return (
    
    <>
       <Modal   open={isDevOpen} onClose={handleDevClose} >
        <Box  sx={formStyles} >
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell  sx={{ width: 'calc(100% / 2 )', textAlign: 'center', fontWeight: 'bold' }} >Nom du developpeur</TableCell>
                                <TableCell  sx={{ width: 'calc(100% / 2 )', textAlign: 'center', fontWeight: 'bold' }} >Action</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <TableBody>
                                
                                {
                                  projectDev.developers?.map(dev=>(
                                      <TableRow key={dev.id}>
                                      <TableCell  sx={{ width: 'calc(100% / 2 )', textAlign: 'center' }}  > {dev.user.username} </TableCell>
                                      <TableCell  sx={{ width: 'calc(100% / 4 )', textAlign: 'center'}} >
                                          <Button   onClick={()=>{
                                              onUnassign(dev.id)
                                          }} >
                                          Retirer du projet
                                          </Button>
                                          
                                      </TableCell>
                                      </TableRow>
                                  ))
                                }
                              </TableBody>
        </TableContainer>
        </Box>
      </Modal>
    </>
  )
}
DevProjectList.propTypes={
    projectDev :PropTypes.object,
    projectId: PropTypes,
    handleDevClose: PropTypes.func,
    isDevOpen:PropTypes.bool,
}
export default DevProjectList
