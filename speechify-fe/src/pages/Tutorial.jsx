// src/Tutorial.js
import React, { useEffect } from 'react';
import { getIsLoggedIn, setIsLoggedIn } from '../session/UserSession';
const Tutorial = () => {
    const isLoggedIn = JSON.parse(getIsLoggedIn())
    const events = [
        { id: '1', title: 'Sign up', description: 'Register your personal information.' },
        { id: '2', title: 'Login', description: 'Enter your login credentials to proceed.' },
        { id: '3', title: 'Getting Started', description: 'After logging in, you will be directed to the home page. Click Get Started.' },
        { id: '4', title: 'Select Category', description: 'Choose a category of your choice.' },
        { id: '5', title: 'Speak free!', description: 'After choosing your desired category, you can now practice your public speaking ability.' },
        { id: '6', title: 'Result', description: 'Once you are done, you can click the generate button to start analyzing your speech.' },
  ];
  return (
    <div className="relative flex flex-col items-center px-2 md:px-6 lg:px-24">
      <div className="absolute border-l-4 border-gray-300 h-full left-1/2 transform -translate-x-1/2"></div>
      {events.map((event, index) => (
        <div
          key={event.id}
          className={`flex w-full my-6 ${
            index % 2 === 0 ? 'justify-start md:justify-start' : 'justify-end md:justify-end'
          }`}
        >
          <div
            className={`relative font-Poppins w-full md:w-1/2 ${
              index % 2 === 0 ? 'pr-0 md:pr-8' : 'pl-0 md:pl-8'
            }`}
          >
            <div className={`absolute top-1 lg:top-2 font-Poppins left-1/2 transform -translate-x-1/2 w-10 h-10 border-4  rounded-full text-center font-bold text-black flex items-center justify-center ${isLoggedIn && (index === 0 || index === 1) ? 'bg-blue-400 border-black' : '  border-blue-400'}`}>
              {event.id}
            </div>
            <div className={`p-6  rounded-lg shadow-lg ${isLoggedIn && (index === 0 || index === 1) ? 'bg-blue-400' : 'bg-white'}`}>
              <h2 className="md:pt-2 text-2xl font-Poppins font-semibold mb-2 mt-5 md:mt-0">{event.title}</h2>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tutorial;
