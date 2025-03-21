import  { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MoreVert, NavigateNext, NavigateBefore } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import PubModal from '../../PubModal';

const HomeBody = () => {
  const userInfo = useSelector((state) => state.auth);
  const [clientProjects, setClientProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  const getClientProjects = async () => {
    try {
      const clientResponse = await axios.get(
        `http://localhost:3000/api/client/${userInfo.userId}/project/get`
      );
      console.log(clientResponse.data);
      if (clientResponse.status === 200) {
        setClientProjects(clientResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientProjects();
  });

  useEffect(() => {
    setCurrentProject(clientProjects[activeIndex]?.id);
  }, [activeIndex, clientProjects]);

  const handleNextProject = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === filteredProjects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousProject = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? filteredProjects.length - 1 : prevIndex - 1
    );
  };

  const filteredProjects = clientProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10px"
      >
        <Box>
          <IconButton onClick={handlePreviousProject}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={handleNextProject}>
            <NavigateNext />
          </IconButton>
        </Box>
        <Box>
          {filteredProjects.map((_, index) => (
            <IconButton
              key={index}
              color={index === activeIndex ? 'primary' : 'default'}
              onClick={() => setActiveIndex(index)}
              sx={{ fontSize: '20px' }}
            >
               {index === activeIndex ? '●' : <span>.</span>}
            </IconButton>
          ))}
        </Box>
        <Box>
          <TextField
            label="Rechercher un projet"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginLeft: '10px' }}
          />
        </Box>
      </Box>
      {filteredProjects.map((clientProject, index) => (
        <div
          key={clientProject.id}
          style={{
            display: index === activeIndex ? 'block' : 'none',
            marginTop: '20px',
          }}
        >
 <Grid container spacing={2} sx={{ padding: '5px' }}>
              <Grid spacing={2} container sx={{ marginBottom: '30px' }} xs={8}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: 'linear-gradient(125deg, rgba(91,208,236,1) 60%, rgba(255,255,255,1) 65%)',
                      padding: '35px',
                      borderRadius: '5px',
                      height: '100%',
                      width: '100%',
                      transition: '1s',
                    }}
                  >
                    <Typography variant={'h3'}>
                      Welcome {userInfo.userName}
                    </Typography>
                  </Box>
                </Grid>
                {clientProject.length === 0 ? (
                  <></>
                ) : (
                  <Grid item xs={12}>
                    <Paper>
                      <List>
                        {clientProject.sections.map((section) => (
                          <ListItem
                            key={section.id}
                            secondaryAction={
                              <IconButton edge={'end'}>
                                <MoreVert />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={section.sectionName} />
                            {section.tasks.length > 0 && (
                              <Box sx={{ width: '80%' }}>
                                <Typography variant="body2" color="textSecondary">
                                  {`${section.tasks.filter(
                                    (task) => task.status === 'Completed'
                                  ).length} / ${section.tasks.length} tâches completées`}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={
                                    (section.tasks.filter(
                                      (task) => task.status === 'Completed'
                                    ).length /
                                      section.tasks.length) *
                                    100
                                  }
                                />
                              </Box>
                            )}
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                )}
              </Grid>
              <Grid xs={4}>
                {clientProject.length === 0 ? (
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        margin: 'auto',
                        mt: 10,
                        padding: '30px',
                        textAlign: 'center',
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5">
                          Aucun Projet à afficher
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  <Grid item xs={12} sx={{ marginLeft: '10px' }}>
                    <Card
                      sx={{
                        height: '255px',
                        display: 'flex',
                      }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                          variant="h4"
                        >
                          {clientProject.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {clientProject.description}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#777' }}>
                          Start Date: {new Date(clientProject.startDate).toDateString()}
                        </Typography>
                        {clientProject.endDate && (
                          <Typography sx={{ fontSize: 12, color: '#777' }}>
                            End Date: {new Date(clientProject.endDate).toDateString()}
                          </Typography>
                        )}
                        <Typography>Status: {clientProject.status}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Button startIcon={<CreateIcon />} onClick={handleOpen}>
        Envoyer un message
      </Button>
<PubModal  isOpened={isOpened}  handleClose={handleClose}  projectId={parseInt(currentProject)}  />
                 </div>
      ))}
    </>
  );
};

export default HomeBody;
