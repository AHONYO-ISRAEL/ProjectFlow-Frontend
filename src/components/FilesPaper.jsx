import { Grid, Paper, Typography , IconButton} from '@mui/material';
import PropTypes from 'prop-types';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import GridOnIcon from '@mui/icons-material/GridOn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';

const downloadByUrl  = (url)=> {
    var element = document.createElement('a')
    element.setAttribute('href', url)
  element.setAttribute('target', '_blank')
    element.style.display = 'none'
    document.body.appendChild(element)
  
    element.click()
  
    document.body.removeChild(element)
  }

const FilesPaper = ({ files }) => {

  


    const IconAccordingToFile = (file) => {
        const extension = file.split('.').pop().toLowerCase();

        switch (extension) {
            case 'png':
            case 'jpg':
            case 'jpeg':

                return <ImageIcon sx={{ fontSize: '35px', color:'yellowgreen' }} />;

            case 'xls':
            case 'xlsx':
                return <GridOnIcon sx={{ fontSize: '35px', color:'green' }} />;

            case 'docx':
                return <ArticleIcon sx={{ fontSize: '35px' , color:'blue'}} />;

            case 'pdf':
                return <PictureAsPdfIcon sx={{ fontSize: '35px' , color:'red'}} />

            default:
                return <InsertDriveFileIcon sx={{ fontSize: '35px' }} />;
        }
    }

const baseUrl = 'http://localhost:3000/'

    return (
        <>

            <Paper key={files.id} sx={{ padding: '20px', marginBottom: '20px', }} >
                <Grid container >
                    <Grid item xs={3}  sx={{textAlign:'left'}}>
                        {
                            IconAccordingToFile(files.fileLink)
                        }
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:'center'}}>
                        <Typography>
                            {
                                files.fileLink
                            }
                        </Typography>

                    </Grid>
                    <Grid item xs={3} sx={{textAlign:'right'}}>
                         <IconButton>
                        <DownloadIcon  onClick={()=>{downloadByUrl(baseUrl+`uploads/${files.fileLink}`)} }/>
                            </IconButton>
                    </Grid>
                </Grid>
            </Paper>


        </>
    )
}

FilesPaper.propTypes = {
    files: PropTypes.object
}

export default FilesPaper