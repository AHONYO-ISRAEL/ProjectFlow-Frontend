import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Credentials = () => {
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(ErrorMessage)}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(ErrorMessage)}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(ErrorMessage)}
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Credentials;
