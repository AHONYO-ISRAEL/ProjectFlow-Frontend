import axios from "axios"
import { useEffect, useState, forwardRef } from "react";
import { useParams } from "react-router-dom"
import { Typography, Box, Stack, Card, CardContent, Button, Modal, Select, MenuItem, Snackbar, TextField, Grid, AvatarGroup, Tabs, Tab, CardHeader } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'
//import AssignmentIcon from '@mui/icons-material/Assignment';
import { DateTime } from 'luxon';

import SectionModal from './adminModals/SectionModal'
import SelectDevModal from './adminModals/SelectDevModal'
import SectionAccordion from '../SectionAccordion'
import Avatars from "../Avatars";
import ProjectPublications from "../ProjectPublications";

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
	border: 'solid 1px rgba(91,208,236,1) ',
	boxShadow: 24,
	p: 4,
	padding: '70px',
	borderRadius: '5px'

};

const SelectedProject = () => {
	const { projectId } = useParams()

	const [pubData, setPubData] = useState([])

	const getProjectPubs = async () => {
		try {
			const pubResponse = await axios.get(`http://localhost:3000/api/project/${projectId}/publications/get`)
			if (pubResponse.status === 200) {
				setPubData(pubResponse.data.publications)
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProjectPubs()
	})


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
	console.log(sectionData)
	useEffect(() => {
		getProjectSections()
	})



	const [projectDevsData, setProjectDevsData] = useState([])

	const getProjectDevs = async () => {
		try {
			const devResponse = await axios.get(`http://localhost:3000/api/admin/project/${projectId}/dev`)
			if (devResponse.status === 200) {
				setProjectDevsData(devResponse.data.projects.developers)


			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProjectDevs()
	})


	const changeStatus = async () => {
		try {
			const currentDate = DateTime.now()
			if (projectData.startDate >= currentDate) {
				const statusResponse = await axios.post(`http://localhost:3000/api/admin/project/${projectData.id}`)
				if (statusResponse.status === 200) {
					console.log(statusResponse)
				}
			}
		} catch (error) {
			console.log(error)
		}

	}

	useEffect(() => {
		changeStatus()
	})
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};
	/*
		const calculateTotalTasks = () => {
			return sectionData.reduce((total, section) => total + section.tasks.length, 0);
		}*/
	// const [totalTasks, setTotalTasks] = useState()
	/*
		useEffect(() => {
			const totalTasks = calculateTotalTasks(sectionData);
			setTotalTasks(totalTasks); // Assuming you have a state variable to store the total tasks
		}, [sectionData]);
	*/

	if (loading) {
		return <h1>Loading</h1>
	} else {
		return (<>
			<Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{ vertical, horizontal }} >
				<Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Box sx={{ background: 'linear-gradient(125deg, rgba(91,208,236,1) 60%, rgba(255,255,255,1) 65%)', padding: '35px', borderRadius: '5px', boxShadow: '0px 1px 2px gray' }} >
				<Grid container spacing={2}>
					<Grid item xs={8} sx={{ marginBottom: '20px' }} >
						<Typography variant="h3" sx={{ color: '#fff' }} >   Project /  {projectData.name}   </Typography>
						<Typography variant='p' sx={{ color: '#fff' }}  > {projectData.description}  </Typography>
					</Grid>
					<Grid item xs={4}>
						<Stack direction={'column'} sx={{ alignItems: 'end', alignContent: 'flex-end', marginTop: '-15px' }}>

							<Button sx={{
								backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff', marginLeft: '18px', textTransform: 'none', transition: 'transform 0.3s ease', // Add a transition effect for the transform property
								'&:hover': {
									backgroundColor: 'rgba(91, 208, 236, 1)',
									transform: 'translateY(2px)',

								},
							}} onClick={handleSelectDevOpen}  >  <AddIcon /> Ajouter les developpeurs  </Button>
							<Button sx={{
								backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff', marginLeft: '18px', textTransform: 'none', transition: 'transform 0.3s ease', // Add a transition effect for the transform property
								'&:hover': {
									backgroundColor: 'rgba(91, 208, 236, 1)',
									transform: 'translateY(2px)',

								},
								marginTop: '10px'
							}} onClick={handleSectionModalOpen} >Ajouter une nouvelle section </Button>
						</Stack>
					</Grid>
					<Grid item xs={2} sx={{ padding: '5px', border: 'solid 1px #fff', borderRadius: '5px', }} >
						<Stack direction={'column'}>
							{projectData.endDate === null ? <Button sx={{ backgroundColor: '  rgba(91,208,236,1)', color: 'white', border: 'solid 1px white', }} >Ajouter la date de fin</Button> : <Typography variant='h5' sx={{ color: '#fff' }}>{projectData.endDate.substring(0, 10)}   </Typography>}
							<Typography variant='h7' sx={{ color: 'gray' }} >Date de fin</Typography>
						</Stack>
					</Grid>
					<Grid items xs={6} >
						<Stack direction={'row'} sx={{ alignItems: 'end', alignContent: 'flex-end' }}>


							{projectData.clientId === null ?
								<Button variant="contained" color="primary" sx={{ marginTop: '50px' }} onClick={handleSelectClientOpen} >Ajouter le client </Button> : (
									<Stack direction={'column'} sx={{ padding: '5px', border: 'solid 1px #fff', borderRadius: '5px', marginLeft: '10px' }} >
										<Typography variant='h5' sx={{ color: 'white', }}> {clientName}  </Typography>
										<Typography variant='h7' sx={{ color: 'gray', padding: '5px', }}> Client  </Typography>

									</Stack>)
							}
							<AvatarGroup sx={{ marginLeft: '15px', }}  >
								<Avatars Data={projectDevsData} />
							</AvatarGroup>
						</Stack>

					</Grid>
					<Grid item xs={2}>



					</Grid>
				</Grid>
				<Box sx={{ borderTop: 1, borderColor: 'divider', marginTop: '30px' }}>
					<Tabs value={activeTab} onChange={handleTabChange}  >
						<Tab label="Vue d'ensemble" />
						<Tab label="Sections" />
					</Tabs>
				</Box  >
			</Box>
			{/* <Grid container spacing={2} marginTop={'15px'} >

				<Grid item xs={4}>
					<Card sx={{ height: '180px', }}>
						<CardContent>


							{projectData.clientId === null ? <Button variant="contained" color="primary" sx={{ marginTop: '50px' }} onClick={handleSelectClientOpen} >Ajouter le client </Button> : <Typography variant='h6' > {clientName}  </Typography>
							}

						</CardContent>
					</Card>
				</Grid>
				<Grid xs={4} item  >
					<Card sx={{ height: '180px', }}>
						<CardContent>
							<Stack direction={'column'} sx={{ alignContent: 'flex-end', display: 'flex' }} >
								<Stack direction={'row'} sx={{ alignItems: 'end', alignContent: 'flex-end', display: 'flex', marginBottom: '26px' }}>
									<AvatarGroup>
										<Avatars Data={projectDevsData} />
									</AvatarGroup>
									<Button sx={{ backgroundColor: ' rgba(91,208,236,1)', height: '40px', width: '50px' }} onClick={handleSelectDevOpen} fullWidth >  <AddIcon />  </Button>
								</Stack>
								<Button sx={{ backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff' }}  >Voir les developpeurs du projet </Button>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
				<Grid xs={4} item>
					<Card sx={{ height: '180px' }}
						onClick={handleSectionModalOpen}
					>
						<CardContent sx={{ textAlign: 'center' }}>

							<Stack direction={'column'} sx={{ textAlign: 'center', alignItems: 'center' }}>
								<AssignmentIcon sx={{ fontSize: 80, cursor: 'pointer' }} />
								<Button sx={{ backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff', marginTop: '18px' }}  >Ajouter une nouvelle section </Button>

							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Grid> */}
			<Stack direction={'row'} sx={{ justifyContent: 'spaceBetween', alignItems: 'center', alignContentCenter: 'center' }}>

				<SelectDevModal selectDevOpen={selectDevOpen} handleSelectDevClose={handleSelectDevClose} />

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
							<Button sx={{ backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff' }} onClick={handleClientModalOpen}   >  <AddIcon />  </Button>
						</Stack>
						<Button sx={{ backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff' }} onClick={handleClientUpdate} >Valider</Button>

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
								<Button type="submit" variant="contained" sx={{ backgroundColor: '  rgba(91,208,236,1)', border: 'solid 1px rgba(91,208,236,1) ', color: '#fff', mt: 2 }} >
									Submit
								</Button>
							</Box>
						</Modal>
					</Box>
				</Modal>
			</Stack>

			<Box sx={{ flexGrow: 1, width: '80vw', display: activeTab === 1 ? 'block' : 'none', marginTop: '20px' }}   >

				<Grid container >
					{
						sectionData?.map((section) => (
							<Grid key={section.id} item xs={12}>
								<SectionAccordion Data={section} />
							</Grid>
						))
					}
				</Grid>
			</Box>
			<Box sx={{ display: activeTab === 0 ? 'block' : 'none', marginTop: '20px' }}>
				<Stack direction={'row'} sx={{ width: '100%' }}>
					<Stack direction={'column'}>

						<Card sx={{ height: '180px', width: '50vw', marginBottom: '20px', marginRight: '20px' }}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs={4} >
										<Typography variant="h3">{sectionData.length}</Typography>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						{
							pubData?.length > 0 ? (
								<ProjectPublications pubData={pubData} />
							) : (
								<Typography>Aucune publication </Typography>
							)
						}
					</Stack>


					<Card sx={{ height: '360px', width: '30vw' }}>
						<CardHeader title={'Fichiers du projet'} />
						<CardContent>

						</CardContent>
					</Card>


				</Stack>
			</Box>
		</>
		)
	}
}
export default SelectedProject