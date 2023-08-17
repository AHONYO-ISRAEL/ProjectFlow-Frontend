import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import UserAvatar from '../../UserAvatar'
import { Box, Drawer, Toolbar, List, Divider, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';

//import SearchIcon from '@mui/icons-material/Search';
//import InputBase from '@mui/material/InputBase';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../features/auth/authSlice'

import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';
import TaskIcon from '@mui/icons-material/Task';
import LogoutIcon from '@mui/icons-material/Logout';
import Logos from '../../../images/logo.png'



/*
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
*/
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const VerticalNavBar = ({ body }) => {
  const userInfo = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false)



  const handleDrawerToggle = () => {
    setOpen(!open);
    setIsVisible(!isVisible)

  };

console.log(userInfo.userName)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#fff', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', }}   >
        <Toolbar   >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isVisible ? 'space-between' : '', width: '100%' }} >

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon sx={{ color: '  #006DF4' }} />
            </IconButton>
            <img src={Logos} style={{ width: '15%', display: isVisible ? 'block' : 'none', }}></img>
            <div style={{ marginLeft: isVisible ? '' : '76vw' , display:'flex', alignItems:'center'}}>
              <UserAvatar data = {userInfo.userName} />

            <IconButton  >
              <LogoutIcon sx={{ color: '#1a1a1a', fontSize: '30px',}} onClick={() => {
              dispatch(logout)
              window.location.replace('/');
            }} />
            </IconButton>
            </div>
  
          </div>
        </Toolbar>
      </AppBar>
      <Drawer

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: '  #006DF4',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: '#fff', borderBottomRightRadius: '5px' }}  >
          <img src={Logos} style={{ width: '80%' }}></img>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: '  #006DF4', }} /> : <ChevronRightIcon sx={{ color: '  #006DF4', }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {[
            { text: 'Tableau de bord', icon: <DashboardIcon />, link: 'Home' },
            { text: 'Projects', icon: <FolderIcon />, link: 'Projects' },
            { text: 'Task', icon: <TaskIcon />, link: 'Task' },
          ].map((item) => (
            <Link key={item.text} to={`../developer/${item.link}`} style={{ color: 'inherit', textDecoration: 'none' }}  >
              <ListItem key={item.text} disablePadding       >
                <ListItemButton>
                  <ListItemIcon  sx={{color:'#fff'}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{color:'#fff'}} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

      </Drawer>
      <Main open={open} sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', backgroundColor: '#f2f2f2', minHeight: '100vh', }}  >
        <DrawerHeader />
        {body}
      </Main>
    </Box>
  );
}

VerticalNavBar.propTypes = {
  body: PropTypes.node,


}

export default VerticalNavBar;
