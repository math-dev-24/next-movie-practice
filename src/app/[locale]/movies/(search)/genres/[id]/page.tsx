import React from 'react';
import {Search} from "@/types/Search";
import SearchResult from "@/app/[locale]/movies/(search)/SearchResult";

type props = {
    params: {
        id: string;
        locale: string;
    },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

async function GenrePageById ({ params, searchParams }: props) {

    const {id, locale} = await params;

    const search: Search = {
        genreId: params.id,
        sort: searchParams.sort as string,
        from_date: searchParams.from_date as string,
        to_date: searchParams.to_date as string,
    }

    return <SearchResult genreId={id} searchParams={search} locale={locale} />
}

export default GenrePageById;