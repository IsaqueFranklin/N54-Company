import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';
import Modulos from './Modulos';

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
                        <div className="border border-gray-800 rounded-2xl py-8 px-6 mb-2">
                            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                                {book.photos?.[0] && (
                                    <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+book.photos?.[0]} />
                                )}
                            </div>
                            <h2 className='font-bold text-black'>{book.title}</h2>
                            <h3 className='text-sm text-gray-900'>{book.description}</h3> 
                            {/*<div className='content' dangerouslySetInnerHTML={{__html:post.content}} /> */}   
                            <button onClick={() => {setCreateModule(true), setBookId(book._id)}} className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-6'>Criar módulo</button>
                            {seeModules && wichBook === book._id ? (
                                <Modulos modulos={modules.filter(module => module.conjunto === book._id)} />
                                
                            ) : (<button onClick={() => (setSeeModules(true), setWichBook(book._id))} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ver meus livros</button>)}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}