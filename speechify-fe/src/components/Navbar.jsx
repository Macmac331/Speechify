import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../session/UserSession";

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    const navigate = useNavigate();
    const handleMenuClick = () => {
        setMenuOpen(!isMenuOpen);
    };
    const handleLogout = () =>{
        navigate('/')
        localStorage.removeItem('token');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('category');
        setIsLoggedIn(false)
    }
    return (
        <header className="shadow-md z-50">
            <nav className="flex items-center justify-between w-[85%] h-[12vh] mx-auto md:w-[87vw] lg:w-[75vw]">
                <div>
                    <Link to = '/'
                        className="font-Gluten font-bold text-3xl md:text-4xl tracking-wider no-underline " style={{ WebkitTextStroke: '1px black', textStroke: '1px black', color: '#78CEFF', textShadow: '1px 1px 1px #FFF' }}>
                        SpeechifyAI
                    </Link>
                </div>
                <div className={`absolute md:static top-[12vh] left-0 w-full  md:w-auto md:flex md:items-center transition-all duration-300 ${
                    isMenuOpen ? "h-[40vh] shadow-md bg-white md:bg-none md:shadow-none md:-z-10" : "-translate-y-96 md:translate-y-0 hidden"
                }`}>
                    <ul className=" md:flex-grow md:flex justify-center items-center list-none flex-col md:flex-row md:space-x-8 lg:space-x-20 p-4 m-2">
                        {isLoggedIn? (
                            <li className={`md:block ${isMenuOpen? '' : 'hidden'}`}>
                                <Link to="/home" className="font-Poppins text-center text-2xl md:text-xl font-normal cursor-pointer no-underline hover:text-gray-400">Home</Link>
                            </li>
                        ) : (
                            <></>
                        )}
                        <li className="md:block">
                            <Link to="/tutorial" className="font-Poppins text-center text-2xl md:text-xl font-normal cursor-pointer no-underline hover:text-gray-400 ">Tutorial</Link>
                        </li>
                        <li className="md:block">
                            <Link to="/contacts" className="font-Poppins text-center text-2xl md:text-xl font-normal cursor-pointer no-underline hover:text-gray-400">Contact</Link>
                        </li>
                        <li className="md:hidden">
                            {isLoggedIn ? (
                                <Link to="/" onClick={handleLogout} className="font-Poppins text-center text-2xl md:text-2xl cursor-pointer no-underline hover:text-gray-400">Sign out</Link>
                            ) : (
                                <Link to="/signup" className="font-Poppins text-center text-2xl md:text-2xl cursor-pointer no-underline hover:text-gray-400">Sign in</Link>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="flex items-center">
                    {isMenuOpen ? (
                        <IoMdClose
                            onClick={handleMenuClick}
                            className="text-3xl cursor-pointer md:hidden text-black"
                        />
                    ) : (
                        <CiMenuFries
                            onClick={handleMenuClick}
                            className="text-3xl cursor-pointer md:hidden text-black"
                        />
                    )}
                    {isLoggedIn? 
                        (
                        <Link to="/" onClick={handleLogout} className="md:block hidden font-Poppins text-center text-2xl md:text-2xl cursor-pointer no-underline hover:text-gray-400 ">Sign out</Link>)
                        :
                        (
                            <Link to="/login" className="md:block hidden font-Poppins text-center text-2xl md:text-2xl cursor-pointer no-underline hover:text-gray-400">Sign up</Link>
                        )
                    }
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
