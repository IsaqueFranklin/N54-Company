import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';
import ContentCreateDock from './ContentCreateDock';

export default function Modulos({ modulos }) {

    const { ready, user, setUser } = useContext(UserContext);
    const { id } = useParams();

    const [createContent, setCreateContent] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const [seeContents, setSeeContents] = useState(false);
    const [contents, setContents] = useState([]);

    const [wichBook, setWichBook] = useState(null);

    useEffect(() => {
        axios.get('/get-contents').then(response => {
            setContents([...response.data])
        })
    }, [])

    if (createContent) {
        return <Navigate to={"/criar-conteudo/" + moduleId} />
    }

    return (
        <div className='mt-8'>
            {modulos?.length > 0 && modulos?.map((module, index) => {
                return (
                    <Link key={index} className=''>
                        <div className="border border-gray-800 rounded-2xl py-8 px-6 mb-2">
                            <div className='flex'>
                                <div className='bg-gray-500 mb-2 rounded-2xl'>
                                    <img className='rounded-2xl w-32 h-32 aspect-square' src={'http://localhost:5000/uploads/' + module.photos?.[0]} />
                                </div>
                                <div className='my-auto mx-8'>
                                    <h2 className='font-bold text-black'>{module.title}</h2>
                                    <h3 className='text-sm text-gray-900'>{module.description}</h3>
                                    {/*<div className='content' dangerouslySetInnerHTML={{__html:post.content}} /> */}
                                    <button onClick={() => { setCreateContent(true), setModuleId(module._id) }} className='py-2 px-2 rounded-full bg-[#0047AB] text-white hover:bg-gray-700 hover:text-black my-4 mb-6'>
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                                        </svg>
                                    </button>
                                    {seeContents && wichBook === module._id ? (
                                        <>
                                            <button onClick={() => (setSeeContents(false), setWichBook(null))} type="submit" className="mx-2 text-white bg-gray-700 hover:bg-[#0047AB] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center">
                                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                                </svg>
                                            </button>
                                            <Modulos modulos={contents.filter(content => content.conjunto === module._id)} />
                                        </>

                                    ) : (<button onClick={() => (setSeeContents(true), setWichBook(module._id))} type="submit" className="mx-2 text-white bg-[#0047AB] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 py-2 text-center">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                        </svg>
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}