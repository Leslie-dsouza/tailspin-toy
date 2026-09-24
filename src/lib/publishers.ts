/*
 * Provides typed, build-time database access helpers for publisher records.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

type PublisherSelectionRow = {
    id: number;
    name: string;
};

function mapPublisher(row: PublisherSelectionRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/**
 * Retrieves all publishers ordered alphabetically by name.
 *
 * @param db - The database client used to query publisher records.
 * @returns A promise resolving to all publishers ordered by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map(mapPublisher);
}
