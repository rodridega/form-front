import { MainLayout } from '../../layouts'
import cliente1 from '../../assets/cliente-1.png'
import cliente2 from '../../assets/cliente-2.png'
import cliente3 from '../../assets/cliente-3.jpg'
import logo from '../../assets/logo2.png'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const Final = () => {

    const { setIsAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        setIsAuthenticated(false)
    }, [])


    return (
        <MainLayout>
            <div className='w-full grid place-content-center'>
                <img src={logo} alt='logo' />
            </div>
            <section className='bg-white text-vivvi p-4 rounded-xl mt-10'>
                <h1 className='text-2xl lg:text-5xl text-center font-semibold mb-6'>Elije como quieres vivir!</h1>
                <article className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='rounded overflow-hidden flex justify-center items-center'>
                        <img src={cliente1} alt='cliente' className='w-full object-cover' />
                    </div>
                    <div className='rounded overflow-hidden flex justify-center items-center'>
                        <img src={cliente2} alt='cliente' className='w-full object-cover' />
                    </div>
                    <div className='rounded overflow-hidden flex justify-center items-center'>
                        <img src={cliente3} alt='cliente' className='w-full object-cover' />
                    </div>
                </article>
            </section>

        </MainLayout>
    )
}
