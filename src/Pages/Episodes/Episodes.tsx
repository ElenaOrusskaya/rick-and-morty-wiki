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

    useEffect(() => {
        const controller = new AbortController();

        const loadEpisode = async () => {
            setIsLoading(true);
            setError(null);
            setCurrentPage(1);

            try {
                const response = await fetch(api, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Episode not found');
                }

                const episode: EpisodeData = await response.json();
                const characterIds = episode.characters
                    .map((url) => url.split('/').pop())
                    .join(',');

                let characters: CharacterType[] = [];
                if (characterIds) {
                    const charRes = await fetch(
                        `https://rickandmortyapi.com/api/character/${characterIds}`,
                        { signal: controller.signal },
                    );
                    if (!charRes.ok) {
                        throw new Error('Failed to fetch characters');
                    }

                    const characterData: CharacterType | CharacterType[] = await charRes.json();
                    characters = Array.isArray(characterData) ? characterData : [characterData];
                }

                if (controller.signal.aborted) return;

                setData(episode);
                setResults(characters);
                setIsLoading(false);
            } catch (err) {
                if (controller.signal.aborted) return;

                setData(null);
                setResults([]);
                setError(err instanceof Error ? err.message : 'Failed to fetch episode');
                setIsLoading(false);
            }
        };

        void loadEpisode();
        return () => controller.abort();
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
