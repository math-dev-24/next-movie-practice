import React from 'react';
import SearchSideBar from "@/components/search-side-bar/SearchSideBar";
import {getMovieByPath} from "@/utils/MovieClient";
import {Locale} from "@/types/locale";
import {getDictionaries} from "@/utils/dictionaries";


const MovieSearch = async ({
children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>
}>) => {
    const { locale } = await params;

    const { genres } = await getMovieByPath('/genre/movie/list', [], locale);

    const i18n = await getDictionaries(locale);


    return (
        <div className="grid grid-cols-4 gap-2">
            <aside className="col-span-1">
                <SearchSideBar genres={genres} text={i18n.filter} locale={locale} />
            </aside>
            <div className="col-span-3 overflow-y-auto grid grid-cols-3 gap-2 py-4 px-2 border border-gray-200 rounded">
                {children}
            </div>
        </div>
    )
}

export default MovieSearch;