import axios from "axios"
import { useEffect, useState, forwardRef } from "react";
import { useParams } from "react-router-dom"
import { Typography, Box, Stack, Card, CardContent, Button, Modal, Select, MenuItem, Snackbar, TextField, Grid, AvatarGroup } from '@mui/material'
import Client from '../../images/client.png'
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'
import AssignmentIcon from '@mui/icons-material/Assignment';


import SectionModal from '../Modals/SectionModal'
import SelectDevModal from '../Modals/SelectDevModal'
import SectionAccordion from '../SectionAccordion'
import Avatars from "../Avatars";

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

const SelectedProject = () => {
	const { projectId } = useParams()


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



	const userInfo = useSelector((state) => state.auth)

	const initialValues = {
		username: '',
		email: '',
		password: uuidv4(), // Generate a random password using uuidv4
		roleName: 'Client',
		accessToken: userInfo.accessToken,
		refreshToken: userInfo.refreshToken
	};

	const validationSchema = yup.object({
		username: yup.string().required('Required'),
		email: yup.string().email('Invalid email address').required('Required'),
		roleName: yup.string().oneOf(['Client']).required('Role is required'),
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
			getClients()

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





	const [selectedClient, setSelectedClient] = useState('');
	const [clientData, setClientData] = useState([])
	const [projectData, setProjectData] = useState('');
	const [clientName, setClientName] = useState('');
	const [loading, setLoading] = useState(true);

	const getAProject = async () => {
		try {
			const response = axios.get(`http://localhost:3000/api/admin/project/get/${projectId}`)
			setProjectData((await response).data.project)
			setClientName((await response).data.clientName)
			setLoading(false)
		} catch (error) {
			console.error('error getting project ', error)
			setLoading(false)
		}

	}

	const [selectClientOpen, setSelectClientOpen] = useState(false);
	const handleSelectClientOpen = () => setSelectClientOpen(true);
	const handleSelectClientClose = () => setSelectClientOpen(false);

	const [selectDevOpen, setSelectDevOpen] = useState(false);
	const handleSelectDevOpen = () => setSelectDevOpen(true);
	const handleSelectDevClose = () => setSelectDevOpen(false);

	const [clientModalOpen, setclientModalOpen] = useState(false);
	const handleClientModalOpen = () => setclientModalOpen(true);
	const handleClientModalClose = () => setclientModalOpen(false);







	useEffect(() => {
		getAProject()
	}, [projectId])



	const getClients = async () => {
		try {
			const clientResponse = await axios.get('http://localhost:3000/api/admin/client/get')
			if (clientResponse) {
				setClientData(clientResponse.data.clients)
			}
		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		getClients()
	}, [])

	const handleClientUpdate = () => {
		try {

			const response2 = axios.post(`http://localhost:3000/api/admin/project/update/${projectData.id}`, { id: selectedClient })
			if (response2.status === 200) {
				setErrorMessage('Client added successfully')
				setSeverity('success')
				setSnackState({ ...snackState, snackOpen: true })
			}
		} catch (error) {
			console.log(error)
		}
	}
	const [sectionModalOpen, setSectionModalOpen] = useState(false);
	const handleSectionModalOpen = () => setSectionModalOpen(true)
	const handleSectionModalClose = () => setSectionModalOpen(false)


	const [sectionData, setSectionData] = useState([])


	const getProjectSections = async () => {
		try {
			const sectionResponse = await axios.get(`http://localhost:3000/api/admin/section/get/${projectId}`)
			if (sectionResponse) {
				setSectionData(sectionResponse.data.sections)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProjectSections()
	}, [])

	console.log(sectionData)


	const [projectDevsData, setProjectDevsData] = useState([])

	const getProjectDevs = async () => {
		try {
			const devResponse = await axios.get(`http://localhost:3000/api/admin/project/${projectId}/dev`)
			if (devResponse.status === 200) {
				setProjectDevsData(devResponse.data.projects.developers)
				console.log(devResponse.data.projects.developers)


			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProjectDevs()
	})



	if (loading) {
		return <h1>Loading</h1>
	} else {
		return (<>
			<Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }} >
				<Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Box sx={{ backgroundColor: '#037971', padding: '35px', borderRadius: '30px' }} >
				<Typography variant="h1" >    {projectData.name}   </Typography>
				<Typography variant='p' > {projectData.description}  </Typography>
			</Box>
			<Stack direction={'row'} sx={{ justifyContent: 'spaceBetween', alignItems: 'center', alignContentCenter: 'center' }}>
				<Card sx={{ Width: 400, minHeight: 250, maxHeight: 250, margin: '10px', display: 'flex', padding: '30px', textAlign: 'center' }}>
					<CardContent>
						<Stack direction={'row'} >
							<Stack direction={'column'}>
								{projectData.startDate === null ? <Button variant="contained" color="primary" sx={{ marginTop: '50px' }} >Ajouter la date de debut</Button> : <Typography variant='h5'>From :  {projectData.startDate.substring(0, 10)}   </Typography>}
								{projectData.endDate === null ? <Button variant="contained" color="primary" sx={{ marginTop: '50px' }} >Ajouter la date de fin</Button> : <Typography variant='h3'>From :  {projectData.endDate.substring(0, 10)}   </Typography>}
							</Stack>
						</Stack>
					</CardContent>
				</Card>
				<Card sx={{ Width: 400, minHeight: 250, maxHeight: 250, margin: '10px', display: 'flex', paddingBottom: '20px', textAlign: 'center' }}>
					<CardContent>

						<Stack direction={'column'}>
							<img src={Client} style={{ height: '150px', }} />
							{projectData.clientId === null ? <Button variant="contained" color="primary" sx={{ marginTop: '50px' }} onClick={handleSelectClientOpen} >Ajouter le client </Button> : <Typography variant='h6' > {clientName}  </Typography>
							}

						</Stack>
					</CardContent>
				</Card>
				<Card sx={{ Width: 400, minHeight: 250, maxHeight: 250, margin: '10px', display: 'flex', paddingBottom: '20px', textAlign: 'center'  , justifyContent:'center'}}>
					<CardContent>
				<Stack direction ={'column'}>
					<AvatarGroup>
					<Avatars  Data={projectDevsData}  />
					</AvatarGroup>
						<Stack direction={'row'}>
							<Button variant="contained" color="primary" sx={{ marginTop: '50px' }}  >Voir les developpeurs du projet </Button>

							<Button sx={{ backgroundColor: '#6C63FF',  marginTop: '50px' }} onClick={handleSelectDevOpen}  >  <AddIcon />  </Button>
						</Stack>
						</Stack>
					</CardContent>
				</Card>
				<SelectDevModal selectDevOpen={selectDevOpen} handleSelectDevClose={handleSelectDevClose} />
				<Card sx={{ Width: 400, minHeight: 250, maxHeight: 250, margin: '10px', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}
					onClick={handleSectionModalOpen}
				>
					<CardContent sx={{ textAlign: 'center' }}>

						<Stack direction={'column'}>
							<AssignmentIcon sx={{ fontSize: 100, cursor: 'pointer', marginLeft: '30%' }} />
							<Typography variant='h6'> Ajouter une nouvelle section   </Typography>

						</Stack>
					</CardContent>
				</Card>
				<SectionModal isModalOpen={sectionModalOpen} closeModal={handleSectionModalClose} />
				<Modal open={selectClientOpen} onClose={handleSelectClientClose} aria-labelledby="modal-modal-selectClient"
					aria-describedby="modal-modal-description" >
					<Box component='form' sx={formStyles}   >
						<Stack direction={'row'}  >
							<Select
								labelId="client-select-label"
								value={selectedClient}
								label='Client'
								onChange={(event) => {
									setSelectedClient(event.target.value);
								}}
								fullWidth
							>
								{
									clientData.map((client) => (
										<MenuItem key={client.id} value={client.id}>  {client.username} </MenuItem>
									))
								}

							</Select>
							<Button sx={{ backgroundColor: '#6C63FF' }} onClick={handleClientModalOpen}   >  <AddIcon />  </Button>
						</Stack>
						<Button sx={{ backgroundColor: '#6C63FF' }} onClick={handleClientUpdate} >Valider</Button>

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
			</Stack>

			<Box sx={{ flexGrow: 1, display: 'flex', width: '80vw', marginLeft: '50px', marginTop: '50px', padding: '30px' }}   >
				<Grid container spacing={2}>
					{
						sectionData?.map((section) => (
							<SectionAccordion key={section.id} Data={section} />
						))
					}
				</Grid>
			</Box>
		</>
		)
	}
}
export default SelectedProject