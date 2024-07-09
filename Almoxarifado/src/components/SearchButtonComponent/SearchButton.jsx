import React from 'react';
import styles from "./style.module.scss"
import search from "../../../public/search.png"

export default function SearchButton({ setSearchTerm }) {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={styles.corpo}>
            <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.barraPesquisa}
                onChange={handleChange}
            />
        </div>
    );
}
