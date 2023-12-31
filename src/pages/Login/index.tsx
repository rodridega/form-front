import { MainLayout } from '../../layouts'
import { Input } from '../../components'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const Login = () => {

  const { user, setUser, signIn, isAuthenticated } = useContext(AuthContext)


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user);
    
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
        <form onSubmit={handleLogin} className='bg-dorado'>
          <Input setFormData={setUser} name={'nombre'} label={'¿Como es tu nombre?'} />
          <Input setFormData={setUser} name={'telefono'} label={'Nro de telefono'} />
          <Input setFormData={setUser} name={'correo'} label={'Correo electronico'} />
          <button>
            Ingresar
          </button>
        </form>
      </section>
    </MainLayout>
  )
}
