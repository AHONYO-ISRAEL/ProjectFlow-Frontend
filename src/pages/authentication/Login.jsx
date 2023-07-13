import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import axios from 'axios'
import './auth-form.css'




const Login = () => {
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
    const {userId, accessToken, refreshToken, role} = response.data
    alert('Connected')
    console.log(role, accessToken, refreshToken, userId )
  }

}catch(error){
  const errorMessage = error.response?.data?.message || 'An error occurred';
  alert(errorMessage);
}finally{
  setSubmitting(false)
}
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
    <div   >
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
