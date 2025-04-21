import {getMovieByPath} from "@/utils/MovieClient";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return new Response('Missing query parameter', { status: 400 });
    }

    const searchResult = await getMovieByPath('/search/movie', [{key: 'query', value: query}]);

    return new Response(JSON.stringify(searchResult), { status: 200 });
}