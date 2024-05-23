
const Card = ({value, onClick}) => {

  return (
    <div
        onClick={onClick}
      className={`p-2 h-24 w-40 md:w-44 border rounded-lg mt-4 shadow-md flex items-center justify-center cursor-pointer  transition-all duration-300 ease-in-out hover:translate-y-[-10px] hover:bg-blue-400 border-none`}
    >
      <div className="text-center font-Poppins">
            <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
