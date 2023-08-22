import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Card, CardHeader, Grid, TextField, IconButton,  Snackbar} from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import axios from 'axios';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';


const PubModal = ({ isOpened, handleClose, projectId }) => {
  const userInfo = useSelector((state) => state.auth);
  const userId = userInfo.userId;

  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar
  const [loading, setLoading] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('*Le titre est requis'),
    content: Yup.string(),
  });

  const initialValues = {
    title: '',
    content: '',
    fileLink: '',
    projectId: projectId,
    userId: userId
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('fileLink', values.fileLink);
      formData.append('userId', values.userId);
      formData.append('projectId', parseInt(projectId));
      const response = await axios.post('http://localhost:3000/api/publication/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      if(response.status===201){
        setLoading(false); 
        setSnackbarOpen(true);
        formik.resetForm();
      }

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Card
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '35vw',
          padding: '30px',
          textAlign: 'center',
          display: !isOpened ? 'none' : 'block',
          zIndex: 1000,
          borderRadius: '5px',
        }}
      >
        <CardHeader
          title={'Envoyer un message'}
          sx={{ marginBottom: '30px' }}
          action={
            <IconButton>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          }
        />

        <form onSubmit={formik.handleSubmit}  encType = "multipart/form-data" >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titre*"
                name="title"
                variant='standard'
                fullWidth
                {...formik.getFieldProps('title')}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                rows={3}
                variant='standard'
                label="Contenu"
                name="content"
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                {...formik.getFieldProps('content')}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.svg"
                id="contained-button-file"
                type="file"
                name="fileLink" 
                onChange={(event) => formik.setFieldValue('fileLink', event.currentTarget.files[0])}
              />

              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" startIcon={<AttachFile />}>
                  Joindre un fichier
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
            <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading} // Set loading state
            loadingPosition="start"
            startIcon={<AttachFile />}
          >
            Envoyer
          </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="Votre publication a été envoyée"
      />
    </>
  )
}

PubModal.propTypes = {
  isOpened: PropTypes.boolean,
  handleClose: PropTypes.func,
  projectId: PropTypes.number
}

export default PubModal