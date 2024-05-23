import { Link, useNavigate } from "react-router-dom"

const LandingPage = () => {
    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')) || false;
    const navigate = useNavigate();
    const handleClick  = () => {
        navigate(isLoggedIn? "/home" : "login")
    }
    return (
        <>
        <div className="h-[88vh] w-full md:w-[70vw] mx-auto flex items-center">
            <div className="p-6 ml-4 md:p-0 md:ml-0">          
                <h1 className="font-Poppins mt-2 md:mt-16 text-5xl mb-5 font-semibold">Elevate your eloquence<br/>with Speechilyze</h1>
                <p className="h-full font-Poppins text-lg pr-6 max-w-[500px] mb-4">
                Our AI-powered platform offers real-time feedback to help you master the art of communication effortlessly, enabling you to captivate any audience with confidence and clarity.
                </p>
                <div onClick={handleClick} className="flex items-center justify-center md:h-14 md:w-72 h-12 w-60 rounded-2xl p-4 mb-2 text-xl font-Poppins shadow-md hover:border-0 text-center cursor-pointer bg-[#78CEFF] transform transition-all duration-300 ease-in-out hover:translate-y-[-10px] hover:bg-blue-400">
                    <Link to={isLoggedIn? "/home" : "/login"}> Try for free</Link>
                </div>
            </div>
        </div>
        </>

        
    )
}

export default LandingPage