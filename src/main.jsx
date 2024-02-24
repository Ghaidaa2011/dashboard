import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Style.css';
import './index.css';
import './pages/dashboard/Dashboard.css'
import { Provider } from 'react-redux'
import store from './app/store'
import UserProvider from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
    </Provider>
  </React.StrictMode>,
)

