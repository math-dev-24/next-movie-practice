import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import {Movie} from "@/types/Movie";
import {Genre} from "@/types/Genre";
import Like from "@/components/media-card/like/Like";

type Props = {
    movie: Movie;
    genres: Genre[],
    locale: string,
    liked: boolean
}

const MediaCard = ({ movie, genres, locale, liked }: Props) => {

    const movieGenres: Genre[] = genres.filter((genre: Genre) =>
        movie.genre_ids.includes(genre.id)
    ).slice(0, 2);

    return (
        <Link
            href={`/${locale}/movies/${movie.id}`}
            className="flex min-w-[200px] flex-col w-64 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
        >
            {/* Image du film avec overlay pour la note */}
            <div className="relative h-36">
                {movie.backdrop_path ? (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500/${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        sizes="256px"
                        style={{ objectFit: 'cover' }}
                        className="brightness-95"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Image non disponible</span>
                    </div>
                )}

                {/* Score du film */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-sm font-medium rounded-full h-8 w-8 flex items-center justify-center">
                    {Math.round(movie.vote_average * 10) / 10}
                </div>
                <div className="min-w-2/5 opacity-50 absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm font-medium rounded-md h-8 w-8 flex items-center justify-center">
                    {movie.vote_count} votes
                </div>
                <div className="absolute top-1 left-1">
                    <Like mediaId={movie.id} liked={liked}/>
                </div>
            </div>

            {/* Informations sur le film */}
            <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-medium text-gray-800 line-clamp-2 mb-1" title={movie.title}>
                    {movie.title}
                </h3>

                {/* Affichage des genres */}
                {movieGenres.length > 0 && (
                    <div className="mt-auto pt-2 flex gap-1 flex-wrap">
                        {movieGenres.map(genre => (
                            <span
                                key={genre.id}
                                className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                        {movie.genre_ids.length > movieGenres.length && (
                            <span className="inline-block px-2 py-0.5 text-gray-400 text-xs">
                                +{movie.genre_ids.length - movieGenres.length}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default MediaCard;