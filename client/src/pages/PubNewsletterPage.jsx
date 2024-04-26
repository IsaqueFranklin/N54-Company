import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Navigate, Link, useParams} from 'react-router-dom';
import { UserContext } from '../UserContext';
import PhotosUploader from '../components.jsx/PhotosUploader';
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

export default function PubNewsletterPage(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    //States for newsletter
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [content, setContent] = useState('');

    const [redirect, setRedirect] = useState(false);

    async function saveNewsletter(ev){
        ev.preventDefault();

        const newsletterPostData = {
            title, description, addedPhotos, content, dia:new Date(),
        }

        if(user?.admin){
            if(id){
                await axios.post('/criar-newsletter', {
                    id, ...newsletterPostData
                })
                setRedirect(true);
            } else {
                await axios.post('/criar-newsletter', {
                    ...newsletterPostData
                })
                setRedirect(true);
            }
        }
    }

    if(ready && !user){
        return <Navigate to={'/cadastro'} />
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className='my-auto mx-auto items-center mt-12 max-w-4xl'>
        <form onSubmit={saveNewsletter}>
            <h2 className='text-2xl mt-4 mb-4'>Título da sua publicação</h2>
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Um título de cair as calças...' />

            <h2 className='text-2xl mt-12 mb-4'>Descrição da sua publicação</h2>
            <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} placeholder='Um descrição de abrir a boca...' /> 

                    <h2 className='text-2xl mt-12 mb-4'>Fotos de capa</h2>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <h2 className='text-2xl mt-12 mb-4'>Escreva aqui</h2>
                    <ReactQuill
                        value={content} 
                        theme={'snow'}
                        onChange={setContent} 
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