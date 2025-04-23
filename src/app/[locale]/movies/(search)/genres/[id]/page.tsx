import React from 'react';
import SearchResult from "@/app/[locale]/movies/(search)/SearchResult";
import {notFound} from "next/navigation";
import {Locale} from "@/types/locale";
import {Search} from "@/types/Search";



type Props = {
    params: Promise<{ id: string, locale: Locale }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const GenrePageById =  async ({ params, searchParams }: Props) => {

    const {id, locale} = await params;

    if (!id) return notFound();

    const search: Search = await searchParams;


    return <SearchResult genreId={id} searchParams={search} locale={locale} />
}

export default GenrePageById;