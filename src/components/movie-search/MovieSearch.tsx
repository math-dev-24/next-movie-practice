"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Movie } from "@/types/Movie";
import { useDebouncedCallback } from "use-debounce";
import MovieSearchResult from "@/components/movie-search/MovieSearchResult";
import { useRouter } from "next/navigation";
import "./movieSearch.css";
import {Locale} from "@/types/locale";

const SearchPortal = ({ children, onClose } : { children: React.ReactNode, onClose: () => void }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <>
            <div
                className="fixed z-50 bg-white top-1/5 left-1/5 w-3/5 rounded-lg shadow-xl py-4"
                style={{ animation: "fadeIn 0.4s ease-in-out" }}
            >
                {children}
            </div>
            <div
                className="fixed top-0 left-0 w-full h-full bg-black opacity-80 z-10"
                onClick={onClose}
            ></div>
        </>,
        document.body
    );
};


const MovieSearch = ({locale, text} : {locale: Locale, text: {label: string, placeholder: string, check: string, no_result: string}}) => {
    const [moviesResults, setMoviesResults] = useState<Movie[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const updateMovieSearch = async (value: string) => {
        setOnLoading(true);
        const response = await fetch(`/api/movies/search?query=${value}&locale=${locale}`);
        const { results } = await response.json();

        setMoviesResults(results.filter((movie: Movie) => movie.backdrop_path));
        setShowResult(true);
        setOnLoading(false);
    };

    const debounced = useDebouncedCallback(updateMovieSearch, 1400);

    const onSelectMovie = (movie: Movie) => {
        setShowResult(false);
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
        router.push(`/${locale}/movies/${movie.id}`);
    };

    const handleOpenSearch = () => {
        setShowResult(true);
        // Focus the input in the next tick after the portal has rendered
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 100);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder={text.label}
                    className="w-full outline-none rounded border border-slate-400 bg-white px-1"
                    onClick={handleOpenSearch}
                />
            </div>

            {showResult && (
                <SearchPortal onClose={() => setShowResult(false)}>
                    <input
                        type="text"
                        ref={searchInputRef}
                        id="search-input"
                        placeholder={text.placeholder}
                        className="h-full rounded w-full py-2 px-4 outline-none"
                        onChange={(e) => debounced(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    <div className="w-full border-2 border-slate-700 bg-slate-700 h-0.5"></div>
                    <MovieSearchResult
                        moviesResults={moviesResults}
                        onLoading={onLoading}
                        onSelectMovie={onSelectMovie}
                        text={text}
                    />
                </SearchPortal>
            )}
        </>
    );
};

export default MovieSearch;