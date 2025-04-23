import Popular from "@/components/popular/Popular";
import Genre from "@/components/genres/Genre";
import {availableLocales} from "@/utils/i18n";
import {Suspense} from "react";

export const revalidate = 86400;

export function generateStaticParams() {
    return availableLocales.map((locale) => ({ locale }));
}

type Props = {
    params: {
        locale: string;
    }
}

export default async function Home({ params } : Props) {
    const locale: string = await params.locale;

  return (
    <div>
        <Suspense fallback={<div>Chargement...</div>}>
            <Popular locale={locale} />
        </Suspense>

        <Suspense fallback={<div>Chargement...</div>}>
            <Genre locale={locale} />
        </Suspense>
    </div>
  );
}
