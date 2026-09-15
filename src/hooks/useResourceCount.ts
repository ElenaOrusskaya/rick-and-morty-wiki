import { useEffect, useState } from 'react';
import type { ApiInfo } from '../types';

type Resource = 'episode' | 'location';

export function useResourceCount(resource: Resource) {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadCount = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/${resource}`, {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error('Failed to load resource count');
                }

                const { info }: { info: ApiInfo } = await response.json();
                if (!Number.isInteger(info?.count) || info.count < 1) {
                    throw new Error('Invalid resource count');
                }
                if (controller.signal.aborted) return;

                setCount(info.count);
            } catch {
                if (controller.signal.aborted) return;

                setError(`Unable to load ${resource} options. Please refresh the page.`);
            }
        };

        void loadCount();
        return () => controller.abort();
    }, [resource]);

    return { count, error };
}
