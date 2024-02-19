import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import PhotosUploader from '../components.jsx/PhotosUploader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

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

export default function PublicarPage(){

    const {ready, user, setUser} = useContext(UserContext);
    const {id} = useParams();

    const [postType, setPostType] = useState('');
    const [redirect, setRedirect] = useState(false);

    //States for newsletter
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [content, setContent] = useState('');

    //States for modules
    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [moduleAddedPhotos, setModuleAddedPhotos] = useState([]);

    function chooseType(type){
        if(type === 'newsletter'){
            setPostType(type);
        }

        if(type === 'modulo'){
            setPostType(type)
        }
    }

    async function savePost(ev){

        const postData = {
            title, description, addedPhotos, content, dia:new Date(),
        }

        if(postType === "newsletter"){
            if(id){
                await axios.post('/criar-newsletter', {
                    id, ...postData
                })
                setRedirect(true);
            } else {
                await axios.post('/criar-newsletter', {
                    ...postData
                })
                setRedirect(true);
            }
        }

        if(postType === "modulo"){
            await axios.post('/criar-modulo', {
                
            })
        }
    }

    if(ready && !user){
        return <Navigate to={'/cadastro'} />
    }

    if(redirect){
        return <Navigate to={'/dashboard'} />
    }

    if(postType === "newsletter"){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-6xl'>
            <form onSubmit={savePost}>
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

    if(postType === 'modulo'){
        return (
            <div className='my-auto mx-auto items-center mt-12 max-w-4xl'>
            <form onSubmit={savePost}>
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
        <section className="bg-white my-auto items-center mt-48 lg:mt-0">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className='border border-gray-800 shadow rounded-xl p-16'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-16">
                        Qual tipo de publicação deseja criar
                    </h1>
                    <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 p-6 grid grid-cols-2 gap-4">
                        <div className="">
                            <button onClick={() => chooseType('newsletter')} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Newsletter</button>
                        </div>
                        <div className="">
                            <button onClick={() => chooseType('modulo')} type="submit" className="w-full text-white bg-gray-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Módulo</button>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    )
}