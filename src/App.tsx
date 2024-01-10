
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Final, HomePage, Login } from './pages'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoutes } from './ProtectedRoutes'

function App() {




  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />} >
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route path='/final' element={<Final />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
