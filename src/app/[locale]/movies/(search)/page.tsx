import React from 'react';
import {Search} from "@/types/Search";
import SearchResult from "@/app/[locale]/movies/(search)/SearchResult";

type props = {
    params: Promise<{ locale: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Movies = async ({params, searchParams} : props) => {

    const { locale } = await params;
    const paramsFilter: Search = await searchParams;

    return <SearchResult searchParams={paramsFilter} locale={locale} />
}

export default Movies;