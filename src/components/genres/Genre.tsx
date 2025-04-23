import React, {JSX} from 'react';
import { getMovieByPath } from "@/utils/MovieClient";
import type { Genre as GenreType } from "@/types/Genre";
import Link from "next/link";

type Props = {
    locale: string
}

const Genre = async ({locale}: Props) => {

    const { genres } = await getMovieByPath('/genre/movie/list', [], locale);

    return (
        <div className="my-4 container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-3 text-gray-800">Parcourir par genre :</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {genres && genres.map((genre: GenreType) => (
                    <Link
                        key={genre.id}
                        href={`/${locale}/movies/genres/${genre.id}`}
                        className="group"
                    >
                        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 h-14">
                            <div
                                className="h-full w-14 bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center group-hover:from-blue-600 group-hover:to-emerald-600 transition-colors"
                            >
                                <GenreIcon genreId={genre.id} />
                            </div>
                            <div className="px-3 py-1 flex-1">
                                <h3 className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors truncate">
                                    {genre.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Composant pour afficher une icône en fonction du genre
const GenreIcon = ({ genreId }: { genreId: number }) => {
    // Associer certains genres à des icônes spécifiques
    const iconMap: Record<number, JSX.Element> = {
        28: ( // Action
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        12: ( // Aventure
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 3L5 7l5 5M10 17l4 4 6-6-4-4M6 18l2-2M3 3l18 18" />
            </svg>
        ),
        16: ( // Animation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        35: ( // Comédie
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        80: ( // Crime
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12h5l2 9 4-18 3 9h6" />
            </svg>
        ),
        18: ( // Drame
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 14v7M12 14v7M16 14v7M3 7l3 7h12l3-7M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2" />
            </svg>
        ),
        14: ( // Fantasy
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3 6 7 1-5 4 2 7-7-4-7 4 2-7-5-4 7-1 3-6z" />
            </svg>
        ),
        27: ( // Horreur
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 6l6 4 6-4v5a6 6 0 01-12 0V6z" />
                <circle cx="8" cy="10" r="1" />
                <circle cx="14" cy="10" r="1" />
            </svg>
        ),
        878: ( // Science Fiction
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15 15 0 0 1 0 20" />
            </svg>
        ),
        10749: ( // Romance
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        ),
    };

    // Icône par défaut pour les genres sans icône spécifique
    const defaultIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M12 7v10M7 12h10" />
        </svg>
    );

    return iconMap[genreId] || defaultIcon;
};

export default Genre;