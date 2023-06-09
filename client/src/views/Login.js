import { useState } from "react";
import { AuthService } from "src/service/AuthService"
import { Link, useNavigate } from 'react-router-dom';

import headerStyles from "src/css_modules/Header.module.css"
import formStyles from "src/css_modules/Forms.module.css"

export const Login = () =>{

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState("");

    let navigate = useNavigate();

    const submit = async(event) => {
        let status;
        event.preventDefault();

        if (email !== "" && pass !== ""){
            const credentials = {
                "email": email,
                "password": pass
            }
            try{
                await AuthService.login(credentials);
                navigate("/");
            } catch (e){
                const code = e.toJSON().status;
                if (code === null){
                    status = "Falha de conexão com a API";
                }else{
                    status = `Outro erro. Código: ${code}`;
                }
            }
        }else{
            status = "Entre o email e a senha para fazer login";
        }

        setMessage(status);
    }

    return(
        <>
        <div className={headerStyles.centered}>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
        </div>
        
        <form className={formStyles.formArea} onSubmit={submit}>
            <h1>Login</h1>
            <div className="formField">
                <input 
                    type="text" placeholder="Email" value={email} 
                    onChange={(event)=>setEmail(event.target.value)}
                />
            </div>
            <div className="formField">
                <input 
                    type="password" placeholder="Senha" value={pass} 
                    onChange={(event)=>setPass(event.target.value)}
                />
            </div>
            <button type="submit">Confirmar</button>
            <p>{message}</p>
        </form>

        </>
    );
}