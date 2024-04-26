import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import { UserContext } from '../UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function ContentCreateDock(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    //States for modules
    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentAddedPhotos, setContentAddedPhotos] = useState([]);
    const [contentContent, setContentContent] = useState('');

    const [redirect, setRedirect] = useState(false);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        if(id){
            axios.get('/content/'+id).then(response => {
                const {data} = response;
                setContentTitle(data.title);
                setContentDescription(data.description);
                setContentAddedPhotos(data.photos);
                setContentContent(data.content);
                setCheck(true);
            })
        }
    }, [])
    async function saveContent(ev){
        ev.preventDefault();

        const contentPostData = {
            contentTitle, contentDescription, contentAddedPhotos, contentContent, dia:new Date(), id
        }

        console.log(check)
        
        if(user?.admin){
            if(id){
                await axios.post('/criar-conteudo/', {
                    ...contentPostData
                })
            }

            if(id && check){
                await axios.put('/criar-conteudo/', {
                    ...contentPostData
                })
            }
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

                <h2 className='text-2xl mt-12 mb-4'>Escreva aqui</h2>
                    <ReactQuill
                        value={contentContent} 
                        theme={'snow'}
                        onChange={setContentContent} 
                        modules={modules} 
                        formats={formats} 
                    />

                <div className='mb-10 mt-12'>
                    <button className='py-2 px-4 w-full rounded rounded-lg bg-[#0047AB] text-white hover:bg-white hover:text-black my-4 mb-20'>Publicar</button>
                </div>
            </form>
        </div>
    )
}