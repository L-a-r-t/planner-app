import React from 'react'
import ReactDOM from 'react-dom/client'
import 'App.css'
import reportWebVitals from 'reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import Home from 'pages/Home'
import Calendar from 'pages/Calendar'
import CornerModal from 'components/CornerModal'
import axios from 'axios'
import DarkMode from 'components/DarkMode'

// in dev use 'http://localhost:3001/api'
axios.defaults.baseURL = 'https://dispo-planner.herokuapp.com/api'

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
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/calendar/:id" element={<Calendar />}/>
        </Routes>
      </Router>
      <DarkMode />
      <CornerModal />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
