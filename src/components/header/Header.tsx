import React from 'react';
import Link from 'next/link';
import MovieSearch from "@/components/movie-search/MovieSearch";
import LanguageSelector from "@/components/language-selector/LanguageSelector";
import {Locale} from "@/types/locale";
import {getDictionaries} from "@/utils/dictionaries";

type Props = {
    locale: Locale
}

const Header = async ({locale}: Props) => {

    const i18n = await getDictionaries(locale);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <Link href={`/${locale}/`} className="flex items-center gap-1 hover:text-emerald-500 transition-all duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                             viewBox="0 0 11 11">
                            <path
                                d="M10 5.5v2a.5.5 0 0 1-1 0a.66.66 0 0 0-.51-.5H8v1.63a.37.37 0 0 1-.37.37H1.37A.37.37 0 0 1 1 8.63V5.37A.37.37 0 0 1 1.37 5h6.26a.37.37 0 0 1 .37.37V6h.49A.66.66 0 0 0 9 5.5a.5.5 0 0 1 1 0zM2.5 2a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3zm0 2a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1zM6 1a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm0 3a1 1 0 1 1 0-2a1 1 0 0 1 0 2z"
                                fill="currentColor"/>
                        </svg>
                        <span className="text-lg font-bold">MovieApp</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center ml-auto">
                        <ul className="flex items-center space-x-6">
                            <li>
                                <Link
                                    href={`/${locale}/`}
                                    className="text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-emerald-500 transition-colors px-1 py-2"
                                >
                                    {i18n.header.home}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/series`}
                                    className="text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-emerald-500 transition-colors px-1 py-2"
                                >
                                    {i18n.header.series}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/movies`}
                                    className="text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-emerald-500 transition-colors px-1 py-2"
                                >
                                    {i18n.header.movies}
                                </Link>
                            </li>
                            <li className="ml-4 w-56">
                                <MovieSearch locale={locale} text={i18n.search} />
                            </li>
                            <li>
                                <LanguageSelector />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;