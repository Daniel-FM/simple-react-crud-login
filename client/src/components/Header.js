import { Link } from 'react-router-dom';
import { AuthService } from 'src/service/AuthService';
import { useState } from "react";

import styles from "src/components/Header.module.css"

export const Header = () => {

    const [loggedClient, setLoggedClient] = useState(null);
    const [triedGetting, setTriedGetting] = useState(false);

    function hasClient(){
        return loggedClient != null;
    }

    const getLoggedClient = async() => {

        let client;

        try{
            client = await AuthService.getLoggedInClient();
        }catch{
            console.log("Failed to get the client");
        }
        
        setLoggedClient(client);

    }

    const logout = () => {
        AuthService.logout();
        window.location.reload(false);
    }

    if (!triedGetting){
        getLoggedClient();
        setTriedGetting(true);
    }

    if (hasClient()){
        return(
            <div className={styles.centered}>
                <p>Olá, {loggedClient.data.email} !</p>
                <p className={styles.linkButton} onClick={logout}>Logout</p>
            </div>
        );
    }else{
        return(
            <div className={styles.centered}>
                <p><Link to="/login" >Login</Link></p>
                <p><Link to="/signup">Signup</Link></p>
            </div>
        )
    }
}