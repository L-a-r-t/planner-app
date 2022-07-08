import React from 'react'
import ReactDOM from 'react-dom/client'
import 'App.css'
import reportWebVitals from 'reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Protected from 'utils/logic/Protected'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import Home from 'pages/Home'
import Calendar from 'pages/Calendar'
import CornerModal from 'features/CornerModal'
import axios from 'axios'
import { Auth0Provider } from '@auth0/auth0-react'
import LoggedIn from 'pages/LoggedIn'

// in dev use 'http://localhost:3001/api'
// in prod use 'https://dispo-planner.herokuapp.com/api'
axios.defaults.baseURL = 'http://localhost:3002/api'

const darkmodeCookie = localStorage.getItem('darkmode')
if (darkmodeCookie) {
    document.querySelector(':root')?.setAttribute('data-theme', darkmodeCookie === 'true'
        ? "dark"
        : "light")
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// document.getElementById('root')?.setAttribute('data-theme', 'dark');
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Auth0Provider
      domain='dev-zl-5ep6x.eu.auth0.com'
      clientId='LyL7p0FlqSQBRZuE9QbpOer6S8VZtToy'
      audience='https://test.api'
      redirectUri={window.location.origin}
    >      
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/calendar/:id" element={<Protected component={Calendar} />}/>
          <Route path="/loggedin" element={<LoggedIn />}/>
        </Routes>
      </Router>
      <CornerModal />
    </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
