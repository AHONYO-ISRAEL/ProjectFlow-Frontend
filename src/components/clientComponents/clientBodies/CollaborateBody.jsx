import {  Card, CardHeader, CardContent, Grid, TextField, Button, IconButton ,} from '@mui/material';
import { AttachFile ,} from '@mui/icons-material';
import {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
// import PubEditor from '../../PubEditor'


const CollaborateBody = () => {

   const [isOpened, setIsOpened] = useState(false)
   const  handleOpen = ()=> setIsOpened(true)
   const  handleClose = ()=> setIsOpened(false)
  return (
    <>
   <Button  startIcon = {<CreateIcon/>} onClick={handleOpen} >
Envoyer un message
   </Button>

<Card   sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '35vw',
          padding: '30px',
          textAlign: 'center',
          display: !isOpened ? 'none' : 'block',
          zIndex: 1000, 
        }}  >
    <CardHeader  title={'Envoyer un message'}   sx={{ marginBottom:'30px'}} action={
        <IconButton>
            <CloseIcon   onClick={handleClose} />
        </IconButton>
    }   />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField  label="Titre" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                rows={3}
                label="Contenu"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx, .svg"
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" startIcon={<AttachFile />}>
                  Joindre un fichier
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary"   >
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </Card>
      <Grid spacing={2} container>
        <Grid item xs={4}>
          <Card>
            <CardHeader title={'Envoyé'} />
            <CardContent>{/* ... */}</CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title={'Recu'} />
            <CardContent>{/* ... */}</CardContent>
          </Card>
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
