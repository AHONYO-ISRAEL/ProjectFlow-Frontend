import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Button, Accordion, AccordionDetails, TextField, Box, Modal, Snackbar, Stack, Card, CardContent, CardHeader, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, forwardRef, useEffect } from "react";
import MuiAlert from '@mui/material/Alert';
import { useSelector, } from 'react-redux';
import axios from "axios"

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from "react-router-dom"

import PropTypes from 'prop-types'



const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})


const SectionAccordion = ({ Data }) => {
    const userInfo = useSelector((state) => state.auth)
    const { projectId } = useParams()

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [loading, setLoading] = useState(false);

    const formStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '25vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        padding: '70px',
        borderRadius: '15px'

    };

    const [errorMessage, setErrorMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, snackOpen } = snackState;

    const handleSnackClose = () => {
        setSnackState({ ...snackState, snackOpen: false });
    };
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const handleTaskModalOpen = () => setTaskModalOpen(true);
    const handleTaskModalClose = () => setTaskModalOpen(false);

    const taskValidationSchema = yup.object({
        taskName: yup.string().required('Task title is required'),
        description: yup.string().required('Description is required'),
        startDate: yup.date(),
        durationDays: yup.number().integer().min(0, 'Duration Days must be greater than or equal to 0'),
        durationHours: yup.number().integer().min(0, 'Duration Hours must be greater than or equal to 0'),
        endDate: yup.date().min(yup.ref('startDate'), 'End date must be after start date'),
    });

    const taskFormik = useFormik({
        initialValues: {
            taskName: '',
            description: '',
            startDate: '',
            durationDays: 2,
            durationHours: 0,
            endDate: '',
            projectId: projectId,
            userId: userInfo.userId,
            sectionId: Data.id,

            accessToken: userInfo.accessToken,
            refreshToken: userInfo.refreshToken
        },
        validationSchema: taskValidationSchema,

        onSubmit: async (values) => {

            try {
                setLoading(true)
                const response = await axios.post('http://localhost:3000/api/admin/task/add', values)

                if (response.status === 200) {
                    setLoading(false)
                    setErrorMessage('Task added successfully')
                    setSeverity('success')
                    setSnackState({ ...snackState, snackOpen: true })
                    console.log(response)
                    console.log(values)

                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                setErrorMessage(errorMessage)
                setSeverity('error')
                setSnackState({ ...snackState, snackOpen: true })
                setLoading(false)

            }
        },
    });

    const [isNotStarted, setIsNotStarted] = useState([])
    const [isInProgress, setIsInProgress] = useState([])
    const [isCompleted, setIsCompleted] = useState([])

    const getNotStartedSectionTasks = async () => {
        try {
            const taskResponse = await axios.get(`http://localhost:3000/api/admin/task/get/Not Started/${Data.id}`)
            setIsNotStarted(taskResponse.data.tasks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNotStartedSectionTasks()
    })
    const getInProgressSectionTasks = async () => {
        try {
            const taskResponse = await axios.get(`http://localhost:3000/api/admin/task/get/In Progress/${Data.id}`)
            setIsInProgress(taskResponse.data.tasks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInProgressSectionTasks()
    })
    const getCompletedSectionTasks = async () => {
        try {
            const taskResponse = await axios.get(`http://localhost:3000/api/admin/task/get/Completed/${Data.id}`)
            setIsCompleted(taskResponse.data.tasks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCompletedSectionTasks()
    })

    console.log('ns', isNotStarted)
    console.log('pro', isInProgress)
    console.log('com', isCompleted)
    return (
        <div>
            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }} >
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ width: '80vw', marginTop: '50px', }}    >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={`panel ${Data.id}`}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold', fontSize: '28px' }}>
                        {Data.sectionName}
                    </Typography>
                    <Typography sx={{ marginLeft: '50px', left: 0 }}  >  {Data.status} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button variant="outlined" fullWidth onClick={handleTaskModalOpen}  >Add Tasks to {Data.sectionName} </Button>
                    <Stack direction={'row'}>
                        <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 400, margin: '10px', display: 'flex', padding: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardHeader
                                    title="Not Started"
                                    titleTypographyProps={{ style: { color: 'blue' } }}
                                />
                                <CardContent>
                                {isNotStarted?.map((task) => (
                                    <Paper key={task.id} elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
                                        <Typography>{task.taskName}</Typography>
                                    </Paper>
                                ))}
                                </CardContent>
                            </div>
                        </Card>
                        <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 400, margin: '10px', display: 'flex', padding: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardHeader
                                    title="In Progress"
                                    titleTypographyProps={{ style: { color: 'orange' } }}
                                />
                                <CardContent>
                                {isInProgress?.map((task) => (
                                    <Paper key={task.id} elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
                                        <Typography>{task.taskName}</Typography>
                                    </Paper>
                                ))}
                                </CardContent>
                            </div>
                        </Card>
                        <Card sx={{ minWidth: 350, maxWidth: 350, minHeight: 400, margin: '10px', display: 'flex', padding: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardHeader
                                    title="Completed"
                                    titleTypographyProps={{ style: { color: 'green' } }}
                                />
                                <CardContent>
                                {isCompleted?.map((task) => (
                                    <Paper key={task.id} elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
                                        <Typography>{task.taskName}</Typography>
                                    </Paper>
                                ))}
                                </CardContent>
                            </div>
                        </Card>

                    </Stack>

                </AccordionDetails>
            </Accordion>

            <Modal open={taskModalOpen} onClose={handleTaskModalClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={formStyles}  >
                    <form onSubmit={taskFormik.handleSubmit}>
                        <TextField
                            label="Task title"
                            id="taskName"
                            name="taskName"
                            value={taskFormik.values.taskName}
                            onChange={taskFormik.handleChange}
                            error={taskFormik.touched.taskName && Boolean(taskFormik.errors.taskName)}
                            helperText={taskFormik.touched.taskName && taskFormik.errors.taskName}
                            fullWidth
                        />
                        <TextField
                            fullWidth
                            id="startDate"
                            name="startDate"
                            label="Start Date"
                            type="date"
                            value={taskFormik.values.startDate}
                            onChange={taskFormik.handleChange}
                            error={taskFormik.touched.startDate && Boolean(taskFormik.errors.startDate)}
                            helperText={taskFormik.touched.startDate && taskFormik.errors.startDate}
                            sx={{ marginTop: '30px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            id="endDate"
                            name="endDate"
                            label="End Date"
                            type="date"
                            value={taskFormik.values.endDate}
                            onChange={taskFormik.handleChange}
                            error={taskFormik.touched.endDate && Boolean(taskFormik.errors.endDate)}
                            helperText={taskFormik.touched.endDate && taskFormik.errors.endDate}
                            sx={{ marginTop: '30px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px', justifyContent: 'spaceBetween' }}>

                            <TextField
                                label="Duration Days"
                                id="durationDays"
                                name="durationDays"
                                type="number"
                                value={taskFormik.values.durationDays}
                                onChange={taskFormik.handleChange}
                                error={taskFormik.touched.durationDays && Boolean(taskFormik.errors.durationDays)}
                                helperText={taskFormik.touched.durationDays && taskFormik.errors.durationDays}
                            />
                            <TextField
                                label="Duration Hours"
                                id="durationHours"
                                name="durationHours"
                                type="number"
                                value={taskFormik.values.durationHours}
                                onChange={taskFormik.handleChange}
                                error={taskFormik.touched.durationHours && Boolean(taskFormik.errors.durationHours)}
                                helperText={taskFormik.touched.durationHours && taskFormik.errors.durationHours}
                                sx={{ marginRight: '10px' }}

                            />

                        </div>
                        <TextField
                            label="Description"
                            id="description"
                            name="description"
                            multiline
                            rows={2}
                            value={taskFormik.values.description}
                            onChange={taskFormik.handleChange}
                            error={taskFormik.touched.description && Boolean(taskFormik.errors.description)}
                            helperText={taskFormik.touched.description && taskFormik.errors.description}
                            fullWidth
                            sx={{ marginTop: '20px' }}
                        />

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '30px' }}
                            loading={loading}
                        >
                            Register Project
                        </LoadingButton>
                    </form>
                </Box>

            </Modal>


        </div>
    );
}


SectionAccordion.propTypes = {
    Data: PropTypes.object,
}

export default SectionAccordion