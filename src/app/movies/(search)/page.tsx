import React from 'react';
import SearchResult from "@/app/movies/(search)/SearchResult";
import {Search} from "@/types/Search";

type props = {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const Movies = ({searchParams} : props) => {

    const params: Search = {
        sort: searchParams.sort as string,
        from_date: searchParams.from_date as string,
        to_date: searchParams.to_date as string,
    }

    return <SearchResult searchParams={params} />
}

export default Movies;