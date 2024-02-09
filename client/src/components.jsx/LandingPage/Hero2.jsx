import { Link } from "react-router-dom";

export default function Hero2() {
    return (
        <div className="mx-auto max-w-2xl text-center px-8 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Comece pelo plano gratuito</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-8">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
            in. Explicabo id ut laborum.
          </p>
          <Link to={'/register'} className='mt-16'><button className="mt-16 py-2 px-6 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-4 hover:bg-white hover:text-black">Crie sua conta gratuita</button></Link>
        </div>
    )
}