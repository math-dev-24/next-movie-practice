// methods post pour s'enregistrer
import * as bcrypt from "bcrypt";
import prisma from "@/utils/prisma";
import {NextResponse} from "next/server";


export async function POST(request: Request) {

  if (!request.body) {
    return NextResponse.json({error: "Aucun corps de requête"}, {status: 400});
  }

  const body = await request.json();

  if (!body.email || !body.password) {
    return NextResponse.json({error: "Email ou mot de passe manquant"}, {status: 400});
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });

  if (user) {
    return NextResponse.json({error: "Une erreur est survenue"}, {status: 400});
  }


  const newUser = await prisma.user.create({
  data: {
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  }
  });

  const { password, ...rest } = newUser;

  return NextResponse.json(rest);
}