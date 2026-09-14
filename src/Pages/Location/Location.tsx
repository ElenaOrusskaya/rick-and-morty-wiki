import {useState, useEffect} from 'react';
import {Select} from '../../components/Select/Select';
import {Character} from '../../components/Character/Character';
import { Pagination } from '../../components/Pagination/Pagination';
import type { LocationData, CharacterType } from '../../types';
import pageStyles from '../pages.module.scss';

export function Location() {
    const [locationId, setLocationId] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<CharacterType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(results.length / itemsPerPage);

    const api = `https://rickandmortyapi.com/api/location/${locationId}`;

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1);

        fetch(api)
        .then((response) => {
            if(!response.ok) {
                throw new Error ('Location not found');
            }
                return response.json();
        })
        .then((res: LocationData) => {
            setData(res);

        const residentsId = res.residents.map((url: string) => url.split('/').pop()).join(",");
        if (!residentsId) return [];

        return fetch(`https://rickandmortyapi.com/api/character/${residentsId}`)
        .then((charRes) => {
            if (!charRes.ok) {
                throw new Error('Failed to fetch residents') 
            }
            return charRes.json();
        });
})
       .then((charactersData: CharacterType | CharacterType[] | []) => {
        const normalizedData = Array.isArray(charactersData) ? charactersData : [charactersData];

        setResults(normalizedData);
        setIsLoading(false);
       })

       .catch((err: Error) => {
        setData(null);
        setResults([]);
        setError(err.message);
        setIsLoading(false);
       });
}, [api])
    

    return (
        <>
        <div className ={pageStyles.pageHeaderContainer}>
        <div className = {pageStyles.titleContainer}>
            <h1>Location: {data?.name || "Unknown"}</h1>
            <p>Dimension: {data?.dimension || "Unknown"}</p>
            <p>Type: {data?.type || "Unknown"}</p>
        </div>

        <Select 
        name = "Location"
        total = {126}
        value = {locationId}
        onChange={(newId) => setLocationId(newId)}
        />
        </div>
        <div className = "content_container">
                        {isLoading ? (
                            <div className="loading-spinner"></div>
                        ) : error ? (
                        <div className="not-found-message">{error}</div>
                    ) : (
                        <ul className="character-list">
                          {currentResults.map((character) => 
                          <li key={character.id} className="character-item">
                            <Character 
                                {...character}
                            />
                          </li>
                          )}
                        </ul>
                        )}
                        </div>
                            <Pagination
                                  currentPage={currentPage}
                                  totalPages={totalPages}
                                  onPageChange={(page) => setCurrentPage(page)}
                                />
        </>
    )
}