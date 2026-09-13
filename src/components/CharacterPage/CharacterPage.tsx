import {useState, useEffect} from 'react';
import {Character} from '../Character/Character';
import { Pagination } from '../Pagination/Pagination';
import {Search} from '../Search/Search';
import type { CharacterType, ApiInfo } from '../../types';
import styles from './CharacterPage.module.scss';

interface ApiResponse {
  info: ApiInfo;
  results: CharacterType[];
}

export function CharacterPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(() => {
        const savedPage = localStorage.getItem('character_page');
        return savedPage ? Number(savedPage) : 1;
    });
    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");
    
    const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${submittedSearch}`;
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch(api)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Character not found')
            }
            return response.json(); })
        .then((res: ApiResponse) => {           
            setData(res);
            setIsLoading(false);
        })
        .catch((err: Error) => {
            setData(null);
            setError(err.message);
            setIsLoading(false);
        });
    }, [api]
    );

    const info = data?.info;
    const results = data?.results || [];

    const handlePageChange = (page: number) => {
        setPageNumber(page);
        localStorage.setItem('character_page', String(page));
        window.scrollTo({top: 0, behavior: 'auto'});
    }

    const handleSearchSubmit = () => {
        setSubmittedSearch(search);
        setPageNumber(1);
    }

    return (
        <>
        <div className ={styles.titleContainer}><h1>Characters</h1></div>
        <Search 
        setSearch={setSearch}
        onSearchSubmit={handleSearchSubmit}
        search={search}/>
        <div className = "content_container">
        {isLoading ? (
            <div className="loading-spinner"></div>
        ) : error ? (
        <div className="not-found-message">{error}</div>
    ) : (
        <ul className="character-list">
          {results.map((character) => 
          <li key={character.id} className="character-item">
            <Character 
               {...character}
            />
          </li>
          )}
        </ul>
        )}
        </div>
        <div>
            {info && (
        <Pagination onPageChange = {handlePageChange}
                    currentPage = {pageNumber}
                    totalPages= {info.pages}
        />
            )}
        </div>
        </>
    );
}