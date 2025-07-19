
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import {Provider} from "react-redux"
import { store } from './redux/store.js'
axios.defaults.withCredentials = true;
// export const serverURL="https://chat-on-backend-j3cp.onrender.com"
  export const serverURL = "https://chatbook-backend.onrender.com";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}> {/* provider jo hai wo har jagah store se jo dataaaya hai usko pahuchata hai  aur store ek attribute hota hai usko store ke through store ka data denge*/}
     <App /> 
  </Provider>
  </BrowserRouter>
    
  
)
