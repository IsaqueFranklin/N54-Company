import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams, Link } from 'react-router-dom';
import PubNewsletterPage from './PubNewsletterPage';
import PubBookPage from './PubBookPage';
import { UserContext } from '../UserContext';
import Book from '../components.jsx/Book';


export default function PublicarPage(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [newsletter, setNewsletter] = useState(false);
    const [book, setBook] = useState(false);


    const [books, setBooks] = useState([]);

    const [seeBooks, setSeeBooks] = useState(false);

    useEffect(() => {
        axios.get('/get-books').then(response => {
            setBooks([...response.data])
        })
    }, [])

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
        <section className="bg-white my-48 lg:mt-0">
            
            <div className='my-16 max-w-4xl mx-auto my-auto'>
                    <h1 className="text-xl font-light leading-tight tracking-tight text-gray-900 lg:text-3xl mb-4">
                        Qual tipo de publicação deseja criar?
                    </h1>
                    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 p-6 grid grid-cols-2 gap-4">
                        <div className="">
                            <Link><button onClick={() => setNewsletter(true)} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Newsletter</button></Link>
                        </div>
                        <div className="">
                            <Link><button onClick={() => setBook(true)} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Novo Book</button></Link>
                        </div>
                    </div>
                <Book books={books} />
            </div>
        </section>
    )
}