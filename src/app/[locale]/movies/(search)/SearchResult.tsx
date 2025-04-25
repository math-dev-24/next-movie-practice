import React, {Suspense} from 'react';
import {Search} from "@/types/Search";
import {getLikedMovies, getMovieByPath} from "@/utils/MovieClient";
import {Movie} from "@/types/Movie";
import MediaCard from "@/components/media-card/MediaCard";
import Loader from "@/components/loader/Loader";
import {getServerSession} from "next-auth";
import {Locale} from "@/types/locale";

type props = {
    genreId?: string;
    locale: Locale;
    searchParams: Search
}

const SearchResult = async ({ genreId, locale, searchParams }: props) => {

    const { genres } = await getMovieByPath('/genre/movie/list', [], locale);

    // @ts-ignore
    const { user: userSession } = await getServerSession();

    const moviesLiked = await getLikedMovies(userSession.email, locale);

    const { results } = await getMovieByPath('discover/movie', [
        {key: 'sort_by', value: searchParams.sort || ""},
        {key: 'release_date.gte', value: searchParams.from_date || ""},
        {key: 'release_year.lte', value: searchParams.to_date || ""},
        {key: 'with_genres', value: genreId || ""}
    ], locale);

    const isLiked = (movie: Movie) => moviesLiked.some((m: Movie) => m.id === movie.id);

    return (
        <Suspense fallback={<Loader />}>
            {
                results &&
                results
                    .filter((m: Movie) => m.backdrop_path)
                    .map((m: Movie) => <MediaCard key={m.id} movie={m} genres={genres} locale={locale} liked={isLiked(m)} />)
            }
        </Suspense>
    )
}

export default SearchResult;