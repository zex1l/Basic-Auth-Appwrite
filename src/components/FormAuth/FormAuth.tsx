import './FomrAuth.css'
import { useState, ChangeEvent, FormEvent } from 'react';

import useAuth from '../../providers/useAuth';

const FormAuth = () => {
    const [email, setEmail] = useState <string>('')
    const [password, setPassword] = useState <string>('')
    const [isRegister, setIsRegister] = useState<boolean>(false)


    const {authUser} = useAuth()

    const onChangeData = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }

    const onSubmitData = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await authUser(email, password, isRegister)
       
        setPassword('')
        setEmail('')
    }


    return (
        <form className='form' onSubmit={onSubmitData}>
            <header className="form__header">Регистрация</header>
            <div className="form__content">
                <label htmlFor="email" className="form__content-label">Email</label>
                <input 
                    className='form__content-input'
                    type="email" 
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={onChangeData}
                    required
                />
                <label htmlFor="passwod" className="form__content-label">Password</label>
                <input 
                    className='form__content-input'
                    type="passwod" 
                    placeholder='passwod'
                    name='passwod'
                    value={password}
                    onChange={onChangeData}
                    required
                />

                <button 
                    className="form__content-button"
                    onClick={() => setIsRegister(true)}
                >
                    Регистрация
                </button>
                <button 
                    className="form__content-button"
                >
                    Авторизация
                </button>
            </div>
        </form>
    );
};

export default FormAuth;