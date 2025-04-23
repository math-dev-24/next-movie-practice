import React, {Suspense} from "react";
import {getMovieByPath} from "@/utils/MovieClient";
import {notFound} from "next/navigation";
import {MovieDetails} from "@/types/Movie";
import MovieDetail from "@/components/movie-details/MovieDetail";
import MovieSuggest from "@/components/movie-details/MovieSuggest";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

type Props = {
    params: {
        id: string;
        locale: string
    }
}


const MoviePageById = async ({ params }: Props) => {
    const details: MovieDetails = await getMovieByPath(`/movie/${params.id}`, [], params.locale);

    if (!details.original_title) {
        return notFound();
    }
    return (
        <div>
            <MovieDetail movie={details} />
            <Suspense fallback={<div>Chargement...</div>}>
                <MovieSuggest movieId={details.id} locale={params.locale} />
            </Suspense>
        </div>
    )

}

export default MoviePageById;