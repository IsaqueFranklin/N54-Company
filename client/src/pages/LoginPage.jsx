import {useState, useEffect, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginPage(){

    const {setUser, ready} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [redirect, setRedirect] = useState(null)

    const [code, setCode] = useState('');
    const [codes, setCodes] =  useState('');
    const [verifyEmail, setVerifyEmail] =  useState(false);

    const absoluta = 0;

    useEffect(() => {
       randomCode();
    }, [absoluta])

    function randomCode(){
        const codey = Math.floor(100000 + Math.random() * 900000);
        setCodes(codey);
    }

    async function registerUser(ev){
        ev.preventDefault();

        if(false){
            return;
        } else {
            if(code.toString() === codes.toString()){
                try {
                    const {data} = await axios.post('/login', {
                        email,
                        password,
                    })
        
                    setUser(data);
                    alert('Login bem-sucedido.')
                    setRedirect('/dashboard');
                } catch (e) {
                    alert('O login falhou.')
                    console.log('Erro: '+e)
                }
            } else {
                alert('O código está errado.')
            }
        } 
    }

    async function verify_Email(ev){
        ev.preventDefault();

        try {
            setVerifyEmail(true);
            await axios.post('/2fa-confirmar-email', {
                email,
                password,
                codes
            });
        } catch (e) {
            console.log(e)
        }
    }

    if (redirect) {
        return (
            <Navigate to={redirect} />
        )
    }

    if(verifyEmail){
        return (
            <section className="bg-white my-auto items-center mt-48 lg:mt-0">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    N54 Club    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Um código foi enviado para o seu email
                        </h1>
                        <form onSubmit={registerUser} className="space-y-4 md:space-y-6" method="POST">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Digite o código</label>
                                <input value={code} onChange={ev => setCode(ev.target.value)} type="number" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Exemplo: 123456" required="" />
                            </div>
                            <button type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
            </section>
        )
    }

    return (
        <div className="lg:grid lg:grid-cols-2">
            <div className="bg-gray-900 text-white">
                <div className="p-12 lg:px-56 lg:py-56">
                    <h2 className="text-4xl font-semibold mt-8 lg:mt-0 mx-auto my-auto items-center">O clube de networking e negócios que você precisa.</h2>
                    <h2 className='text-xl font-light mt-4'>Aprenda de forma exclusiva os principais segredos de marketing digital do mercado para alavancar seus negócios online.</h2>
                </div>
            </div>
            <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    N54 Club    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Faça parte da N54 Club
                        </h1>
                        <form onSubmit={verify_Email} className="space-y-4 md:space-y-6" method="POST">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Seu email</label>
                                <input value={email} onChange={ev => setEmail(ev.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="fulano@algumacoisa.com" required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Sua senha</label>
                                <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu sua senha?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Fazer login</button>
                            <p className="text-sm font-light text-gray-600">
                                Ainda não tem uma conta ativa? <a href="/cadastro" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Criar conta</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}