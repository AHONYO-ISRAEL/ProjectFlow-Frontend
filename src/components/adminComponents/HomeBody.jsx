import   {useState, forwardRef}from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Paper, TextField, Typography, Modal, Box, Snackbar, Grid, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";


import Projects from '../Projects'


import AddIcon from '@mui/icons-material/Add';
import DashboardBody from './DashboardBody';

// Rest of your code...

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const validationSchema = yup.object({
  name: yup.string().required('Project title is required'),
  description: yup.string().required('Description is required'),
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
  padding: '30px',
  borderRadius: '45px'

};


const HomeBody = () => {
const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
const [newProjectId, setNewProjectId]=  useState()

  const [errorMessage, setErrorMessage] = useState('')
  const [severity, setSeverity] = useState('')


  const [snackState, setSnackState] = useState({
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, snackOpen } = snackState;

  const handleSnackClose = () => {
    setSnackState({ ...snackState, snackOpen: false });
  };


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userInfo = useSelector((state) => state.auth)
  /* eslint-disable no-unused-vars */
  const InProgress = useSelector((state) => state.project);
  const auth = useSelector((state) => state.auth)
  console.log(auth.userId)
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      userId: auth.userId,
      accessToken: userInfo.accessToken,
      refreshToken: userInfo.refreshToken
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {

      try {
        setLoading(true)
        const response = await axios.post('http://localhost:3000/api/admin/project/add', values)

        if (response.status === 200) {
          setLoading(false)
           setErrorMessage('Project created successfully')
           setSeverity('success')
           setSnackState({ ...snackState, snackOpen: true })
           setNewProjectId(response.data.project.id)
          navigate(`../project/${newProjectId}`)
          console.log(response)


        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        setErrorMessage(errorMessage)
        setSeverity('error')
        setSnackState({ ...snackState, snackOpen: true })
        setLoading(false)

      }
    },
  });


  return (
    <>

      <Grid spacing={2} container sx={{ marginBottom: '30px' }}>
        <Grid item xs={8}>
          <Box sx={{ background: 'linear-gradient(125deg, rgba(91,208,236,1) 60%, rgba(255,255,255,1) 65%)',  padding: '35px', borderRadius: '5px', boxShadow:'0px 1px 2px gray' }} >

              {<Typography variant={'h3'}>Welcome {userInfo.userName} </Typography>}
            </Box>
        </Grid>

          <Grid item xs={4}>

            <Paper sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
              <AddIcon sx={{ fontSize: 80, cursor: 'pointer' }} onClick={handleOpen} />
              <Typography variant="h6">Ajouter un nouveau projet</Typography>
            </Paper>
          </Grid>
      </Grid>

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <DashboardBody />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={formStyles}  >
          <form onSubmit={formik.handleSubmit}  >
            <TextField
              label="Project Title"
              variant="standard"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
            <TextField
              label="Description"
              variant="standard"
              id="description"
              name="description"
              multiline
              rows={2}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              fullWidth
              sx={{ marginTop: '50px' }}
            />

            <LoadingButton type="submit" variant="contained" color="primary" sx={{ marginTop: '50px' }}
              loading={loading}
            >
              Register Project
            </LoadingButton>
          </form>
        </Box>

      </Modal>
      <Typography variant='h3' sx={{ marginTop: '50px' }} >Projet en cours</Typography>
      <Projects />
    </>
  )
}


export default HomeBody