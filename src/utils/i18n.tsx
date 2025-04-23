import Negotiator from "negotiator";
import {match} from "@formatjs/intl-localematcher";
import {NextRequest} from "next/server";


export const availableLocales: string[] = ['en', 'fr'];
export const defaultLocale: string = 'fr';

export const getPreferredLocale = (request: NextRequest): string => {
    const headers = {
        "accept-language": request.headers.get("accept-language") || "fr"
    }
    const languages = new Negotiator({headers}).languages();
    return match(languages, availableLocales, defaultLocale);
}

export const getLocaleUrlToRedirect = (request: NextRequest): URL | undefined => {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = availableLocales.every((locale) => {
        return !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
    });

    if (pathnameIsMissingLocale) {
        const locale = getPreferredLocale(request);
        return new URL(`/${locale}${pathname}`, request.url);
    }

    return undefined;
}