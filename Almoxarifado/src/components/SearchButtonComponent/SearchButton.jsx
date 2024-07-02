import styles from "./style.module.scss"
import search from "../../../public/search.png"

export default function SearchButton() {
    return (
        <div className={styles.corpo}>
           <img src={search} alt="logo sistema fiep" className={styles.busca}/>
           <input type="text" shadow className={styles.barraPesquisa}/>
        </div>
    );
}
