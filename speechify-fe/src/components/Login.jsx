import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import { setUsername, setIsLoggedIn, setToken, setUserId } from '../session/UserSession';
const Login = () => {
    const [userData, setUserData] = useState({
        username : "",
        password : ""
    })
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();
        if(!userData.username && !userData.password){
            console.log("Invalid");
            console.log(userData);
        }else{
            UserService.loginUser(userData).then(response =>{
                console.log("Login success", response.data);
                if(response.status === 200){
                    navigate('/home');
                    setToken(response.data['token'])
                    setUsername(userData.username)
                    setIsLoggedIn(true);
                    setUserId(response.data['user_id'])
                }
            }).catch((err) =>{
                console.log(userData);
                console.log(err);
            })
        }
    }
    return (
        <div className='flex items-center justify-center h-[88vh]'>
            <form onSubmit={handleLogin} className='w-[90vw] md:w-[50vw] lg:w-[30vw] bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 mx-2 mt-2'>
                <h1 className='text-3xl font-bold text-center mb-3 font-Poppins'>
                    Speechify 
                </h1>
                <p className='w-full font-Poppins text-center mt-[-10px] text-sm mb-4'>Amplify your voice, empower your ideas</p>
                <h2 
                    className="text-2xl font-bold mb-3 text-left font-Poppins">
                    Login</h2>
                    
                    <div className='mb-3'>
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2 font-Poppins" 
                            >
                            Username
                            </label>
                            <input
                            type="text"
                            id="username"
                            className="font-Poppins shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your username"
                            required
                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                        />
                    </div>
                    <div className='mb-3'>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 font-Poppins" 
                        >
                        Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="font-Poppins shadow appearance-none border rounded min-w-full py-2 pl-2 text-gray-700  focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setUserData({...userData, password:e.target.value})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="h-10 font-Poppins w-full bg-blue-600 hover:bg-[#78CEFF] hover:text-black text-white font-normal py-2 px-6 rounded-lg focus:outline-none "
                    >
                    Signup
                    </button>
                    <div className='flex flex-row justify-center'>
                        <p className="mt-3 text-sm text-center font-Poppins">   
                            Doesn't have an account?
                            <Link  to='/signup'className = "text-blue-500 ml-2 hover:cursor-pointer font-Poppins">Sign up</Link>
                        </p>
                        
                    </div>
            </form>
        </div>
    );
};

export default Login;
