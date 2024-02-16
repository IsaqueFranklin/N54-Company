import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { Navigate, Link } from 'react-router-dom';

export default function Dashboard(){

    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    console.log(user)

    if (redirect) {
        return <Navigate to={redirect} />
    } 

    if(!user){
        setRedirect('/')
    }

    if(user){
        return (
            <div className="py-50">
                <Link><button onClick={logout} className='py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm mt-2 mb-8 hover:bg-white hover:text-black'>Sair</button></Link>
            </div>
        )
    }
}