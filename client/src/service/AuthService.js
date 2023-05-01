import axios from 'axios';

const withBaseUrl = (path) => `http://localhost:4000/${path}`;

// Necessário para que o cookie seja salvo
axios.defaults.withCredentials = true;

export class AuthService{
    static addClient(client){
        return axios.post(withBaseUrl('clients'), client);
    }
    
    static getLoggedInClient(){
        return axios.get(withBaseUrl(`auth/currentClient`));
    }

    static login(credentials){
        return axios.post(withBaseUrl('auth/login'), credentials);
    }

    static logout(){
        return axios.get(withBaseUrl('auth/logout'));
    }
}