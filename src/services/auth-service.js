import axios from "axios";
import { toast } from "react-toastify"
import authHeader from "./auth-header";


const API_URL = "https://send-it-app.herokuapp.com";

const register = (firstname, lastname, email, password, mobile) => {
    return axios.post(API_URL + "/signup", {
        firstname,
        lastname,
        email,
        password,
        mobile
    })
        .then(res => {
            console.log(res)
            if (res.message === "mail exists") {
                toast.error('Mail exists')
                return false
            }
            else if (res.data.token) {
                toast.success('Registeration successful')
                console.log(res)
                console.log(res.data.token)
            }
            return res.data
        })
};


function login(email, password) {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(handleResponse)
        .then(response => {
            if (response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(response.token));
                const { _id } = response.user
                // return response;
                const requestOptions = {
                    method: 'GET',
                    headers: authHeader()
                };
                return fetch(`${API_URL}/login/me/${_id}`, requestOptions)
                    .then(handleResponse)
                    .then(user => {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        
                        if (user.message === "Authorization failed" && user.password !== "" ){
                            toast.info('Unauthorized User, please enter a valid email address')
                           }
                           else if(user.error ){
                            toast.error('Incorrect password, please enter a valid password') 
                           }else if(user.success){
                        localStorage.setItem('user', JSON.stringify(user.data));
                        return user.data;
                        }
                    });
            }
        })
    }
                        function handleResponse(response) {
                return response.text().then(text => {
                    const data = text && JSON.parse(text);
                    if (!response.ok) {
                        if (response.status === 401) {
                            // auto logout if 401 response returned from api
                            logout();
                            window.location.reload(true);
                        }

                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    return data;
                });
            }
            const logout = () => {
                localStorage.removeItem("user");
                localStorage.removeItem('token')
            };

            export default {
                register,
                login,
                logout
            };