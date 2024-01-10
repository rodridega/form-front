import { FormEvent, useContext, useState } from 'react'
import { FormData, QuestionData } from '../../types/FormData';
import axios from 'axios';
import logo from '../../assets/logo2.png'
import { MainLayout } from '../../layouts';
import { Input, Select } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { validateObject } from '../../helpers/validateData';
import { Navigate, useNavigate } from 'react-router-dom';

const initialScore: QuestionData = {
    questionNumber: 0,
    responseValue: 0,
    responseScore: 0
}

const initialState: FormData = {
    product: initialScore,
    channel: initialScore,
    location: initialScore,
    stakeholder: initialScore,
    knowTheCustomer: initialScore,
    intentions: initialScore,
    realStateDescription: initialScore,
    realStateArea: initialScore,
    realStateRoomsAndBaths: initialScore,
    realStateProjectName: initialScore,
    timeConstructionCompany: initialScore,
    timeToStart: initialScore,
    maxBudgetToInvest: initialScore,
    budgetNow: initialScore,
    interest: initialScore,
    advantages: initialScore
}

export const HomePage = () => {

    const [formData, setFormData] = useState<FormData>(initialState)
    const { user, setError, error, success, setSuccess, setUser, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (validateObject(formData)) {
            axios.post('https://deep-sort-production.up.railway.app/save-response', { name: user.name, number: user.number, email: user.email, userId: user.userId, responses: Object.values(formData) })
                .then((data) => {
                    setError('')
                    setSuccess(data.data)
                    setTimeout(() => {
                        setSuccess('')
                    }, 5000);
                    localStorage.removeItem('user')
                    setUser({
                        name: '',
                        number: '',
                        email: '',
                        userId: undefined,
                    })
                }
                )

            navigate('/final')
        } else {
            setSuccess('')
            setError('Todos los campos son obligatorios')
            setTimeout(() => {
                setError('')
            }, 5000);
            console.log("Faltan datos");
        }
    }

    if (!isAuthenticated) return <Navigate to={'/login'} replace />

    return (
        <MainLayout>
            <div className='flex items-center w-full justify-center'>
                <img src={logo} alt='log' className='w-1/4 lg:w-1/12' />
            </div>

            <h1 className='text-white text-center text-lg lg:text-3xl my-4'>Pronto nos comunicaremos contigo <span>&#128241;</span></h1>

            <form className='grid lg:grid-cols-2 gap-2 bg-white rounded-md p-2 lg:p-10 lg:gap-10'>

                <Select setFormData={setFormData} name={'product'} label={'Producto'} questionNumber={1} multiply={1} options={[{ label: 'VIS' }, { label: 'Usado' }, { label: 'Pack VIS' }]} />
                <Select setFormData={setFormData} name={'channel'} label={'¿Donde nos conociste?'} questionNumber={2} multiply={2} options={[{ label: 'Pauta Digital', value: 2 }, { label: 'Cotizador virtual', value: 3 }, { label: 'Redes sociales / Google', value: 4 }, { label: 'Referido / Conocido', value: 5 }]} />
                <Select setFormData={setFormData} name={'location'} label={'¿Donde quieres remodelar?'} questionNumber={3} multiply={5} options={[{ label: 'Bogotá', value: 5 }, { label: 'Otro', value: 0 }]} />
                <Select setFormData={setFormData} name={'stakeholder'} label={'¿La remodelación que quieres hacer es para?'} questionNumber={4} multiply={3} options={[{ label: 'Para mi' }, { label: 'Para otra persona' }]} />
                <Select setFormData={setFormData} name={'knowTheCustomer'} label={'¿Qué es lo mas importante para ti en una remodelación?'} questionNumber={5} multiply={2} options={[{ label: 'Precio', value: 3 }, { label: 'Velocidad', value: 4 }, { label: 'Diseño / Acompañamiento', value: 5 }]} />
                <Select setFormData={setFormData} name={'intentions'} label={'¿Remodelas para?'} questionNumber={6} multiply={1} options={[{ label: 'Para vivir' }, { label: 'Inversión' }]} />
                <Input setFormData={setFormData} name={'realStateDescription'} label={'Descripción del inmueble'} questionNumber={7} />
                <Input setFormData={setFormData} name={'realStateArea'} label={'¿Que área privada tiene el inmueble?'} questionNumber={8} />
                <Input setFormData={setFormData} name={'realStateRoomsAndBaths'} label={'¿Cuantas habitaciones y baños tiene el inmueble?'} questionNumber={9} />
                <Input setFormData={setFormData} name={'realStateProjectName'} label={'¿Cómo se llama el proyecto?'} questionNumber={10} />
                <Select setFormData={setFormData} name={'timeConstructionCompany'} label={'¿La constructora ya te entregó el inmueble? De no ser así, ¿cuando te lo entregan?'} questionNumber={11} multiply={5} options={[{ label: 'No lo se', value: 0 }, { label: 'El otro año', value: 1 }, { label: 'Más de 12 meses', value: 2 }, { label: 'Entre 3 a 6 meses', value: 3 }, { label: 'En menos de 3 meses', value: 4 }, { label: 'Ya me entregó', value: 5 }]} />
                <Select setFormData={setFormData} name={'timeToStart'} label={'¿Cuando te gustaría iniciar la remodelación?'} questionNumber={12} multiply={5} options={[{ label: 'No lo se', value: 0 }, { label: 'El otro año', value: 1 }, { label: 'Más de 12 meses', value: 2 }, { label: 'Entre 3 a 6 meses', value: 3 }, { label: 'En menos de 3 meses', value: 4 }, { label: 'Ya me entregó', value: 5 }]} />
                <Select setFormData={setFormData} name={'maxBudgetToInvest'} label={'¿Cuanto presupuesto máximo te gustaría invertir?'} questionNumber={13} multiply={5} options={[{ label: '50% o menos sobre calculadora', value: 0 }, { label: '60% sobre calculadora', value: 1 }, { label: '70% sobre calculadora', value: 2 }, { label: '80% sobre calculadora', value: 3 }, { label: '90% sobre calculadora', value: 4 }, { label: '100% sobre calculadora', value: 5 }]} />
                <Select setFormData={setFormData} name={'budgetNow'} label={'¿Ya cuentas con los recursos para realizar tu remodelación?'} questionNumber={14} multiply={5} options={[{ label: 'No', value: 0 }, { label: 'No, dependo de venta de inmueble', value: 1 }, { label: 'No, lo haré con credito', value: 3 }, { label: 'No, lo hare con cesantias', value: 4 }, { label: 'Si', value: 5 }]} />
                <Select setFormData={setFormData} name={'interest'} label={'¿Ya has realizado alguna cotización aparte de esta?'} questionNumber={15} multiply={2} options={[{ label: 'No' }, { label: 'Si' }]} />
                <Select setFormData={setFormData} name={'advantages'} label={'¿Estas buscando algo que no hayas encontrado en otra cotización'} questionNumber={16} multiply={1} options={[{ label: 'No' }, { label: 'Si' }]} />
            </form>
            <div className='lg:flex lg:justify-center'>
                <button className='bg-white flex justify-center w-full my-2 p-4 rounded-md text-vivvi text-2xl font-semibold lg:w-96 hover:bg-slate-200 transition-all duration-500' type='submit' onClick={handleSubmit}>Enviar <span>&#128232;</span></button>
            </div>
            {success && <p className='text-center text-white text-2xl'> {success} </p>}
            {error && <p className='text-center text-white text-2xl'> {error} </p>}
        </MainLayout>
    )
}
