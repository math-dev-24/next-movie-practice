"use client";

import {signIn, useSession} from "next-auth/react";
import {Heart} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";

type Props = {
    mediaId: string;
    liked: boolean;
}

const Like = ({mediaId, liked}: Props) => {
    const {data: session} = useSession();
    const [likedState, setLikedState] = useState<boolean>(liked);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!session) {
            signIn();
            return;
        }

        setIsLoading(true);
        const wasLiked = likedState;
        setLikedState(!wasLiked);

        try {
            const response = await fetch(`/api/like/${mediaId}`, {
                method: "POST",
            });

            if (response.ok) {
                if (wasLiked) {
                    router.refresh();
                }
            } else {
                setLikedState(wasLiked);
                console.error("Erreur lors de l'opération like/unlike");
            }
        } catch (error) {
            setLikedState(wasLiked);
            console.error("Erreur :", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {session ? (
                <div
                    onClick={handleLike}
                    className={`${
                        likedState ? "text-white p-1 rounded bg-red-400" : "text-gray-400 border bg-slate-100 opacity-50 p-1 rounded"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    aria-label={likedState ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                    <Heart size={20} />
                </div>
            ) : null}
        </>
    )
}

export default Like;