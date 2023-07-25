import PropTypes from 'prop-types'
import {Card, Typography, CardContent} from  '@mui/material'

const SectionCard = ({Data})=>{
return(
    <Card sx={{ minWidth: 350,maxWidth: 350, minHeight: 400, maxHeight:400,  margin: '10px', display: 'flex'  ,padding : '30px' }}>
      <CardContent>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}  variant='h4' >
          {Data.sectionName}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>{Data.description}</Typography>
        <Typography sx={{ fontSize: 12, color: '#777' }}>
          Start Date: {new Date(Data.startDate).toDateString()}
        </Typography>
        {Data.endDate && (
          <Typography sx={{ fontSize: 12, color: '#777' }}>
            End Date: {new Date(Data.endDate).toDateString()}
          </Typography>
        )}
        <Typography>Status: {Data.status}</Typography>
      </CardContent>
    </Card>
)

}

SectionCard.propTypes = {
    Data: PropTypes.object,
}

export default SectionCard