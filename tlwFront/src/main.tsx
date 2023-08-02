import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { StateProvider } from './contexts/context'

ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <StateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  
)
