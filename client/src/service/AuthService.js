import axios from 'axios';
import { completePath } from './serviceUtils';

// Necessário para que o cookie seja salvo
axios.defaults.withCredentials = true;

export class AuthService{
    static addClient(client){
        return axios.post(completePath('clients'), client);
    }
    
    static getLoggedInClient(){
        return axios.get(completePath(`auth/currentClient`));
    }

    static login(credentials){
        return axios.post(completePath('auth/login'), credentials);
    }

    static logout(){
        return axios.get(completePath('auth/logout'));
    }
}