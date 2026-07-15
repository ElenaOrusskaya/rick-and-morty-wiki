import {useState, useEffect} from 'react';
import {Character} from './Character';
import { Pagination } from './Pagination';

interface ApiResponse {
    info: Info;
    results: Results[];
}

interface Results {
    id: number;
    name: string;
    status: string,
    species: string,
    type: string ,
    gender: string,
    origin: {
        name: string,
        url: string
      },
    location: {
        name: string,
        url: string
      },
    image: string,
    episode: string[]
}

interface Info {
    count: number;  
    pages: number;  
    next: string | null;
    prev: string | null;
}

export function CharacterPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(() => {
        const savedPage = localStorage.getItem('character_page');
        return savedPage ? Number(savedPage) : 1;
    });

    const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    useEffect(() => {
        setIsLoading(true);
        fetch(api)
        .then(response => response.json())
        .then((res: ApiResponse) => {           
            setData(res);
            setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, [api]
    );

    const info = data?.info;
    const results = data?.results || [];

    const handlePageChange = (page: number) => {
        setPageNumber(page);
        localStorage.setItem('character_page', String(page));
        window.scrollTo({top: 0, behavior: 'auto'});
    }

    return (
        <>
        {isLoading ? (
            <div className="loading-spinner"></div>
        ) : (
        <ul className="character-list">
          {results.map((character) => 
          <li key={character.id} className="character-item">
            <Character 
                id = {character.id}
                name = {character.name}
                status = {character.status}
                species = {character.species}
                type = {character.type}
                gender = {character.gender}
                origin = {character.origin}
                location = {character.location}
                image = {character.image}
                episode = {character.episode}
            />
          </li>
          )}
        </ul>
        )}
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