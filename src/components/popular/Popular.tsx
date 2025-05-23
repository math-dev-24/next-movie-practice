import React from 'react';
import {getMovieByPath} from "@/utils/MovieClient";
import MediaCard from "@/components/media-card/MediaCard";
import {Movie} from "@/types/Movie";
import {getDictionaries} from "@/utils/dictionaries";
import {Locale} from "@/types/locale";

type Props = {
    locale: Locale,
    moviesLiked: Movie[]
}

const Popular = async ({locale, moviesLiked} : Props) => {
    const { results } = await getMovieByPath('movie/popular', [], locale);
    const { genres } = await getMovieByPath('/genre/movie/list', [], locale);

    const i18n = await getDictionaries(locale as Locale);

    const isLiked = (movie: Movie) => moviesLiked.some((m: Movie) => m.id === movie.id);

    return (
        <div>
            <h2 className="text-2xl font-bold">{i18n.home.popular}</h2>
            <div className="flex w-full overflow-x-auto gap-2 py-2">
                {
                    results &&
                    results.map((m: Movie) => <MediaCard key={m.id} movie={m} genres={genres} locale={locale} liked={isLiked(m)} />)
                }
            </div>
        </div>
    )
}

export default Popular;