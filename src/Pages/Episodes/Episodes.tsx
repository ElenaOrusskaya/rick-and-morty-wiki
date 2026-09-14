import {useState, useEffect} from 'react';
import {Character} from '../../components/Character/Character';
import {Select} from '../../components/Select/Select';
import { Pagination } from '../../components/Pagination/Pagination';
import pageStyles from '../pages.module.scss';
import type { EpisodeData, CharacterType } from '../../types';

export function Episodes() {
    const [episodeId, setEpisodeId] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<EpisodeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<CharacterType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(results.length / itemsPerPage);

    const api = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    useEffect (() => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1);

        fetch(api)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Episode not found')
            }
            return response.json();
        })
         .then((res: EpisodeData) => {           
            setData(res);
    const characterIds = res.characters
        .map((url: string) => url.split('/').pop())
        .join(',');

    if (!characterIds) return [];

    return fetch(`https://rickandmortyapi.com/api/character/${characterIds}`)
        .then((charRes) => {
        if (!charRes.ok) throw new Error('Failed to fetch characters');
        return charRes.json();
    });
})
        .then((charactersData: CharacterType | CharacterType[] | []) => {
            const normalizedData = Array.isArray(charactersData) 
                ? charactersData 
                : [charactersData];
            setResults(normalizedData);
            setIsLoading(false);
        })
        .catch((err: Error) => {
            setData(null);
            setResults([]);
            setError(err.message);
            setIsLoading(false);
        });
    }, [api]);

    return (
        <>
        <div className ={pageStyles.pageHeaderContainer}>
        <div className={pageStyles.titleContainer}>
       <h1>Episode: {data?.name || "Unknown"}</h1>
       <p>Air date: {data?.air_date || "Unknown"}</p>
        </div>
        
            <Select 
            name="Episode"
            total={51}
            value={episodeId}
            onChange={(newId) => setEpisodeId(newId)}
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
                {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
        </>
    )
}