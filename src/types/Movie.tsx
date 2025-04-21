
export type Movie = {
    id: string;
    title: string;
    video: boolean;
    original_title: string;
    original_language: string;
    vote_count: number;
    vote_average: number;
    adult: boolean;
    popularity: number;
    backdrop_path: string;
    genre_ids: number[];
}