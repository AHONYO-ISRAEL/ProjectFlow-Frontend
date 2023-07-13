import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import  store from './features/configStore'
import App from './App.jsx'
import './index.css'
import  {PersistGate} from 'redux-persist/integration/react'
import  {persistStore} from 'redux-persist'

let persistor =  persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>
      <PersistGate persistor= {persistor} >
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
)
