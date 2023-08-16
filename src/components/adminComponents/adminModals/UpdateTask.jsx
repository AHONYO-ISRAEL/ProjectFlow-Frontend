import {  Box,Modal, TextField, Snackbar } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useState, forwardRef}  from 'react'
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { useSelector, } from 'react-redux';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
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
    borderRadius: '5px'

};



const UpdateTask = ({taskModalOpen , handleTaskModalClose,task})=>{
    const userInfo = useSelector((state) => state.auth)

const [loading, setLoading] = useState(false);

const [errorMessage, setErrorMessage] = useState('')
const [severity, setSeverity] = useState('')
const [snackState, setSnackState] = useState({
    snackOpen: false,
    vertical: 'bottom',
    horizontal: 'left',
});
const { vertical, horizontal, snackOpen } = snackState;

const handleSnackClose = () => {
    setSnackState({ ...snackState, snackOpen: false });
};

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
        taskName:task ?  task.taskName : '',
        description: task ? task.description: '',
        startDate: '',
        durationDays: task ?task.durationDays: '',
        durationHours: task ? task.durationHours: '',
        endDate: '',


        accessToken: userInfo.accessToken,
        refreshToken: userInfo.refreshToken
    },
    validationSchema: taskValidationSchema,

    onSubmit: async (values) => {

        try {
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/api/admin/task/${task.id}/update`, values)

            if (response.status === 200) {
                setLoading(false)
                setErrorMessage('Task updated  successfully')
                setSeverity('success')
                setSnackState({ ...snackState, snackOpen: true })
handleTaskModalClose()                
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

return(
    <>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }} >
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
                <Modal open={taskModalOpen} onClose={handleTaskModalClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={formStyles}  >
                    <form onSubmit={taskFormik.handleSubmit}>
                        <TextField
                        required
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
                                value={task ? taskFormik.values.durationDays:''}
                                onChange={taskFormik.handleChange}
                                error={taskFormik.touched.durationDays && Boolean(taskFormik.errors.durationDays)}
                                helperText={taskFormik.touched.durationDays && taskFormik.errors.durationDays}
                            />
                            <TextField
                                label="Duration Hours"
                                id="durationHours"
                                name="durationHours"
                                type="number"
                                value={task ? taskFormik.values.durationHours: ' '}
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
                            Mettre a jour
                        </LoadingButton>
                    </form>
                </Box>

            </Modal>
    </>
)
}

UpdateTask.propTypes = {
    taskModalOpen:PropTypes.boolean,
    handleTaskModalClose: PropTypes.func,
   task:PropTypes.object
}

export default UpdateTask