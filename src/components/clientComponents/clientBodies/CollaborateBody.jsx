import { useFormik } from 'formik';
import { Button, Card, CardContent, CardHeader, Grid, TextField, IconButton, Box , Avatar} from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import { useState , useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import moment from 'moment';
//import  PubEditor from '../../PubEditor'


function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  const initials = name.trim().split(' ').map(word => word[0].toUpperCase()).join('');

  return {
    sx: {
      bgcolor: stringToColor(name),
     marginTop: '30px'
    },
    children: initials,
  };
}



const CollaborateBody = () => {
  const userInfo = useSelector((state) => state.auth);
  const userId = userInfo.userId;

  const [pubData, setpubData] = useState([])
    
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  const validationSchema = Yup.object({
    title: Yup.string().required('Le titre est requis'),
    content: Yup.string().required('Le contenu est requis'),
  });

  const initialValues = {
    title: '',
    content: '',
    file: null,
    fileLink: '', // Is this needed here?
    userId: userId
  };


  const onSubmit = async (values) => {
    try {
      const fileData = new FormData();
      fileData.append('file', values.file);
      const pubData = {
        ...values,
        userId: userId,
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

  const getPublications = async () => {
    try {
      const pubResponse = await axios.get(`http://localhost:3000/api/user/${userId}/publication/get`)
      if (pubResponse.status === 200) {
        setpubData(pubResponse.data.publications)
      }
      console.log(pubResponse.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPublications()
  }, [])

  return (
    <>
      <Button startIcon={<CreateIcon />} onClick={handleOpen}>
        Envoyer un message
      </Button>

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
                label="Titre"
                name="title"
                variant="outlined"
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

      <Grid spacing={2} container>
        <Grid item xs={8}>
        <Box sx={{ width: '400px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '20px' }}>

          {pubData.map((publication) => (
            <Card key={publication.id}   sx={{marginBottom:'30px'}} >
              <CardHeader
                avatar={<Avatar     {...stringAvatar(publication.user.username)} />}
                title={publication.user.username}
              />
              <CardContent>
                <p>{publication.content}</p>
                <p>{moment(publication.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </CardContent>
            </Card>
          ))}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title={'Notifications'} />
            <CardContent>{/* ... */}</CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <PubEditor/> */}
    </>
  );
};

export default CollaborateBody;
