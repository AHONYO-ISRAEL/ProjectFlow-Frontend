import axios from 'axios'
import {useEffect, useState} from 'react'
import {Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import  ManageAccountsBody from './ManageAccountsBody'
const ClientsBody = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [clientData, setClientData] = useState([])
const getClients  = async ()=>{
try{
const clientResponse  = await axios.get('http://localhost:3000/api/admin/client/get')
if(clientResponse.status === 200){
setClientData(clientResponse.data.clients)
console.log(clientResponse.data)
}
}catch(error){
  console.log(error)
}
}
useEffect(()=>{
  getClients()
})

  return (
    <>
            <Button  onClick={handleOpen} >Ajouter un nouveau client</Button>
   <TableContainer  component={Paper}   >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{textAlign :'center'}}   >ClientID</TableCell>
          <TableCell sx={{textAlign :'center'}} >Client Name</TableCell>
          <TableCell sx={{textAlign :'center'}} >Client Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow hover = 'true'>
        </TableRow>
        {
          clientData?.map((client)=>(
            <TableRow  key={client.id} hover>
              <TableCell sx={{textAlign :'center'}} >    <Typography>  {client.id} </Typography></TableCell>
          <TableCell sx={{textAlign :'center'}} > <Typography> {client.username}  </Typography> </TableCell>
          <TableCell sx={{textAlign :'center'}} ><Typography> {client.email} </Typography></TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
   </TableContainer>
   <ManageAccountsBody open={open} handleClose={handleClose} role={'client'}   />
    </>
  )
}

export default ClientsBody
