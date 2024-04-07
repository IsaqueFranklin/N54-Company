import { Link } from "react-router-dom";

export default function Hero2() {
    return (
        <div className="mx-auto max-w-2xl text-center px-8 mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Alcance mais resultados com a N54 Company do seu lado</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-6">
          Deixe-nos ajudá-lo a alcançar resultados incríveis com nossas técnicas de tráfego pago e estratégias de marketing digital personalizadas.
          </p>
          <Link to={'/register'} className='mt-16'><button className="mt-16 py-2 px-6 rounded rounded-lg bg-gray-800 text-white max-w-sm mt-2 mb-4 hover:bg-white hover:text-black">Começar projeto</button></Link>
        </div>
    )
}