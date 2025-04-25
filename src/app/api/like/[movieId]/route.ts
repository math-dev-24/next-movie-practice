import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import prisma from "@/utils/prisma";

export async function POST(
    request: Request,
    { params }: { params: { movieId: string } }
) {
    const {movieId} = params;

    // @ts-ignore
    const token = await getToken({req: request});

    console.log(token);
    console.log(params);

    if (!token) {
        return NextResponse.json({error: "unauthorized"}, {status: 401});
    }

    if (!movieId) {
        return NextResponse.json({error: "Movie id is required"}, {status: 404});
    }
    // recherche si le film est déjà like
    const like = await prisma.movieLike.findFirst({
        where: {
            userId: token.id as number,
            movieId: parseInt(movieId, 10)
        }
    });
    // si le film n'est pas like, on le fait
    if (!like) {
        const user = await prisma.user.update({
            where: {
                email: token.email as string
            },
            data: {
                likes: {
                    create: [{movieId: parseInt(movieId, 10)}]
                }
            }
        });
        return NextResponse.json(user);
        // si le film est déjà like, on le supprime
    } else {
        const user = await prisma.user.update({
            where: {
                email: token.email as string
            },
            data: {
                likes: {
                    delete: {
                        id: like.id
                    }
                }
            }
        });
        return NextResponse.json(user);
    }
}