import React, {Suspense} from 'react';
import {Search} from "@/types/Search";
import {getMovieByPath} from "@/utils/MovieClient";
import {Movie} from "@/types/Movie";
import MediaCard from "@/components/media-card/MediaCard";

type props = {
    genreId?: string;
    locale: string;
    searchParams?: Search
}

const SearchResult = async ({ genreId, locale, searchParams }: props) => {

    const { genres } = await getMovieByPath('/genre/movie/list', [], locale);

    const { results } = await getMovieByPath('discover/movie', [
        {key: 'sort_by', value: searchParams?.sort as string},
        {key: 'release_date.gte', value: searchParams?.from_date as string},
        {key: 'release_year.lte', value: searchParams?.to_date as string},
        {key: 'with_genres', value: genreId as string}
    ], locale);

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            {
                results &&
                results.filter((m: Movie) => m.backdrop_path).map((m: Movie) => <MediaCard key={m.id} movie={m} genres={genres} locale={locale} />)
            }
        </Suspense>
    )
}

export default SearchResult;