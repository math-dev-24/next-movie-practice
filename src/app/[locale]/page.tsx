import Popular from "@/components/popular/Popular";
import Genre from "@/components/genres/Genre";
import {availableLocales} from "@/utils/i18n";
import {Suspense} from "react";
import Loader from "@/components/loader/Loader";
import {Locale} from "@/types/locale";

export const revalidate = 86400;

export function generateStaticParams() {
    return availableLocales.map((locale) => ({ locale }));
}

type Props = {
    params: Promise<{ locale: Locale }>
}

export default async function Home({ params } : Props) {
    const { locale } = await params;

  return (
    <div>
        <Suspense fallback={<Loader />}>
            <Popular locale={locale} />
        </Suspense>

        <Suspense fallback={<Loader />}>
            <Genre locale={locale} />
        </Suspense>
    </div>
  );
}
