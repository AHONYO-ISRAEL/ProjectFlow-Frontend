import axios from 'axios';
// import Fragment from 'react'
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { blue, orange, green } from '@mui/material/colors';
import ManageAccountsBody from './ManageAccountsBody';
import { MoreVert } from '@mui/icons-material';
import DevSelectTaskModal from './adminModals/DevSelectTaskModal';

const DevelopersBody = () => {
  const [devId, setDevId] = useState()
  const [devTaskData, setDevTaskData] = useState([])

  const getUnassignedTasks = async () => {
    try {
      const taskResponse = await axios.get(`http://localhost:3000/api/admin/dev/${devId}/tasks/unassigned/get`);
      if (taskResponse.status === 200) {
        const allTasks = taskResponse.data.unassignedTasks.reduce((tasksArray, data) => {
          tasksArray.push(...data.tasks);
          return tasksArray;
        }, []);
        setDevTaskData(allTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [devData, setDevData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectTaskOpen, setSelectTaskOpen] = useState(false)
  const handleSelectTaskOpen = () => setSelectTaskOpen(true)
  const handleSelectTaskClose = () => setSelectTaskOpen(false)


  const getdevData = async () => {
    try {
      const devResponse = await axios.get('http://localhost:3000/api/admin/dev/task/get');
      setDevData(devResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdevData();
  }, []);
  console.log(devData)

  return (
    <>
      <Button onClick={handleOpen} sx={{ width: '100%' }}>
        Ajouter un nouveau developpeur
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead  >
            <TableRow  >
              <TableCell sx={{ width: 'calc(100% / 4 )', textAlign: 'center', fontWeight: 'bold' }}  > Numero</TableCell>
              <TableCell sx={{ width: 'calc(100% / 4 )', textAlign: 'center', fontWeight: 'bold' }}  >Username</TableCell>
              <TableCell sx={{ width: 'calc(100% / 4 )', textAlign: 'center', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ width: 'calc(100% / 4 )', textAlign: 'center', fontWeight: 'bold' }}>Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {devData.map((dev, index) => (
              <>

                <TableRow key={dev.id} >
                  <TableCell colSpan={3}>
                    <Accordion
                      sx={{
                        backgroundColor: '#B0BEA9',
                      }}
                    >
                      <AccordionSummary
                        sx={{ position: 'sticky', top: 0, zIndex: 1 }}
                      >
                        <div
                          style={{
                            justifyContent: 'space-around ',
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            alignContent: 'center',
                          }}
                        >
                          <Typography sx={{ width: 'calc(100% / 4 )', textAlign: 'center' }} > {index++}</Typography>
                          <Typography sx={{ width: 'calc(100% / 4 )', textAlign: 'center' }} >
                            {dev.user.username}
                          </Typography>
                          <Typography sx={{ width: 'calc(100% / 4 )', textAlign: 'center' }}> {dev.email}</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography
                                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                                  >
                                    Task Name
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                                  >
                                    Status
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {dev.tasks.map((task) => (
                                <TableRow
                                  key={task.id}
                                  sx={{ borderRadius: '30px' }}
                                >
                                  <TableCell
                                    sx={{
                                      width: '50%',
                                      borderRadius: '30px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {task.taskName}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color:
                                        task.status === 'Not Started'
                                          ? blue[500]
                                          : task.status === 'In Progress'
                                            ? orange[500]
                                            : green[500],
                                      borderRadius: '5px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {task.status}
                                  </TableCell>

                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                  <TableCell sx={{ width: 'calc(100% / 4 )', textAlign: 'center' }}> <Button onClick={() => {
                    setDevId(parseInt(dev.id))
                    getUnassignedTasks()
                    handleSelectTaskOpen()
                  }}>Affecter a une tache </Button>  </TableCell>
                  <DevSelectTaskModal handleSelectTaskClose={handleSelectTaskClose} selectTaskOpen={selectTaskOpen} devId={devId}  devTaskData={devTaskData} />
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ManageAccountsBody open={open} handleClose={handleClose} role={'developer'} />
    </>
  );
};

export default DevelopersBody;
