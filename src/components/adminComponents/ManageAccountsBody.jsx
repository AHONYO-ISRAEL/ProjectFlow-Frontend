import MuiAlert from '@mui/material/Alert';
import {  TextField, Modal, Box, Snackbar } from '@mui/material';
import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import LoadingButton from '@mui/lab/LoadingButton'; 

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
  borderRadius: '5px',
};

const ManageAccountsBody = ({ open, handleClose, role }) => {
  const userInfo = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); 
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
    password: uuidv4(),
    roleName: role,
    accessToken: userInfo.accessToken,
    refreshToken: userInfo.refreshToken,
  };

  const validationSchema = yup.object({
    username: yup.string().required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
  });

  const onSubmit = async (values, {resetForm}) => {
    try {
      setIsLoading(true); 
      const response = await axios.post('http://localhost:3000/api/auth/signup', values);
      setIsLoading(false); 
      if (response.status === 401) {
        setErrorMessage('User already registered');
        setSeverity('error');
        setSnackState({ ...snackState, snackOpen: true });
      } else if (response.status === 200) {
        setErrorMessage(
          values.roleName + `   ` + values.username + `'s ` + `  account created successfully`
        );
        setSeverity('success');
        setSnackState({ ...snackState, snackOpen: true });
        resetForm()
        handleClose()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setErrorMessage(errorMessage);
      setSeverity('error');
      setSnackState({ ...snackState, snackOpen: true });
      setIsLoading(false); 
    }
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box component="form" sx={formStyles}   onSubmit={formik.handleSubmit} >
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ marginTop: '30px' }}
            disabled={isLoading} // Step 5: Disable the input when the form is submitting/loading
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
            sx={{ marginTop: '30px' }}
            disabled={isLoading} // Step 5: Disable the input when the form is submitting/loading
          />

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            
            loading={isLoading} 
            //disabled={isLoading} 

          >
            Submit
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};

ManageAccountsBody.propTypes = {
  open: PropTypes.bool, // Step 6: Fix the PropTypes typo "boolean" to "bool"
  handleClose: PropTypes.func,
  role: PropTypes.string,
};

export default ManageAccountsBody;
