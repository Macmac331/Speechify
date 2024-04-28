import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const handleNavigate  = () => {
        navigate('/speech')
    }
    return (
    <div className='h-[88vh] w-full md:w-[70vw] mx-auto flex items-center'>
        <div className='p-6 ml-4 md:p-0 md:ml-0'>
            <h1 className='text-4xl md:text-5xl font-Poppins font-bold mb-5'>Welcome to Speechify!</h1>
            <p className='text-xl max-w-[500px] mb-5'>Speechify is your trusted ally on the journey to confident communication. Whether preparing for impromptu speeches, refining presentations, or honing speaking skills, Speechify is the place to be.</p>
            
            <div onClick={handleNavigate} className="flex items-center justify-center md:h-14 md:w-72 h-12 w-60 rounded-2xl p-4 mb-2 text-xl font-Poppins shadow-md hover:border-0 text-center cursor-pointer bg-[#78CEFF] transform transition-all duration-300 ease-in-out hover:translate-y-[-10px] hover:bg-blue-400">
                <Link to='/speech'>Get Started</Link>
            </div>
        </div>
    </div>
    )
}
export default Home
