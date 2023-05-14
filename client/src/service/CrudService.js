import axios from 'axios';
import { completePath } from './serviceUtils';

export class CrudService{
    static getAllUsers(){
        return axios.get(completePath('users'));
    }

    static getUser(id){
        return axios.get(completePath(`users/${id}`));
    }

    static addUser(user){
        return axios.post(completePath('users'), user);
    }

    static deleteUser(id){
        return axios.delete(completePath(`users/${id}`));
    }

    static updateUser(id, newInfo){
        return axios.put(completePath(`users/${id}`), newInfo);
    }
}