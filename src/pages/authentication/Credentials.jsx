import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Paper, Container, CircularProgress } from '@mui/material';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().min(3, 'Le mot de passe doit avoir au moins 3 caractères').required('Le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent être similaires')
    .required('Confirmation du mot de passe requise'),
});

const baseUrl = 'http://localhost:3000/api/';

const Credentials = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  var queryString = window.location.search;
  var parameters = new URLSearchParams(queryString);
  var userToken = parameters.get('userToken');

  const [userCredentials, setUserCredentials] = useState([]);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);

  const sendUserToken = async () => {
    try {
      const userInfoResponse = await axios.get(baseUrl + `auth/token/send/${userToken}`);
      if (userInfoResponse.status === 200) {
        setUserCredentials(userInfoResponse.data.credentials);
        setCredentialsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendUserToken();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...userData } = values;

      const response = await axios.post(baseUrl + `auth/update/${userCredentials.id}`, userData);

      if (response.status === 200) {
        setSnackbarMessage('Informations utilisateur mises à jour avec succès');
        setSnackbarOpen(true);
        window.location.replace( '/')
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
    }
  };

  if (!credentialsLoaded) {
    return (
      <Container maxWidth="xs" style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const { username, email } = userCredentials;

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Formik
          initialValues={{ username: `${username}`, email: `${email}`, password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                name="username"
                label="Nom d'utilisateur"
                disabled
                fullWidth
                margin="normal"
                error={Boolean(ErrorMessage)}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                disabled
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Mot de passe"
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
                label="Confirmer le mot de passe"
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(ErrorMessage)}
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                loading={isSubmitting}
                loadingPosition="start"
              >
                Envoyer
              </LoadingButton>
            </Form>
          )}
        </Formik>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Credentials;
