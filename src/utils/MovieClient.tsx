import "server-only";


type Params = {
    key: string;
    value: string;
}


export const getMovieByPath = async (
    path: string,
    params: Params[] = [],
    language: string = 'fr-FR'
) => {

    const url =  new URL(`${process.env.TMDB_API_URL}/${path}`);

    url.searchParams.append('language', language);

    for (const param of params.filter((p: Params) => p.value)) {
        url.searchParams.append(param.key, param.value);
    }


    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
}
