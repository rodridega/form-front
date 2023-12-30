
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, Login } from './pages'
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
