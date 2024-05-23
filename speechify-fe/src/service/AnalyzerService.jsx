import axios from "axios";

const ANALYZER_API_BASE_URL = "http://127.0.0.1:5000/api/v1/analyzer/";

class AnaylyzerService{

    async getGrammarScore(token){
        try{
            const config = {
                headers: {
                    Authorization : token
                }
            };
            const response = await axios.get(ANALYZER_API_BASE_URL + "get-grammar-score", config);
            return response.data;
        }catch(err){
            console.log("ERORR FETCHING GRAMMAR SCORE: ", err);
            throw err
        }
    }
    async getComplexityScore(token){
        try{
            const config = {
                headers : {
                    Authorization : token
                }
            }
            const response = await axios.get(ANALYZER_API_BASE_URL + "get-complexity-score", config);
            return response.data;
        }catch(err){
            console.log("ERROR FETCHING COMPLEXITY SCORE: ", err );
            throw err
        }
    }
    async getScores(token){
        try{
            const config = {
                headers : {
                    Authorization : token
                }
            }
            const response = await axios.get(ANALYZER_API_BASE_URL + "get-score", config);
            return response.data
        }catch (err) {
            console.log("Error fetching scores:", err);
            throw err;
        }
    }
     async getWrongGrammar(token){
        try{
            const config = {
                headers : {
                    Authorization : token
                }
            }
            const response = await axios.get(ANALYZER_API_BASE_URL + "get-wrong-grammar", config);
            return response.data
        }catch(err){
            console.log("Error fetching data", err);
            throw err;
        }
     }
}
export default new AnaylyzerService();