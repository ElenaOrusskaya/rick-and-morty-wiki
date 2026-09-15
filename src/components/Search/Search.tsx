import styles from './Search.module.scss';

interface searchProps {
    search: string;
    setSearch: (value: string) => void;
    onSearchSubmit: () => void;
}

export function Search ({setSearch, onSearchSubmit, search}: searchProps) {
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearchSubmit();
    }
    
    return (
        <>
        <form className ={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.searchField}>
            <label className={styles.searchLabel} htmlFor="character-search">Character name</label>
            <input 
            id="character-search"
            value = {search}
            onChange = {(e) => {
                setSearch(e.target.value)}}
            placeholder= "Search for Characters" type="text" className={styles.formInput}></input>
            </div>
            <button type="submit" className={styles.formButton}>Search</button>
        </form>
        </>
    );
}
