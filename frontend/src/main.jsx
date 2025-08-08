// import { React } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './store/index.js'

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//      <Provider store={store}>    <App /></Provider>
//     </Router>
 
//   </React.StrictMode>,
// );

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'


const root = createRoot(document.getElementById('root'))

// root.render(
//   <React.StrictMode>
//     <Router>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Router>
//   </React.StrictMode>
// )
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)