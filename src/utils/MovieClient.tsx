import "server-only";
import {Locale} from "@/types/locale";
import prisma from "@/utils/prisma";
import {Movie} from "@/types/Movie";
import {Like} from "@/types/Like";


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

export const getLikedMovies = async (email: string, language: Locale): Promise<Movie[]> => {
    if (!email) return [];

    const userData =  await prisma.user.findFirst({
        where: { email },
        include: {
            likes: true
        }
    })
    return userData ? await getHydratedMovies(userData.likes.map((like: Like) => like.movieId), language) : [];
}

export const getHydratedMovies = async (movieIds: number[], language: Locale) => {
    const moviePromises = movieIds.map(
        (movieId: number) => getMovieByPath(`/movie/${movieId}`, [], language),
    )
    return await Promise.all(moviePromises);
}

export const unLikeMovie = async (movieId: string) => {
    const response = await fetch(`/api/like/${movieId}`, {
        method: "POST",
    })

    return response.ok;
}