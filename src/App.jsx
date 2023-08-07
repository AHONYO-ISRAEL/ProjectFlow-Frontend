import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { accessTokenUpdate } from './features/auth/authSlice'


import Admin  from './routes/Admin'
import Client  from './routes/Client'
import Public  from './routes/Public'
import Developer  from './routes/Developer'



// import {Routes, Route} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const userInfo = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  useEffect(()=>{
    axios
    .post('http://localhost:3000/api/auth/refreshAccessToken',  {refreshToken: userInfo.refreshToken , accessToken : userInfo.accessToken} )
    .then((response)=>{
      const newAccessToken = response.data.newAccessToken
      console.log(newAccessToken)

      if(newAccessToken){
        dispatch(accessTokenUpdate(newAccessToken))
      }else {
        return
      }

    })
    .catch(error =>{
      console.log(error)
    })
    
  },  [dispatch, userInfo.refreshToken,userInfo.accessToken] )



  return (
    <>
    <ThemeProvider theme={lightTheme}   >
      <CssBaseline/>
<Public/>
   <Admin/>
<Client/>
<Developer/>
</ThemeProvider>
    </>
  )
}

export default App
