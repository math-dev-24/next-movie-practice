import React from 'react';
import Image from "next/image";
import {Movie} from "@/types/Movie";

type props = {
    moviesResults: Movie[];
    onLoading: boolean;
    onSelectMovie: (movie: Movie) => void;
    text: {check: string, no_result: string}
}

const MovieSearchResult = ({moviesResults, onSelectMovie, text}: props) => {
    return (
        <div className="w-full max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 text-white py-3 px-4 font-semibold rounded-b z-5">
                <span>{moviesResults.length} {text.check}</span>
            </div>

            <div className="p-2">
                {moviesResults.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 z-5">{text.no_result}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                        {moviesResults.map((movie: Movie) => (
                            <div
                                key={movie.id}
                                onClick={() => onSelectMovie(movie)}
                                className="cursor-pointer flex items-start p-3 rounded-lg hover:bg-gray-200 transition-colors border border-gray-100"
                            >
                                <div className="flex-shrink-0 relative w-24 h-16 bg-gray-200 rounded overflow-hidden">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500/${movie.backdrop_path}`}
                                        alt={movie.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="ml-3 flex-1">
                                    <h3 className="font-medium text-gray-900 line-clamp-1">{movie.title}</h3>
                                    {movie.vote_average > 0 && (
                                        <div className="flex items-center mt-1">
                                            <div className="flex items-center justify-center bg-yellow-500 text-xs text-white font-bold rounded px-1.5 py-0.5">
                                                {movie.vote_average.toFixed(1)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSearchResult;