import { useContext, useState } from 'react'
import { FormData } from '../../types/FormData';
import axios from 'axios';
import logo from '../../assets/logo.png'
import { MainLayout } from '../../layouts';
import { Input, Select } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { validateObject } from '../../helpers/validateData';

const initialState: FormData = {
    product: '',
    channel: 0,
    location: 0,
    stakeholder: 0,
    knowTheCustomer: 0,
    intentions: '',
    realStateDescription: '',
    realStateArea: '',
    realStateRoomsAndBaths: '',
    realStateProjectName: '',
    timeConstructionCompany: 0,
    timeToStart: 0,
    maxBudgetToInvest: 0,
    budgetNow: 0,
    interest: '',
    advantages: ''
}

export const HomePage = () => {

    const [formData, setFormData] = useState<FormData>(initialState)
    const { user } = useContext(AuthContext)
    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/enviar-respuesta', { usuarioId: user.usuarioId, respuestas: Object.values(formData) })
            .then((data) => console.log(data)
            )
        if (validateObject(formData)) {
            axios.post('http://localhost:3000', { formData })
        } else {
            console.log("Faltan datos");

        }

    }
    console.log(formData);

    return (
        <MainLayout>
            <div className='flex items-center w-full justify-center'>
                <img src={logo} alt='log' className='w-1/4 m-6 lg:w-1/12' />
                <h1 className='hidden lg:block text-white text-5xl'>Elige como quieres vivir!</h1>
            </div>
            <form className='grid lg:grid-cols-2 gap-2 bg-dorado rounded-md p-2 lg:p-10 lg:gap-10'>

                <Select setFormData={setFormData} name={'product'} label={'Producto'} options={[{ label: 'VIS' }, { label: 'Usado' }, { label: 'Pack VIS' }]} />
                <Select setFormData={setFormData} name={'channel'} label={'¿Por donde nos conociste?'} options={[{ label: 'Pauta Digital', value: 2 }, { label: 'Cotizador virtual', value: 3 }, { label: 'Redes sociales / Google', value: 4 }, { label: 'Referido / Conocido', value: 5 }]} />
                <Select setFormData={setFormData} name={'location'} label={'¿Donde quieres remodelar? (ciudad y barrio)'} options={[{ label: 'Bogotá', value: 5 }, { label: 'Otro', value: 0 }]} />
                <Select setFormData={setFormData} name={'stakeholder'} label={'¿La remodelación que quieres hacer es para ti? o ¿Para alguien mas?'} options={[{ label: 'Para mi' }, { label: 'Para otra persona' }]} />
                <Select setFormData={setFormData} name={'knowTheCustomer'} label={'¿Que es lo mas importante para ti en una remodelación?'} options={[{ label: 'Precio', value: 3 }, { label: 'Velocidad', value: 4 }, { label: 'Diseño / Acompañamiento', value: 5 }]} />
                <Select setFormData={setFormData} name={'intentions'} label={'¿Remodelas la vivienda por inversión o para tu vivir alli?'} options={[{ label: 'Para vivir' }, { label: 'Inversión' }]} />
                <Input setFormData={setFormData} name={'realStateDescription'} label={'Descripción del inmueble'} />
                <Input setFormData={setFormData} name={'realStateArea'} label={'¿Que área privada tiene el inmueble?'} />
                <Input setFormData={setFormData} name={'realStateRoomsAndBaths'} label={'¿Cuantas habitaciones y baños tiene el inmueble?'} />
                <Input setFormData={setFormData} name={'realStateProjectName'} label={'¿Cómo se llama el proyecto?'} />
                <Select setFormData={setFormData} name={'timeConstructionCompany'} label={'¿La constructora ya te entregó el inmueble? De no ser así, ¿cuando te lo entregan?'} options={[{ label: 'No lo se', value: 0 }, { label: 'El otro año', value: 1 }, { label: 'Más de 12 meses', value: 2 }, { label: 'Entre 3 a 6 meses', value: 3 }, { label: 'En menos de 3 meses', value: 4 }, { label: 'Ya me entregó', value: 5 }]} />
                <Select setFormData={setFormData} name={'timeToStart'} label={'¿Cuando te gustaría iniciar la remodelación?'} options={[{ label: 'No lo se', value: 0 }, { label: 'El otro año', value: 1 }, { label: 'Más de 12 meses', value: 2 }, { label: 'Entre 3 a 6 meses', value: 3 }, { label: 'En menos de 3 meses', value: 4 }, { label: 'Ya me entregó', value: 5 }]} />
                <Select setFormData={setFormData} name={'maxBudgetToInvest'} label={'¿Cuanto presupuesto máximo te gustaría invertir?'} options={[{ label: '50% o menos sobre calculadora', value: 0 }, { label: '60% sobre calculadora', value: 1 }, { label: '70% sobre calculadora', value: 2 }, { label: '80% sobre calculadora', value: 3 }, { label: '90% sobre calculadora', value: 4 }, { label: '100% sobre calculadora', value: 5 }]} />
                <Select setFormData={setFormData} name={'budgetNow'} label={'¿Ya cuentas con los recursos para realizar tu remodelación?'} options={[{ label: 'No', value: 0 }, { label: 'No, dependo de venta de inmueble', value: 1 }, { label: 'No, lo haré con credito', value: 3 }, { label: 'No, lo hare con cesantias', value: 4 }, { label: 'Si', value: 5 }]} />
                <Select setFormData={setFormData} name={'interest'} label={'¿Ya has realizado alguna cotización aparte de esta?'} options={[{ label: 'No' }, { label: 'Si' }]} />
                <Select setFormData={setFormData} name={'advantages'} label={'¿Estas buscando algo que no hayas encontrado en otra cotización'} options={[{ label: 'No' }, { label: 'Si' }]} />
            </form>
            <div className='lg:flex lg:justify-center'>
                <button className='bg-dorado w-full my-2 p-4 rounded-md text-vivvi text-2xl lg:w-96' type='submit' onClick={handleSubmit}>Enviar</button>
            </div>
        </MainLayout>
    )
}
