import React from 'react';
import SearchSideBar from "@/components/search-side-bar/SearchSideBar";
import {getMovieByPath} from "@/utils/MovieClient";


const MovieSearch = async ({
children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const { genres } = await getMovieByPath('/genre/movie/list');

    return (
        <div className="grid grid-cols-4 gap-2">
            <aside className="col-span-1">
                <SearchSideBar genres={genres} />
            </aside>
            <div className="col-span-3 overflow-y-auto grid grid-cols-3 gap-2 py-4 px-2 border border-gray-200 rounded">
                {children}
            </div>
        </div>
    )
}

export default MovieSearch;