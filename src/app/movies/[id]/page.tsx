import React from "react";
import {getMovieByPath} from "@/utils/MovieClient";
import Image from "next/image";
import Link from "next/link";

type Props = {
    params: {
        id: string;
    }
}

interface MovieDetails {
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

const MoviePageById = async ({ params }: Props) => {
    try {
        const details: MovieDetails = await getMovieByPath(`/movie/${params.id}`);

        const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('fr-FR', options);
        };

        const voteRatio = Math.round((details.vote_average / 10) * 100);

        return (
            <div className="max-w-4xl mx-auto p-6">
                {details.backdrop_path && (
                    <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}${details.backdrop_path}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            alt={`${details.title} backdrop`}
                            className="brightness-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-xl text-white font-bold px-6 text-center drop-shadow-lg">
                                {details.title}
                            </h1>
                        </div>
                    </div>
                )}

                {/* Contenu principal */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Colonne gauche: poster et infos clés */}
                    <div className="md:w-1/3">
                        {details.poster_path ? (
                            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}${details.poster_path}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    alt={details.title}
                                    className="hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ) : (
                            <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center rounded-lg">
                                <span className="text-gray-400">Image non disponible</span>
                            </div>
                        )}

                        {/* Score et statut */}
                        <div className="mt-6 mb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                    <div className="absolute inset-0">
                                        <svg viewBox="0 0 36 36" className="h-16 w-16">
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#E0E0E0"
                                                strokeWidth="3"
                                            />
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke={voteRatio > 70 ? "#4CAF50" : voteRatio > 40 ? "#FFC107" : "#F44336"}
                                                strokeWidth="3"
                                                strokeDasharray={`${voteRatio}, 100`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold">{details.vote_average.toFixed(1)}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{details.vote_count} votes</p>
                                    <p className="font-medium">{details.status}</p>
                                </div>
                            </div>
                        </div>

                        {/* Infos techniques */}
                        <div className="space-y-3 text-sm">
                            <p><span className="font-semibold text-gray-600">Date de sortie:</span><br />{formatDate(details.release_date)}</p>
                            <p><span className="font-semibold text-gray-600">Durée:</span><br />{Math.floor(details.runtime / 60)}h {details.runtime % 60}min</p>
                            <p>
                                <span className="font-semibold text-gray-600">Genres:</span><br />
                                <span className="flex flex-wrap gap-1 mt-1">
                                    {details.genres.map(genre => (
                                        <Link
                                            href={`/movies/genres/${genre.id}`}
                                            key={genre.id}
                                            className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                                        >
                                            {genre.name}
                                        </Link>
                                    ))}
                                </span>
                            </p>
                            <p><span className="font-semibold text-gray-600">Budget:</span><br />{details.budget > 0 ? `$${details.budget.toLocaleString()}` : 'Non communiqué'}</p>
                            <p><span className="font-semibold text-gray-600">Recettes:</span><br />{details.revenue > 0 ? `$${details.revenue.toLocaleString()}` : 'Non communiqué'}</p>
                        </div>
                    </div>

                    {/* Colonne droite: contenu et détails */}
                    <div className="md:w-2/3">
                        {details.tagline && (
                            <p className="text-gray-600 italic text-lg mb-4">{details.tagline}</p>
                        )}

                        <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                        <p className="mb-6 leading-relaxed text-gray-700">
                            {details.overview || "Aucun synopsis disponible."}
                        </p>

                        {/* Production */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">Production</h2>
                            <div className="space-y-4">
                                {details.production_companies.length > 0 && (
                                    <div>
                                        <h3 className="text-md font-medium text-gray-600 mb-2">Sociétés de production</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {details.production_companies.map(company => (
                                                <div key={company.id} className="flex items-center gap-2">
                                                    {company.logo_path ? (
                                                        <div className="relative w-12 h-6">
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}${company.logo_path}`}
                                                                fill
                                                                style={{ objectFit: 'contain' }}
                                                                alt={company.name}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <span className="text-sm">{company.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {details.production_countries.length > 0 && (
                                    <div>
                                        <h3 className="text-md font-medium text-gray-600 mb-2">Pays de production</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {details.production_countries.map(country => (
                                                <span key={country.iso_3166_1} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {country.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {details.spoken_languages.length > 0 && (
                                    <div>
                                        <h3 className="text-md font-medium text-gray-600 mb-2">Langues</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {details.spoken_languages.map(language => (
                                                <span key={language.iso_639_1} className="text-sm">
                                                    {language.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Liens externes */}
                        <div className="flex gap-3 mt-8">
                            {details.homepage && (
                                <a
                                    href={details.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Site officiel
                                </a>
                            )}
                            {details.imdb_id && (
                                <a
                                    href={`https://www.imdb.com/title/${details.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                                >
                                    IMDb
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du film:", error);
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center py-12">
                    <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h1 className="text-2xl font-bold mb-4">Impossible de charger le film</h1>
                    <p className="text-gray-600 mb-6">
                        Nous n&apos;avons pas pu récupérer les informations pour le film avec l&apos;ID: {params.id}
                    </p>
                    <p className="bg-red-50 p-4 rounded-lg text-red-700 text-sm">
                        {error instanceof Error ? error.message : String(error)}
                    </p>
                </div>
            </div>
        );
    }
}

export default MoviePageById;