import { AuthService } from 'src/service/AuthService';
import styles from "src/css_modules/Header.module.css"

export const Header = (props) => {

    const logout = () => {
        AuthService.logout();
        window.location.reload(false);
    }

    return(
        <div className={styles.centered}>
            <p>Olá, {props.client.data.email} !</p>
            <p className={styles.linkButton} onClick={logout}>Logout</p>
        </div>
    );
}
