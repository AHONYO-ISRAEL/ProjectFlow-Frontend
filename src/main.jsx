import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import  store from './features/configStore'
import  {PersistGate} from 'redux-persist/integration/react'
import  {persistStore} from 'redux-persist'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'



let persistor =  persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store ={store}>
      <PersistGate persistor= {persistor} >
    <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
