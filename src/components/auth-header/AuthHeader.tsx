"use client";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {CircleUser} from "lucide-react";
import React from "react";
import {Locale} from "@/types/locale";

type Props = {
    locale: Locale,
    text: Record<string, string>
}

const AuthHeader = ({ locale, text } : Props) => {
    const { status } = useSession();

    return (
        <>
            {
                status === "authenticated" ?
                    <li className="text-gray-600 cursor-pointer">
                        <Link href={`/${locale}/user/profile`}>
                            <CircleUser/>
                        </Link>
                    </li>
                    :
                    <>
                        <li>
                            <Link href={`/${locale}/user/profile`}>
                                {text.login}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/signup`}>
                                {text.signup}
                            </Link>
                        </li>
                    </>
            }
        </>
    )

}

export default AuthHeader;