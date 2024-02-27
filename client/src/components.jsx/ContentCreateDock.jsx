import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';

export default function ContentCreateDock({xa}){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    //States for modules
    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentAddedPhotos, setContentAddedPhotos] = useState([]);

    const [redirect, setRedirect] = useState(false);

    const moduleId = xa;
    async function saveContent(ev){
        ev.preventDefault();

        const contentPostData = {
            contentTitle, contentDescription, contentAddedPhotos, dia:new Date(), moduleId
        }
        
        if(user.admin){
            await axios.post('/criar-conteudo', {
                ...contentPostData
            })
        }

        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={"/dashboard"} />
    }

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl'>
            <form onSubmit={saveContent}>
                <h2 className='text-2xl mt-4 mb-4'>Título do seu módulo</h2>
                <input type="text" value={contentTitle} onChange={ev => setContentTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

                <h2 className='text-2xl mt-12 mb-4'>Descrição do seu módulo</h2>
                <input type="text" value={contentDescription} onChange={ev => setContentDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                <h2 className='text-2xl mt-12 mb-4'>Foto de capa do seu módulo</h2>
                <PhotosUploader addedPhotos={contentAddedPhotos} onChange={setContentAddedPhotos} />

                <div className='mb-10 mt-12'>
                    <button className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-20'>Publicar</button>
                </div>
            </form>
        </div>
    )
}