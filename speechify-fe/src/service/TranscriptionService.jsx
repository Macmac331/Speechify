import axios from "axios";

const TRANSCRIPTION_API_BASE_URL = 'http://127.0.0.1:5000/api/v1/transcribe/';

class TranscriptionService {
    SendTranscribedText(text, cat,  token) {
        const data = { 
            transcript: text,
            category : cat
        };
        const config = {
            headers : {
                Authorization : token
            }
        }
        return axios.post(TRANSCRIPTION_API_BASE_URL + 'add', data, config);
    }
    async GetSummary(token){
        try{
            const config = {
                headers : {
                    Authorization : token
                }
            };
            const response = await axios.get(TRANSCRIPTION_API_BASE_URL + 'get-summary', config)
            return response.data;
        }catch(err){
            console.log("ERROR FETCHING SUMMARY: ", err);
            throw err;
        }
    }
}

export default new TranscriptionService();
