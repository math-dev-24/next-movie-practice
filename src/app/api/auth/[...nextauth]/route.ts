import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "MovieApp",
            credentials: {
                email: { label: "Votre email :", type: "email" },
                password: { label: "Mot de passe :", type: "password" },
            },
            async authorize(credentials, req) {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();

                if (data.error) {
                    return null;
                }

                return {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                };
            }
        })
    ]
});

export { handler as GET, handler as POST };