import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MuiAlert from '@mui/material/Alert';

import {Paper,Stack,Button,TextField,Typography,  Modal,Box,Snackbar, MenuItem} from '@mui/material';
import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useSelector , } from 'react-redux';


import { v4 as uuidv4 } from 'uuid'
import DevTable from '../DevTable';

 


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

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
    borderRadius: '45px'
  
  };
  

const ManageAccountsBody =()=>{
    const userInfo = useSelector((state) => state.auth)

    const [errorMessage, setErrorMessage] = React.useState('')
    const [severity, setSeverity] = React.useState('')

    const [snackState, setSnackState] = React.useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, snackOpen } = snackState;
    
      const handleSnackClose = () => {
        setSnackState({ ...snackState, snackOpen: false });
      };


    const initialValues = {
        username: '',
        email: '',
        password: uuidv4(), // Generate a random password using uuidv4
        roleName: 'Developer',
        accessToken: userInfo.accessToken,
        refreshToken: userInfo.refreshToken
      };

      const validationSchema = yup.object({
        username: yup.string().required('Required'),
        email: yup.string().email('Invalid email address').required('Required'),
        roleName: yup.string().oneOf(['Developer', 'Client', 'Admin']).required('Role is required'),
      });
    
      const onSubmit = async  (values) => {
        try{
const response = await axios.post('http://localhost:3000/api/auth/signup', values)
if(response.status === 401){
    setErrorMessage('User alreadyregistered')
    setSeverity('error')      
    setSnackState({...snackState,  snackOpen : true})   
}
if(response.status === 200){
    setErrorMessage(values.roleName  + `   `+  values.username + `'s `+`  account created successfully`)
    setSeverity('success')
    setSnackState({...snackState,  snackOpen : true})}
    

        }catch(error){
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setErrorMessage(errorMessage)
                  setSeverity('error')      
                  setSnackState({...snackState,  snackOpen : true})        }
        console.log(values);
      };

      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
      });


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

return(
    <>
      
    <Stack direction = {"row"}  spacing={2}>
          <Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', width: '30vw', padding: '50px', backgroundColor: '#6C63FF' }}>
          <PersonAddIcon sx={{ fontSize: 100, marginRight: '10px', cursor: 'pointer' }} onClick={handleOpen} />
          <Typography variant="h6">Ajouter un nouvel utilisateur</Typography>
        </Paper>

          <Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center', width: '30vw', padding: '50px', backgroundColor: '#6C63FF' }}>
          <PersonAddIcon sx={{ fontSize: 100, marginRight: '10px', cursor: 'pointer' }} onClick={handleOpen} />
          <Typography variant="h6">Ajouter un nouvel utilisateur</Typography>
        </Paper>
    
        </Stack>
        <DevTable/>

        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}  anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
    {errorMessage}
        </Alert>
      </Snackbar>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{marginTop:'30px'}}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{marginTop:'30px'}}
      />
 <TextField
        fullWidth
        id="roleName"
        name="roleName"
        label="Role"
        select
        value={formik.values.roleName }
        onChange={formik.handleChange}
        error={formik.touched.roleName && Boolean(formik.errors.roleName)}
        helperText={formik.touched.roleName && formik.errors.roleName}
        sx={{marginTop:'30px'}}
      >
        <MenuItem value="Developer">Developer</MenuItem>
        <MenuItem value="Client">Client</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
    </Modal>
    </>
)
}

export default ManageAccountsBody