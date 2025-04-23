import React from "react";
import { getMovieByPath } from "@/utils/MovieClient";
import { Movie } from "@/types/Movie";
import MediaCard from "@/components/media-card/MediaCard";
import Link from "next/link";

type Props = {
    movieId: number;
    limit?: number;
    locale: string
}

const MovieSuggest = async ({ movieId, limit = 6, locale }: Props) => {

    const [recommendationsData, genres] = await Promise.all([
        getMovieByPath(`/movie/${movieId}/recommendations`, [], locale),
        getMovieByPath(`/genre/movie/list`, [], locale)
    ]);

    const recommendations: Movie[] = recommendationsData.results || [];

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <div className="my-8">
            <h1 className="text-xl font-bold">Suggestions - {recommendations.length}</h1>
            <div className="flex overflow-x-auto gap-4 pb-4 px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {recommendations.slice(0, limit).map((movie: Movie) => (
                    <MediaCard
                        movie={movie}
                        key={movie.id}
                        genres={genres.genres}
                        locale={locale}
                    />
                ))}
            </div>

            {recommendations.length > limit && (
                <div className="flex justify-center mt-6">
                    <Link
                        href={`${locale}/movies/${movieId}/recommendations`}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        View All Recommendations
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MovieSuggest;