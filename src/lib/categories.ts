/*
 * Provides typed, build-time database access helpers for category records.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';

/**
 * Retrieves all categories ordered alphabetically by name.
 *
 * @param db - The database client used to query category records.
 * @returns A promise resolving to all categories ordered by name.
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(asc(categories.name));

    return rows;
}
