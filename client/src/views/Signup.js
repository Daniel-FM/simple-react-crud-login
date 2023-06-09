import { useState } from "react";
import { AuthService } from "src/service/AuthService";
import { Link, useNavigate } from 'react-router-dom';

import headerStyles from "src/css_modules/Header.module.css"
import formStyles from "src/css_modules/Forms.module.css"

export const Signup = () =>{

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState("");

    let navigate = useNavigate();

    const submit = async(event) => {
        let status;
        event.preventDefault();
        if (email !== "" && pass !== ""){
            const newClient = {
                "email": email,
                "password": pass
            }
            try{
                await AuthService.addClient(newClient);
                await AuthService.login(newClient);
                navigate("/");
            } catch (e){
                const code = e.toJSON().status;
                if (code === null){
                    status = "Falha de conexão com a API";
                }else if (code === 409){
                    status = `Cliente com email ${email} já existe no banco de dados`;
                }else{
                    status = `Outro erro. Código: ${code}`;
                }
            }
        }else{
            status = "Entre o email e a senha do cliente a ser criado";
        }

        setMessage(status);
    }

    return(
        <>
        <div className={headerStyles.centered}>
            <Link to="/">Home</Link>
            <Link to="/">Login</Link>
        </div>
        <form className={formStyles.formArea} onSubmit={submit}>
            <h1>Criar nova conta</h1>
            <div>
                <input 
                    type="text" placeholder="Email" value={email} 
                    onChange={(event)=>setEmail(event.target.value)}
                />
            </div>
            <div>
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