import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Paper, Box, Snackbar } from '@mui/material';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../features/auth/authSlice'
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import './auth-form.css'
import Logos from '../../images/logo.png'
import Whirl from '../../images/whirl.svg'
import { styled } from '@mui/material/styles';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const StyledLoginContainer = styled('div')({

  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative', // Add relative positioning
  width: '100vw',
  height: '100vh',
  overflowY: 'hidden',
  '::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Whirl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transform: 'rotate(-60deg)',
    zIndex: -1,
  },
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
  const userInfo = useSelector((state) => state.auth)
  console.log(userInfo)


  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(3, 'Le mot de passe doit avoir au moins 3 caracteres')
      .required('Le mot de passe est requis'),

  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // const baseUrl = 'http://localhost:3000/api'

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', values)
      if (response.status === 200) {
        dispatch(loginSuccess(response.data))
        const link = userInfo.role + '/Home'
        console.log(link)
        setErrorMessage('Success')
        setSeverity('success')
        setSnackState({ ...snackState, open: true })
        window.location.replace(response.data.role + '/Home')

      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setErrorMessage(errorMessage)
      setSeverity('error')
      setSnackState({ ...snackState, open: true })
    } finally {
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
    < >
      <StyledLoginContainer>
        <div   >
          <img src={Logos} style={{ top: 0, left: 0, width: '15%', marginLeft: '30px ', marginTop: '20px' }}></img>
          <Paper elevation={3} style={paperStyles} className='register-container' sx={{ position: 'relative' }} >
            <div  >
              <Typography variant="h4" className='title' sx={{ top: 0, marginTop: '50px', position: 'absolute', marginLeft: '15%' }}>Connexion</Typography>

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
                        Se connecter
                      </Button>
                      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} >
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
      </StyledLoginContainer>
    </>
  );
};

export default Login;
