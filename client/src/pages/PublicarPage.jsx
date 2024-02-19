import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, Link } from 'react-router-dom';
import PubNewsletterPage from './PubNewsletterPage';
import PubBookPage from './PubBookPage';
import { UserContext } from '../UserContext';


export default function PublicarPage(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [newsletter, setNewsletter] = useState(false);
    const [book, setBook] = useState(false);


    const [books, setBooks] = useState([]);

    if(ready && !user){
        return <Navigate to={'/cadastro'} />
    }

    if(newsletter){
        return (
            <PubNewsletterPage />
        )
    }

    if(book){
        return (
            <PubBookPage />
        )
    }

    return (
        <section className="bg-white my-auto items-center mt-48 lg:mt-0">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className='border border-gray-800 shadow rounded-xl p-16'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-16">
                        Qual tipo de publicação deseja criar
                    </h1>
                    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 p-6 grid grid-cols-2 gap-4">
                        <div className="">
                            <Link><button onClick={() => setNewsletter(true)} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Newsletter</button></Link>
                        </div>
                        <div className="">
                            <Link><button onClick={() => setBook(true)} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Novo Book</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}