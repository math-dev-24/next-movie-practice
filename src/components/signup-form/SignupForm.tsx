"use client";
import {FormEvent, useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import Link from "next/link";
import {Locale} from "@/types/locale";
import {useRouter} from "next/navigation";

type Props = {
    locale: Locale
}

const SignupForm = ({ locale } : Props) => {
    // state user
    const { status } = useSession();
    const router = useRouter();

    // state form
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");

    // champ form
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            setError(`Une erreur est survenue`);
            setLoading(false);
            return;
        }

        if (response.ok) {
            signIn()
        }
    }

    const validEmail = (email: string) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    useEffect(() => {
        if (status === "authenticated") {
            router.push(`/${locale}/user/profile`);
        }

    }, [status])


    return (
        <form
            className="flex flex-col gap-4 max-w-xl mx-auto block py-8 px-4"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Votre email : <span className="text-red-500">*</span></label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border-2 border-gray-300 rounded p-2"
                    required
                    value={email}
                    />
                {
                    validEmail(email) ? null :
                        <p className="text-red-500 text-sm text-center">L&#39;adresse email n&#39;est pas valide</p>
                }
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password">Votre mot de passe : <span className="text-red-500">*</span></label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    className="border-2 border-gray-300 rounded p-2"
                    required
                    value={password}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
            >
                {loading ? "En cours..." : "S'inscrire"}
            </button>
            <span>Déjà inscrit ? <Link className="text-emerald-400" href={`/${locale}/user/profile`}>Se connecter</Link></span>
            {error && <p className="text-red-500 font-bold text-xl text-center">{error}</p>}
        </form>
    );
};

export default SignupForm;