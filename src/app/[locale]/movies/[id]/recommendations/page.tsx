import React from "react";
import {getMovieByPath} from "@/utils/MovieClient";
import {notFound} from "next/navigation";
import {Movie} from "@/types/Movie";
import MediaCard from "@/components/media-card/MediaCard";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

type Props = {
    params: Promise<{ id: string, locale: string }>
}

const MoviePageById = async ({ params }: Props) => {

    const { id, locale } = await params;

    const [movie, recommendationsData, genres] = await Promise.all([
        getMovieByPath(`/movie/${id}`, [], locale),
        getMovieByPath(`/movie/${id}/recommendations`, [], locale),
        getMovieByPath(`/genre/movie/list`, [], locale)
    ]);

    if (!recommendationsData) {
        return notFound();
    }
    const recommendations: Movie[] = recommendationsData.results || [];

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Recommandations pour : {movie.title} - {movie.vote_average.toFixed(1)}/10</h1>
                <span className="text-sm text-gray-500">Nombre de recommandations : {recommendations.length}</span>
            </div>

                <div className="grid grid-cols-4 gap-4">
                    {
                        recommendations.map((movie: Movie) => (
                            <MediaCard
                                movie={movie}
                                key={movie.id}
                                genres={genres.genres}
                                locale={locale}
                            />
                        ))
                    }
                </div>
            </>
            )
            }

            export default MoviePageById;