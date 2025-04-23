import React from "react";
import { getMovieByPath } from "@/utils/MovieClient";
import { Casting } from "@/types/Movie";
import Link from "next/link";
import {MovieCastingDetail} from "@/components/movie-casting/MovieCastingDetail";

type Props = {
    movieId: number;
    limit?: number;
}

const MovieCredit = async ({ movieId, limit = 10 }: Props) => {
    const credits = await getMovieByPath(`/movie/${movieId}/credits`);

    const filteredCast = credits.cast
        .filter((c: Casting) => c.profile_path)
        .slice(0, limit);

    return (
        <div className="my-6">
            <h1 className="text-xl font-bold">Casting - {credits.cast.length}</h1>
            <div
                className="flex overflow-x-auto gap-4 pb-4 px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            >
                {filteredCast.map((cast: Casting) => (
                    <MovieCastingDetail cast={cast} key={cast.id} />
                ))}

                {credits.cast.length > limit && (
                    <Link
                        href={`/movies/${movieId}/cast`}
                        className="flex items-center justify-center w-[100px] h-full"
                    >
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/40 transition-colors h-full">
                            <span className="text-lg font-bold">+{credits.cast.length - limit}</span>
                            <span className="text-xs">View All</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MovieCredit;