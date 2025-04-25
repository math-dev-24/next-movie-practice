import Popular from "@/components/popular/Popular";
import Genre from "@/components/genres/Genre";
import {availableLocales} from "@/utils/i18n";
import {Suspense, use} from "react";
import Loader from "@/components/loader/Loader";
import {Locale} from "@/types/locale";
import {getServerSession} from "next-auth";
import {getLikedMovies} from "@/utils/MovieClient";

export const revalidate = 86400;

export function generateStaticParams() {
    return availableLocales.map((locale) => ({ locale }));
}

type Props = {
    params: Promise<{ locale: Locale }>
}

export default async function Home({ params } : Props) {
    const { locale } = await params;

    const userSession = await getServerSession();

    const moviesLiked = userSession && userSession.user ? await getLikedMovies(userSession.user.email as string, locale) : [];

  return (
    <div>
        <Suspense fallback={<Loader />}>
            <Popular locale={locale} moviesLiked={moviesLiked} />
        </Suspense>

        <Suspense fallback={<Loader />}>
            <Genre locale={locale} />
        </Suspense>
    </div>
  );
}
