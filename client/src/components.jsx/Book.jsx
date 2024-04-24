import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';
import Modulos from './Modulos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Book({books}){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    //States for modules
    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [moduleAddedPhotos, setModuleAddedPhotos] = useState([]);

    const [createModule, setCreateModule] = useState(false);
    const [bookId, setBookId] = useState(null);

    const [seeModules, setSeeModules] = useState(false);
    const [modules, setModules] = useState([]);

    const [wichBook, setWichBook] = useState(null);

    useEffect(() => {
        axios.get('/get-modulos').then(response => {
            setModules([...response.data])
        })
    }, [])

    async function saveModule(ev){
        ev.preventDefault();

        const modulePostData = {
            moduleTitle, moduleDescription, moduleAddedPhotos, dia:new Date(), bookId
        }

        setCreateModule(false);
        setModuleTitle('');
        setModuleDescription('');
        setModuleAddedPhotos([]);

        if(user.admin){
            if(id){
                await axios.post('/criar-modulo', {
                    id, ...modulePostData
                })
                
            } else {
                await axios.post('/criar-modulo', {
                    ...modulePostData
                })
            }
        }
    }

    if(createModule){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl'>
                <form onSubmit={saveModule}>
                    <h2 className='text-2xl mt-4 mb-4'>Título do seu módulo</h2>
                    <input type="text" value={moduleTitle} onChange={ev => setModuleTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                    <h2 className='text-2xl mt-12 mb-4'>Descrição do seu módulo</h2>
                    <input type="text" value={moduleDescription} onChange={ev => setModuleDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                    <h2 className='text-2xl mt-12 mb-4'>Foto de capa do seu módulo</h2>
                    <PhotosUploader addedPhotos={moduleAddedPhotos} onChange={setModuleAddedPhotos} />

                    <div className='mb-10 mt-12'>
                        <button className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-20'>Publicar</button>
                    </div>
                </form>
            </div>
        )
    }
    
    return (
        <div className='mt-8'>
            {books?.length > 0 && books?.map((book, index) => {
                return (
                    <Link key={index} className=''>
                        <div className="py-1 lg:py-4 mb-2">
                            <div className='flex lg:mb-2'>
                                <div className='bg-gray-500 mb-2 rounded-2xl'>
                                    <img className='rounded-2xl aspect-square min-w-24 max-w-24 h-24' src={'http://localhost:5000/uploads/'+book.photos?.[0]} />
                                </div>
                                <div className='my-auto mx-2 lg:mx-8'>
                                    <h2 className='font-light text-gray-800 text-lg lg:text-3xl'>{book.title}</h2>
                                    <h3 className='text-sm text-gray-900'>{book.description}</h3> 
                                    {/*<div className='content' dangerouslySetInnerHTML={{__html:post.content}} /> */}  
                                </div>
                            </div> 
                            <div className=''>
                            <button onClick={() => {setCreateModule(true), setBookId(book._id)}} className='py-2 px-2 rounded-full bg-[#0047AB] text-white hover:bg-gray-700 hover:text-white'>
                            <svg class="lg:w-6 lg:h-6 w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                            </button>

                            {seeModules && wichBook === book._id ? (
                                <>
                                    <button onClick={() => (setSeeModules(false), setWichBook(null))} type="submit" className="mx-2 text-white bg-gray-700 hover:bg-[#0047AB] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center">
                                        <svg class="lg:w-6 lg:h-6 w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                                        </svg>
                                    </button>
                                    <Modulos modulos={modules.filter(module => module.conjunto === book._id)} />
                                </>
                                
                            ) : (<button onClick={() => (setSeeModules(true), setWichBook(book._id))} type="submit" className="mx-2 text-white bg-[#0047AB] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center">
                                    <svg class="lg:w-6 lg:h-6 h-3 w-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                    </svg>
                                </button>)}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}