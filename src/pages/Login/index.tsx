import { MainLayout } from '../../layouts'
import { Input } from '../../components'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const Login = () => {

  const { user, setUser, signIn, isAuthenticated } = useContext(AuthContext)


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      signIn(user)

    } catch (error) {
      console.log(error);
    }
  }
  if (isAuthenticated) return <Navigate to={'/'} replace />


  return (
    <MainLayout>
      <section>
        <form onSubmit={handleLogin}>
          <Input setFormData={setUser} name={'name'} label={'¿Como es tu nombre?'} />
          <Input setFormData={setUser} name={'phoneNumber'} label={'Nro de telefono'} />
          <Input setFormData={setUser} name={'email'} label={'Correo electronico'} />
          <button>
            Ingresar
          </button>
        </form>
      </section>
    </MainLayout>
  )
}
