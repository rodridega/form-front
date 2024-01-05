import { MainLayout } from '../../layouts'
import { Input } from '../../components'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

export const Login = () => {

  const { user, setUser, signIn, isAuthenticated, error } = useContext(AuthContext)  

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
      <section className='flex flex-col items-center justify-between'>
        <div className='w-1/2 lg:w-full grid place-content-center'>
          <img src={logo} alt='logo' />
        </div>
        <form onSubmit={handleLogin} className='bg-dorado my-12 p-4 rounded-md'>
          <Input setFormData={setUser} name={'name'} label={'¿Como es tu nombre?'} />
          <Input setFormData={setUser} name={'number'} label={'Nro de telefono'} />
          <Input setFormData={setUser} name={'email'} label={'Correo electronico'} />
          <button className='bg-vivvi p-2 rounded w-full my-4 text-white' >
            Ingresar
          </button>
        </form>
        {error && <p className='text-center text-white text-2xl'> {error} </p>}
      </section>
    </MainLayout>
  )
}
