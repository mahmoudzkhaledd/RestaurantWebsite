
import axios from "axios";
import { toast } from "react-toastify";
const adminAxios = axios.create({
    baseURL: process.env.NODE_ENV != 'development' ?
        'https://restaurant-rose-five.vercel.app/admin' :
        "http://192.168.1.8:3000/admin",
    withCredentials: true,
    headers: {
        
    },
})



adminAxios.interceptors.request.use(request => {
    request.headers.set('a_token', `Bearer ${localStorage.getItem('a_token')}`);
    return request;
}, error => {
    return Promise.reject(error);
});



adminAxios.interceptors.response.use(response => {
    if (response.data.a_token != null) {
        localStorage.setItem('a_token', response.data.a_token);
    }
    if (response != null && response.data.msg != null) {
        toast(response.data.msg);
    }
    return response;
}, error => {

    if (error.response == null) {
        toast.error("من فضلك تأكد من الاتصال بالانترنت وحاول مجددا");
        return Promise.reject(error);
    }
    if (error.response.data.msg != null) {
        toast.error(error.response.data.msg);
        error.message = null;
    }
    if (error.response.data.errors != null && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0].msg);
        error.message = null;
    }
    return Promise.reject(error);
});

export { adminAxios };
