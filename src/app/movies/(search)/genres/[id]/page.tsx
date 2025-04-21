import React from 'react';
import SearchResult from "@/app/movies/(search)/SearchResult";
import {Search} from "@/types/Search";

type props = {
    params: {
        id: string;
    },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

function GenrePageById ({ params, searchParams }: props) {

    const search: Search = {
        genreId: params.id,
        sort: searchParams.sort as string,
        from_date: searchParams.from_date as string,
        to_date: searchParams.to_date as string,
    }

    return <SearchResult genreId={params.id} searchParams={search} />
}

export default GenrePageById;