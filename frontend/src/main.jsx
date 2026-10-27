import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { EditProvider } from './contextapi/Editcontext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <EditProvider>
       <App />
       </EditProvider>
   



  </StrictMode>,
)
