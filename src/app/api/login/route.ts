import * as bcrypt from "bcrypt";
import prisma from "@/utils/prisma";
import {NextResponse} from "next/server";


export async function POST(request: Request) {

    const body = await request.json();

    if (!body.email || !body.password) {
        return NextResponse.json({error: "Email ou mot de passe manquant"}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if (!user) {
        return NextResponse.json({error: "Une erreur est survenue"}, {status: 400});
    }

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
        return NextResponse.json({error: "Mot de passe incorrect"}, {status: 400});
    }

    const { password, ...rest } = user;

    return NextResponse.json(rest);
}