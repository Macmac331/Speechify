import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Home from "./pages/Home";
import 'regenerator-runtime/runtime'; 
import CategorySelect from "./pages/CategorySelectPage";
import SpeechPage from "./pages/SpeechPage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(sessionStorage.getItem('isLoggedIn')));
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  return (
    <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
              path="/signup"
              element={<Signup />}
          />
            <Route
              path="/login"
              element={<Login/>}
          />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/speech" element={isLoggedIn ? <CategorySelect /> : <Navigate to="/login" />} />
          <Route path="/speech/category/:category" element={isLoggedIn? <SpeechPage/> : <Navigate to="/login"/>} /> 
          <Route path='/speech/category/:category/result' element={isLoggedIn? <ResultPage/> : <Navigate to="/login"/>}/>
        </Routes>
    </Router>
  );
}

export default App;
