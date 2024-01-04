import { MainLayout } from '../../layouts'
import { Input } from '../../components'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

export const Login = () => {

  const { user, setUser, signIn, isAuthenticated } = useContext(AuthContext)

  console.log(user);
  

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
      <section className='flex flex-col items-center justify-between'>
        <div className='w-1/2 lg:w-full lg:grid lg:place-content-center'>
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
      </section>
    </MainLayout>
  )
}
