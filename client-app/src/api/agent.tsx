import axios, { AxiosResponse } from 'axios'
import { get } from 'http';
import { Ticket } from '../Ticket';
import { User, UserFormValues } from '../model/user';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}


axios.defaults.baseURL = 'http://localhost:5152/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T,>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T,>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T,>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T,>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T,>(url: string) => axios.delete<T>(url).then(responseBody),
};



const Tickets = {
       list: () => requests.get<Ticket[]>('/tickets'),
}

const Account = {
    current : () => requests.get<User>('/account'),
    login : (user: UserFormValues) => requests.post<User>('/account/login',user),
    register : (user: UserFormValues) => requests.post<User>('/account/register',user)
}


const agent = {
    Tickets,
    Account
}

export default agent;