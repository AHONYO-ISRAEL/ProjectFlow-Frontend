import {  TextField, Modal, Box, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types'
import MuiAlert from '@mui/material/Alert';
import {  forwardRef } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"
import {useState}  from  'react'
import LoadingButton from '@mui/lab/LoadingButton';

const Alert = forwardRef(function Alert (props, ref){
    return  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const formStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25vw',
  bgcolor: 'background.paper',
  border:'solid 1px rgba(91,208,236,1) ',
  boxShadow: 24,
  p: 4,
  padding: '70px',
  borderRadius: '5px'
};

const SectionModal = ({  isModalOpen, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const {projectId} = useParams()

  const initialValues = {
    projectId:projectId,
    sectionName: '',
    description: '',
    startDate: '',
    endDate: ''
  };

  const onSubmit = async (values)=>{
    try{
        setLoading(true)

  const response = await axios.post('http://localhost:3000/api/admin/section/add', values)
  if(response.status===201){
    setLoading(false)

    setErrorMessage(`Section ${values.sectionName} created successfully`)
    setSeverity('success')
    setSnackState({...snackState,  snackOpen : true})}  
    }catch(error){
        setLoading(false)

        const errorMessage = error.response?.data?.message || 'An error occurred';
        setErrorMessage(errorMessage)
              setSeverity('error')      
              setSnackState({...snackState,  snackOpen : true})       }
  }

  const validationSchema = yup.object({
    sectionName: yup.string().required('Required'),
    description: yup.string().required('Required'),
    startDate: yup.date().required('Required'),
    endDate: yup.date().min(yup.ref('startDate'), 'End date must be after start date'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });


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

  return (
    <>

<Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}  anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
    {errorMessage}
        </Alert>
      </Snackbar>

      <Modal open={isModalOpen} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box component="form" onSubmit={formik.handleSubmit} sx={formStyles}>
          <TextField
          required
            fullWidth
            id="sectionName"
            name="sectionName"
            label="Section Name"
            value={formik.values.sectionName}
            onChange={formik.handleChange}
            error={formik.touched.sectionName && Boolean(formik.errors.sectionName)}
            helperText={formik.touched.sectionName && formik.errors.sectionName}
            sx={{ marginTop: '30px' }}
          />
          <TextField
          required
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            sx={{ marginTop: '30px' }}

          />

<TextField
  fullWidth
  id="startDate"
  name="startDate"
  label="Start Date"
  type="date"
  value={formik.values.startDate}
  onChange={formik.handleChange}
  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
  helperText={formik.touched.startDate && formik.errors.startDate}
  sx={{ marginTop: '30px' }}
  InputLabelProps={{
    shrink: true, 
  }}
/>
          <TextField
            fullWidth
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            sx={{ marginTop: '30px' }}
            InputLabelProps={{
              shrink: true, 
            }}
          />
         <LoadingButton type="submit" variant="contained" color="primary" sx={{ marginTop: '50px' }}
            loading = {loading}
            >
Create Section      
      </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};


SectionModal.propTypes={
    isModalOpen: PropTypes.boolean,
    closeModal: PropTypes.func
}

export default  SectionModal;
