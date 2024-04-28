export const setUsername = (username) =>{
    sessionStorage.setItem('username',username)
}
export const getUsername = () =>{
    return sessionStorage.getItem('username');
}

export const setIsLoggedIn = (isLoggedIn) => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
}
export const getIsLoggedIn = () => {
    return sessionStorage.getItem('isLoggedIn');
}
export const setToken = (token) =>{
    localStorage.setItem('token', token)
}
export const getToken = () =>{
    return localStorage.getItem('token')
}
export const setCategory = (category) =>{
    sessionStorage.setItem('category', category)
}
export const getCategory = () =>{
    return sessionStorage.getItem('category')
}
export const setUserId = (userId) =>{
    sessionStorage.setItem('userId', userId)
}
export const getUserId = () =>{
    return sessionStorage.getItem('userId')
}