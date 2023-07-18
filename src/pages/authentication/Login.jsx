import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Paper, Box , Snackbar } from '@mui/material';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../features/auth/authSlice'
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import './auth-form.css'



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {

  const [errorMessage, setErrorMessage] = React.useState('')
  const [severity, setSeverity] = React.useState('')



  const [snackState, setSnackState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackState;



const dispatch = useDispatch()
const userInfo = useSelector((state)=>state.auth)
console.log(userInfo.userName)


  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
    
  });

  const handleSubmit = async  (values, { setSubmitting }) => {
   // const baseUrl = 'http://localhost:3000/api'

try{
  const response = await axios.post('http://localhost:3000/api/auth/login', values)
  if(response.status === 200){
    dispatch(loginSuccess(response.data))
 setErrorMessage('Success')
 setSeverity('success')
 setSnackState({...snackState,  open : true})

}
}catch(error){
  const errorMessage = error.response?.data?.message || 'An error occurred';
  setErrorMessage(errorMessage)
  setSeverity('error')
setSnackState({...snackState,  open : true})
}finally{
  setSubmitting(false)
}
  };

  const handleClose = () => {
    setSnackState({ ...snackState, open: false });
  };


  const paperStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  };

  const formContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '300px'
  };

  return (
    <div >
      <Paper elevation={3} style={paperStyles}  className ='register-container'     >
        <div>
          <Typography variant="h4"    className= 'title' >Login</Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box style={formContainerStyles}>

                  <div>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      helperText={<ErrorMessage name="email" />}
                    />
                  </div>
                  <div>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      helperText={<ErrorMessage name="password" />}
                    />
                  </div>
                  <div>
        
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
Login
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
    {errorMessage}
        </Alert>
      </Snackbar>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
