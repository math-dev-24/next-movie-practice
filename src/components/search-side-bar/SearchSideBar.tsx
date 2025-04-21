"use client";
import {useSelectedLayoutSegment, useParams, notFound} from "next/navigation";
import {Genre} from "@/types/Genre";
import Form from "@/components/search-side-bar/form/Form";

type SearchSideBarProps = {
    genres: Genre[];
}

const SearchSideBar = ({ genres }: SearchSideBarProps) => {
    const segments = useSelectedLayoutSegment();
    const params = useParams();

    const getSidebarTitle = () => {
        if (!segments) {
            return "Films"
        }
        const genre = genres.find((g: Genre) => g.id === Number(params.id));

        if (!genre) {
            return notFound();
        }

        return genre.name;
    }

    return (
        <aside className="bg-white rounded-lg shadow-sm w-full max-w-xs border border-slate-100">
            <div className="bg-slate-800 text-white py-3 px-4 rounded-t-lg">
                <h1 className="font-medium text-xl">{getSidebarTitle()}</h1>
                <p className="text-xs text-slate-300 mt-1">Affinez votre recherche</p>
            </div>

            <div className="py-3">
                <Form />
            </div>
        </aside>
    )
}

export default SearchSideBar;