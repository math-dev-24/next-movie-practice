import React from "react";
import {getMovieByPath} from "@/utils/MovieClient";
import {notFound} from "next/navigation";
import {Casting} from "@/types/Movie";
import {MovieCastingDetail} from "@/components/movie-casting/MovieCastingDetail";

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

type Props = {
    params: Promise<{ id: string }>
}

const MoviePageById = async ({ params }: Props) => {
    const { id } = await params;

    const creditsResponse = await getMovieByPath(`/movie/${id}/credits`);

    if (!creditsResponse) {
        return notFound();
    }

    const cast = creditsResponse.cast || [];

    if (cast.length === 0) {
        return (
            <div className="p-4 text-center">
                <p>Aucune information de casting disponible pour ce film.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4">
            {cast.map((castMember: Casting) => (
                <MovieCastingDetail cast={castMember} key={castMember.id} />
            ))}
        </div>
    )
}

export default MoviePageById;