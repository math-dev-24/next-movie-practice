
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

export type MovieDetails = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string | null;
    budget: number;
    genres: Array<{id: number, name: string}>;
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<{id: number, name: string, logo_path: string | null}>;
    production_countries: Array<{iso_3166_1: string, name: string}>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<{iso_639_1: string, name: string}>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type Casting = {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character:string,
    order: number,
    credit_id: number,
}
