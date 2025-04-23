import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Casting} from "@/types/Movie";


type Props = {
    cast: Casting;
}

export const MovieCastingDetail = ({cast}: Props) => {
    return (
        <Link
            href={`/person/${cast.id}`}
            key={cast.id}
            className="flex-shrink-0 group hover:scale-105 transition-transform duration-200"
        >
            <div className="w-[120px] flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100/10">
                <div className="relative w-[80px] h-[80px] overflow-hidden rounded-full border-2 border-gray-200 shadow-md">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${cast.profile_path}`}
                        alt={cast.name}
                        className="object-cover"
                        fill
                        sizes="80px"
                    />
                </div>

                <div className="text-center">
                    <p className="font-medium text-sm">{cast.name}</p>
                    {cast.character && (
                        <p className="text-xs text-gray-500 mt-1">as {cast.character}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}