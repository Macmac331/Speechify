import React, { useState } from 'react';
import UserService from '../service/UserService';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [userdata, setUserData] = useState({
        firstname : "",
        lastname : "",
        userAuth : {
            username : "",
            password : "",
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userdata.firstname && !userdata.lastname && !userdata.userAuth.username && !userdata.userAuth.password){
            console.log("Error");
        }else{
            console.log(userdata);
            UserService.saveUser(userdata)
                .then(response => {
                    if(response.status >= 200 || response.status <= 299 ){
                        console.log("User saved successfully ", response.data);
                        navigate('/login')
                    }
                }).catch(err =>{
                    console.log(err);
            });
        }
    };
    
    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='w-[90vw] md:w-[50vw] lg:w-[30vw] bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 mx-2 mt-2'>
                <h1 className='text-3xl font-bold text-center mb-3 font-Poppins'>
                Speechilyze 
                </h1>
                <p className='w-full font-Poppins text-center mt-[-10px] text-sm mb-4'>Amplify your voice, empower your ideas</p>
                <h2 
                    className="text-2xl font-bold mb-3 text-left font-Poppins">
                    Sign up
                </h2>
                <div className='mb-3'>
                    <label
                        className="block text-gray-700 text-md font-semibold mb-2 font-Poppins" 
                        >
                        First Name
                        </label>
                        <input
                        type="text"
                        id="firstname"
                        className="font-Poppins shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your first name"
                        required
                        onChange={(e) => setUserData({...userdata, firstname:e.target.value})}
                        />
                </div>
                <div className='mb-3'>
                    <label
                        className="block text-gray-700 text-md font-semibold mb-2 font-Poppins" 
                        >
                        Last Name
                        </label>
                        <input
                        type="text"
                        id="lastname"
                        className="font-Poppins shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your last name"
                        required
                        onChange={(e) => setUserData({...userdata, lastname:e.target.value})}
                        />
                    </div>
                <div className='mb-3'>
                    <label
                        className="block text-gray-700 text-md font-semibold mb-2 font-Poppins" 
                        >
                        Username
                        </label>
                        <input
                        type="text"
                        id="username"
                        className="font-Poppins shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your username"
                        required
                        onChange={(e) => setUserData({...userdata, userAuth: {...userdata.userAuth, username: e.target.value}})}
                        />
                    </div>
                <div className='mb-3'>
                    <label
                        className="block text-gray-700 text-md font-semibold mb-2 font-Poppins" 
                        >
                        Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="font-Poppins shadow appearance-none border rounded min-w-full py-2 pl-2 text-gray-700  focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setUserData({...userdata, userAuth: {...userdata.userAuth, password: e.target.value}})}
                        />
                </div>
                    <button
                        type="submit"
                        className="h-10 font-Poppins w-full bg-blue-600 hover:bg-[#78CEFF] hover:text-black text-white font-normal py-2 px-6 rounded-lg focus:outline-none "
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                    <div className='flex flex-row justify-center'>
                        <p className="mt-3 text-sm text-center font-Poppins">   
                            Already have an account?
                            <Link  to='/login'className = "text-blue-500 ml-2 hover:cursor-pointer font-Poppins">Login</Link>
                        </p>
                        
                    </div>
            </form>
        </div>
    );
};

export default Signup;
