import styles from "./style.module.scss"
import logo from "../../../public/fiep.png"
import sair from "../../../public/sair.png"

export default function NavBar() {
    return (
        <div className={styles.nav}>
           <img src={logo} alt="logo sistema fiep" className={styles.logo}/>
           <div className={styles.sair}>
                <p className={styles.text}> Sair </p>
                <img src={sair} alt="botao de sair" className={styles.sairImg}/>
           </div>
        </div>
    );
}
