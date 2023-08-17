import {  Card, CardContent, CardHeader, Grid,   Box , Avatar, Typography} from '@mui/material';
import PropTypes from 'prop-types'
import { DateTime } from 'luxon';

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

  
  const ProjectPublications = ({pubData}) => {
  const formatDate = (date)=>{
    const dateTime = DateTime.fromISO(date);
    return dateTime.setLocale('fr').toFormat('dd MMMM  yyyy, t');

  }
  return (
    <>
            <Grid spacing={2} container>
        <Grid item xs={8}>
        <Box sx={{ width: '51vw', maxHeight: '70vh', overflowY: 'auto', paddingRight: '20px' , borderRadius:'-1px 1px 20px gray'}}>

          {pubData.map((publication) => (
            <Card key={publication.id}   sx={{marginBottom:'30px'}} >
              <CardHeader
                avatar={<div style={{marginTop:'-15px'}}><Avatar     {...stringAvatar(publication.user.username)}  /></div>}
                title={<Typography  sx={{fontWeight:'bold', fontFamily:'Agency FB', fontSize:'26px',marginTop:'10px'}}>{publication.user.username}</Typography>}
                sx={{justifyContent:'space-between' , alignItems:'center'}}
              />
              <CardContent>
                <p>{publication.content}</p>
                <p>{formatDate(publication.createdAt)}</p>
              </CardContent>
            </Card>
          ))}
          </Box>
        </Grid>

      </Grid>
    </>
  )
}
ProjectPublications.propTypes ={
    pubData : PropTypes.array
}

export default ProjectPublications
