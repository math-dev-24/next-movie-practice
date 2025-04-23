import React, {Suspense} from 'react';
import {Search} from "@/types/Search";
import {getMovieByPath} from "@/utils/MovieClient";
import {Movie} from "@/types/Movie";
import MediaCard from "@/components/media-card/MediaCard";
import Loader from "@/components/loader/Loader";

type props = {
    genreId?: string;
    locale: string;
    searchParams: Search
}

const SearchResult = async ({ genreId, locale, searchParams }: props) => {

    const { genres } = await getMovieByPath('/genre/movie/list', [], locale);

    const { results } = await getMovieByPath('discover/movie', [
        {key: 'sort_by', value: searchParams.sort || ""},
        {key: 'release_date.gte', value: searchParams.from_date || ""},
        {key: 'release_year.lte', value: searchParams.to_date || ""},
        {key: 'with_genres', value: genreId || ""}
    ], locale);

    return (
        <Suspense fallback={<Loader />}>
            {
                results &&
                results.filter((m: Movie) => m.backdrop_path).map((m: Movie) => <MediaCard key={m.id} movie={m} genres={genres} locale={locale} />)
            }
        </Suspense>
    )
}

export default SearchResult;