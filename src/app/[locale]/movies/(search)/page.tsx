import React from 'react';
import {Search} from "@/types/Search";
import SearchResult from "@/app/[locale]/movies/(search)/SearchResult";

type props = {
    params: {
        locale: string;
    },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const Movies = ({params, searchParams} : props) => {

    const paramsFilter: Search = {
        sort: searchParams.sort as string,
        from_date: searchParams.from_date as string,
        to_date: searchParams.to_date as string,
    }

    return <SearchResult searchParams={paramsFilter} locale={params.locale} />
}

export default Movies;