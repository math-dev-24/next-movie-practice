"use client";

import { signOut } from "next-auth/react";
import {CirclePower} from "lucide-react";

const LogoutButton = () => {

    return (
        <button
            onClick={() => signOut()}
            className="border rounded bg-red-700 hover:bg-red-500 px-2 py-1 text-white transition-all duration-150 flex items-center gap-1"
        >
            <CirclePower size={20} />
             <span>Se déconnecter</span>
        </button>
    );
}

export default LogoutButton;