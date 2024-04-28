import axios from "axios";

const USER_API_BASE_URL = "http://127.0.0.1:5000/api/v1/user/"
class UserService{
    saveUser(user){
        return axios.post(USER_API_BASE_URL + "create", user);
    }
    loginUser(user){
        return axios.post(USER_API_BASE_URL + "login", user)
    }
    logoutUser(user_id){
        return axios.post(USER_API_BASE_URL + 'logout', { user_id : user_id})
    }
}

export default new UserService();