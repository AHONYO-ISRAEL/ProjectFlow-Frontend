import { useFormik } from 'formik';
import { Button, Card, CardHeader, Grid, TextField, IconButton, } from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import axios from 'axios';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const PubModal = ({isOpened, handleClose, projectId})=>{
    const userInfo = useSelector((state) => state.auth);
    const userId = userInfo.userId;

  const validationSchema = Yup.object({
    title: Yup.string().required('*Le titre est requis'),
    content: Yup.string(),
  });

  const initialValues = {
    title: '',
    content: '',
    file: null,
    fileLink: '', 
    projectId: projectId,
    userId: userId
  };


  const onSubmit = async (values) => {
    try {
      const fileData = new FormData();
      fileData.append('file', values.file);
      const pubData = {
        ...values,
        userId: userId,
        projectId:projectId,
      };

      const response = await axios.post('http://localhost:3000/api/publication/create', pubData);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
console.log(projectId)
    return(
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

        <form onSubmit={formik.handleSubmit}>
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
                multiple
                type="file"
                name="file"
                encType="multipart/form-data"
                {...formik.getFieldProps('fileLink')}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" startIcon={<AttachFile />}>
                  Joindre un fichier
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

        </>
    )
}

PubModal.propTypes={
isOpened:PropTypes.boolean,
handleClose:PropTypes.func,
projectId: PropTypes.number
}

export default PubModal