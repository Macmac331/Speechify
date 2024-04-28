import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import { setCategory } from "../session/UserSession"

const CategorySelect = () => {
    const navigate = useNavigate()
    const handleCardClick = (value) =>{
        navigate(`/speech/category/${encodeURIComponent(value)}`);
        setCategory(value)
    }
    return (
        <div className="w-[65vw] h-[88vh] flex items-center justify-center mx-auto">
            <div>
                <h1 className="font-Poppins text-4xl text-center">
                    Select Category
                </h1>
                <div className="mt-4 flex flex-col md:flex-row items-center justify-center md:gap-6">
                    <Card value = {'Impromptu'} onClick={() => handleCardClick('Impromptu')} />
                    <Card value = {'Interview'} onClick={() => handleCardClick('Interview')}/>
                    <Card value = {'Prepared Speech'} onClick={() => handleCardClick('Prepared-speech')}/>
                </div>
            </div>
        </div>
    )
}
export default CategorySelect