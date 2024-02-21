import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';

export default function Modulos({modulos}){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    //States for modules
    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [moduleAddedPhotos, setModuleAddedPhotos] = useState([]);

    const [createContent, setCreateContent] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const [seeModules, setSeeModules] = useState(false);
    const [modules, setModules] = useState([]);

    {/*useEffect(() => {
        axios.get('/get-contents').then(response => {
            setModules([...response.data])
        })
    }, [])*/}

    async function saveModule(ev){
        ev.preventDefault();

        const modulePostData = {
            moduleTitle, moduleDescription, moduleAddedPhotos, dia:new Date(), moduleId
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

    if(createContent){
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
    console.log(modulos)
    return (
        <div className='mt-8'>
            {modulos?.length > 0 && modulos?.map((module, index) => {
                return (
                    <Link key={index} className=''>
                        <div className="border border-gray-800 rounded-2xl py-8 px-6 mb-2">
                            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                                {module.photos?.[0] && (
                                    <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+module.photos?.[0]} />
                                )}
                            </div>
                            <h2 className='font-bold text-black'>{module.title}</h2>
                            <h3 className='text-sm text-gray-900'>{module.description}</h3> 
                            {/*<div className='content' dangerouslySetInnerHTML={{__html:post.content}} /> */}   
                            <button onClick={() => {setCreateContent(true), setModuleId(module._id)}} className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-6'>Criar conteúdo</button>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}