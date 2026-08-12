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
            <input 
            value = {search}
            onChange = {(e) => {
                setSearch(e.target.value)}}
            placeholder= "Search for Characters" type="text" className={styles.formInput}></input>
            <button type="submit" className={styles.formButton}>search</button>
        </form>
        </>
    );
}