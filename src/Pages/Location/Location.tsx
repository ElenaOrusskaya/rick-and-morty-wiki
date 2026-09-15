import {useState, useEffect} from 'react';
import {Select} from '../../components/Select/Select';
import {Character} from '../../components/Character/Character';
import { Pagination } from '../../components/Pagination/Pagination';
import { useResourceCount } from '../../hooks/useResourceCount';
import type { LocationData, CharacterType } from '../../types';
import pageStyles from '../pages.module.scss';

export function Location() {
    const [locationId, setLocationId] = useState<number>(1);
    const { count: totalLocations, error: optionsError } = useResourceCount('location');
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
        const controller = new AbortController();

        const loadLocation = async () => {
            setIsLoading(true);
            setError(null);
            setCurrentPage(1);

            try {
                const response = await fetch(api, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Location not found');
                }

                const location: LocationData = await response.json();
                const residentIds = location.residents
                    .map((url) => url.split('/').pop())
                    .join(',');

                let residents: CharacterType[] = [];
                if (residentIds) {
                    const charRes = await fetch(
                        `https://rickandmortyapi.com/api/character/${residentIds}`,
                        { signal: controller.signal },
                    );
                    if (!charRes.ok) {
                        throw new Error('Failed to fetch residents');
                    }

                    const residentData: CharacterType | CharacterType[] = await charRes.json();
                    residents = Array.isArray(residentData) ? residentData : [residentData];
                }

                if (controller.signal.aborted) return;

                setData(location);
                setResults(residents);
                setIsLoading(false);
            } catch (err) {
                if (controller.signal.aborted) return;

                setData(null);
                setResults([]);
                setError(err instanceof Error ? err.message : 'Failed to fetch location');
                setIsLoading(false);
            }
        };

        void loadLocation();
        return () => controller.abort();
    }, [api]);
    

    return (
        <>
        <div className ={pageStyles.pageHeaderContainer}>
        <div className = {pageStyles.titleContainer}>
            <h1>Location: {data?.name || "Unknown"}</h1>
            <p>Dimension: {data?.dimension || "Unknown"}</p>
            <p>Type: {data?.type || "Unknown"}</p>
        </div>

        {totalLocations === null ? (
            <p className={pageStyles.selectorMessage} role={optionsError ? 'alert' : 'status'}>
                {optionsError ?? 'Loading locations...'}
            </p>
        ) : (
            <Select
                name="Location"
                total={totalLocations}
                value={locationId}
                onChange={(newId) => setLocationId(newId)}
            />
        )}
        </div>
        <div className = "content_container">
                        {isLoading ? (
                            <div className="loading-spinner" role="status" aria-label="Loading location and residents"></div>
                        ) : error ? (
                        <div className="not-found-message" role="alert">{error}</div>
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
