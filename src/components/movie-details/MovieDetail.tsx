import React, {Suspense} from "react";
import {MovieDetails} from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";
import MovieCredit from "@/components/movie-details/MovieCredit";

type Props = {
    movie: MovieDetails;
}
const MovieDetail = ({movie}: Props) => {

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long', year: 'numeric'};
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const voteRatio = Math.round((movie.vote_average / 10) * 100);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${movie.backdrop_path}`}
                    fill
                    style={{objectFit: 'cover'}}
                    alt={`${movie.title} backdrop`}
                    className="brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-2xl text-white font-bold px-6 text-center drop-shadow-lg uppercase">
                        {movie.title}
                    </h1>
                </div>
            </div>


            {/* Contenu principal */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Colonne gauche: poster et infos clés */}
                <div className="md:w-1/3">
                    {movie.poster_path ? (
                        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500/${movie.poster_path}`}
                                fill
                                style={{objectFit: 'cover'}}
                                alt={movie.title}
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
                            <div
                                className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
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
                                <span className="text-lg font-bold">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{movie.vote_count} votes</p>
                                <p className="font-medium">{movie.status}</p>
                            </div>
                        </div>
                    </div>

                    {/* Infos techniques */}
                    <div className="space-y-3 text-sm">
                        <p><span
                            className="font-semibold text-gray-600">Date de sortie:</span><br/>{formatDate(movie.release_date)}
                        </p>
                        <p><span
                            className="font-semibold text-gray-600">Durée:</span><br/>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                        </p>
                        <p>
                            <span className="font-semibold text-gray-600">Genres:</span><br/>
                            <span className="flex flex-wrap gap-1 mt-1">
                                    {movie.genres.map(genre => (
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
                        <p><span
                            className="font-semibold text-gray-600">Budget:</span><br/>{movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'Non communiqué'}
                        </p>
                        <p><span
                            className="font-semibold text-gray-600">Recettes:</span><br/>{movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'Non communiqué'}
                        </p>
                    </div>
                </div>

                {/* Colonne droite: contenu et détails */}
                <div className="md:w-2/3">
                    {movie.tagline && (
                        <p className="text-gray-600 italic text-lg mb-4">{movie.tagline}</p>
                    )}

                    <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                    <p className="mb-6 leading-relaxed text-gray-700">
                        {movie.overview || "Aucun synopsis disponible."}
                    </p>

                    {/* Production */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Production</h2>
                        <div className="space-y-4">
                            {movie.production_companies.length > 0 && (
                                <div>
                                    <h3 className="text-md font-medium text-gray-600 mb-2">Sociétés de production :</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {movie.production_companies.map(company => (
                                            <div key={company.id} className="flex items-center gap-2">
                                                {company.logo_path ? (
                                                    <div className="relative w-12 h-6">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500/${company.logo_path}`}
                                                            fill
                                                            style={{objectFit: 'contain'}}
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

                            {movie.production_countries.length > 0 && (
                                <div>
                                    <h3 className="text-md font-medium text-gray-600 mb-2">Pays de production</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.production_countries.map(country => (
                                            <span key={country.iso_3166_1}
                                                  className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                    {country.name}
                                                </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {movie.spoken_languages.length > 0 && (
                                <div>
                                    <h3 className="text-md font-medium text-gray-600 mb-2">Langues</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.spoken_languages.map(language => (
                                            <span key={language.iso_639_1} className="text-sm">
                                                    {language.name}
                                                </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Suspense fallback={<div>Chargement...</div>}>
                                <MovieCredit movieId={movie.id} />
                            </Suspense>
                        </div>
                    </div>

                    {/* Liens externes */}
                    <div className="flex gap-3 mt-8">
                        {movie.homepage && (
                            <a
                                href={movie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Site officiel
                            </a>
                        )}
                        {movie.imdb_id && (
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
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
    )
}

export default MovieDetail;