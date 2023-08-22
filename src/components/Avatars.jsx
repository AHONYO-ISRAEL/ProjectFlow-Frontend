import { Avatar} from '@mui/material';
import PropTypes from 'prop-types';


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



const Avatars = ({Data,})=>{
    return(
<>
{
          Data?.map((dev)=>(<Avatar key={dev.id}     {...stringAvatar(dev.user.username)} />))
          
}

          </>
    )

}

Avatars.propTypes={
    Data : PropTypes.object,
    handleDevClose: PropTypes.func,
    isDevOpen:PropTypes.bool
}

export default Avatars