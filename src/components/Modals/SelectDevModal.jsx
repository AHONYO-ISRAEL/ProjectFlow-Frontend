import {  Box, Stack,  Button, Modal, Select, MenuItem,TextField,  Snackbar} from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios"
import { useEffect, useState, forwardRef } from "react";
import MuiAlert from '@mui/material/Alert';
import { useSelector, } from 'react-redux';
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add';

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
	borderRadius: '45px'

};


const SelectDevModal = ({handleSelectDevClose,selectDevOpen })=>{
	const { projectId } = useParams()
	const userInfo = useSelector((state) => state.auth)
	const [devData, setDevData] = useState([])

	const [selectedDev, setSelectedDev] = useState('');



	const [clientModalOpen, setclientModalOpen] = useState(false);
	const handleClientModalOpen = () => setclientModalOpen(true);
	const handleClientModalClose = () => setclientModalOpen(false);


	const [errorMessage, setErrorMessage] = useState('')
	const [severity, setSeverity] = useState('')

	const [snackState, setSnackState] = useState({
		snackOpen: false,
		vertical: 'top',
		horizontal: 'center',
	});
	const { vertical, horizontal, snackOpen } = snackState;

	const getDevs = async () => {
		try {
			const devResponse = await axios.get('http://localhost:3000/api/admin/dev/get')
			if (devResponse) {
				setDevData(devResponse.data.developers)
			}
		} catch (error) {
			console.log(error)
		}
	}

console.log(devData)
	useEffect(() => {
		getDevs()
	}, [])

	const initialValues = {
		username: '',
		email: '',
		password: uuidv4(), // Generate a random password using uuidv4
		roleName: 'Developer',
		accessToken: userInfo.accessToken,
		refreshToken: userInfo.refreshToken
	};

	const validationSchema = yup.object({
		username: yup.string().required('Required'),
		email: yup.string().email('Invalid email address').required('Required'),
		roleName: yup.string().oneOf(['Developer']).required('Role is required'),
	});
	const onSubmit = async (values) => {
		try {
			const response = await axios.post('http://localhost:3000/api/auth/signup', values)
			if (response.status === 401) {
				setErrorMessage('User alreadyregistered')
				setSeverity('error')
				setSnackState({ ...snackState, snackOpen: true })
			}
			if (response.status === 200) {
				setErrorMessage(values.roleName + `   ` + values.username + `'s ` + `  account created successfully`)
				setSeverity('success')
				setSnackState({ ...snackState, snackOpen: true })
			}
			getDevs()

		} catch (error) {
			const errorMessage = error.response?.data?.message || 'An error occurred';
			setErrorMessage(errorMessage)
			setSeverity('error')
			setSnackState({ ...snackState, snackOpen: true })
		}
		console.log(values);
	};

	const clientFormik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

    const handleProjectDev = () => {
		try {

			const response2 = axios.post(`http://localhost:3000/api/admin/project/assign/dev`, { userId: selectedDev, projectId:projectId })
			if (response2.status === 200) {
				setErrorMessage('Client added successfully')
				setSeverity('success')
				setSnackState({ ...snackState, snackOpen: true })
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleSnackClose = () => {
		setSnackState({ ...snackState, snackOpen: false });
	};


return(
    <>
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }} >
    <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
        {errorMessage}
    </Alert>
</Snackbar>
    <Modal open={selectDevOpen} onClose={handleSelectDevClose} aria-labelledby="modal-modal-selectClient"
    aria-describedby="modal-modal-description" >
    <Box component='form' sx={formStyles}   >
        <Stack direction={'row'}  >
            <Select
                labelId="client-select-label"
                value={selectedDev}
                label='Client'
                onChange={(event) => {
                    setSelectedDev(event.target.value);
                }}
                fullWidth
            >
                {
                    devData?.map((client) => (
                        <MenuItem key={client.id} value={client.id}>  {client.username} </MenuItem>
                    ))
                }

            </Select>
            <Button sx={{ backgroundColor: '#6C63FF' }} onClick={handleClientModalOpen}   >  <AddIcon />  </Button>

        </Stack>
        <Button sx={{ backgroundColor: '#6C63FF' }} onClick={handleProjectDev} >Valider</Button>

        <Modal open={clientModalOpen} onClose={handleClientModalClose} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box component="form" onSubmit={clientFormik.handleSubmit} sx={formStyles}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={clientFormik.values.username}
                    onChange={clientFormik.handleChange}
                    error={clientFormik.touched.username && Boolean(clientFormik.errors.username)}
                    helperText={clientFormik.touched.username && clientFormik.errors.username}
                    sx={{ marginTop: '30px' }}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={clientFormik.values.email}
                    onChange={clientFormik.handleChange}
                    error={clientFormik.touched.email && Boolean(clientFormik.errors.email)}
                    helperText={clientFormik.touched.email && clientFormik.errors.email}
                    sx={{ marginTop: '30px' }}
                />
                <TextField
                    fullWidth
                    id="roleName"
                    name="roleName"
                    label="Role"
                    value={clientFormik.values.roleName}
                    onChange={clientFormik.handleChange}
                    error={clientFormik.touched.roleName && Boolean(clientFormik.errors.roleName)}
                    helperText={clientFormik.touched.roleName && clientFormik.errors.roleName}
                    sx={{ marginTop: '30px' }}
                >
                </TextField>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </Modal>
    </Box>
</Modal>
</>
)
}

SelectDevModal.propTypes={
    handleSelectDevClose: PropTypes.func,
    selectDevOpen: PropTypes.boolean,
}

export default  SelectDevModal