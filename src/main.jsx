import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { installSpringVars } from './lib/spring.js'

installSpringVars()
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
