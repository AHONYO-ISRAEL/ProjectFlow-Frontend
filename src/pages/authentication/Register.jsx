import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import './auth-form.css'



const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
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
          <Typography variant="h4"    className= 'title' >Sign up</Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box style={formContainerStyles}>
                  <div>
                    <Field
                      as={TextField}
                      name="username"
                      label="Username"
                      variant="outlined"
                      margin="normal"
                      helperText={<ErrorMessage name="username" />}
                    />
                  </div>
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
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      helperText={<ErrorMessage name="confirmPassword" />}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                  <Typography   variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Already have an account?
          </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </div>
  );
};

export default Register;
