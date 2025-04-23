import React, {Suspense} from "react";
import {getMovieByPath} from "@/utils/MovieClient";
import {notFound} from "next/navigation";
import {MovieDetails} from "@/types/Movie";
import MovieDetail from "@/components/movie-details/MovieDetail";
import MovieSuggest from "@/components/movie-details/MovieSuggest";
import Loader from "@/components/loader/Loader";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

type Props = {
    params: Promise<{ id: string, locale: string }>
}


const MoviePageById = async ({ params }: Props) => {

    const { id, locale } = await params;

    if (!id) return notFound();

    const details: MovieDetails = await getMovieByPath(`/movie/${id}`, [], locale);

    if (!details.original_title)  return notFound();


    return (
        <div>
            <MovieDetail movie={details} locale={locale} />
            <Suspense fallback={<Loader />}>
                <MovieSuggest movieId={details.id} locale={locale} />
            </Suspense>
        </div>
    )

}

export default MoviePageById;