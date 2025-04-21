"use client";
import React from 'react';
import { useRouter, usePathname } from "next/navigation";

const Form = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const searchParams = new URLSearchParams();
        searchParams.append('sort', form.get('sort') as string);
        searchParams.append('from_date', form.get('from-date') as string);
        searchParams.append('to_date', form.get('to-date') as string);
        searchParams.append('include_adult', form.get('include-adult') as string);

        router.push(`${pathname}?${searchParams.toString()} `)
    }

    return (
        <form className="text-sm space-y-3 px-2" onSubmit={handleSubmit}>
            {/* Date de sortie */}
            <div className="border-b pb-2">
                <h3 className="font-medium text-slate-700 mb-1.5">Date de sortie :</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="from-date" className="text-xs text-slate-500 block mb-0.5">Du</label>
                        <input
                            type="date"
                            name="from-date"
                            id="from-date"
                            className="w-full py-1 px-2 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="to-date" className="text-xs text-slate-500 block mb-0.5">Au</label>
                        <input
                            type="date"
                            name="to-date"
                            id="to-date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full py-1 px-2 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            {/* Trier par */}
            <div className="border-b pb-2">
                <h3 className="font-medium text-slate-700 mb-1.5">Trier par</h3>
                <select
                    name="sort"
                    id="sort"
                    className="w-full py-1.5 px-2 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                    <option value="popularity.desc">Popularité</option>
                    <option value="vote_average.desc">Note</option>
                    <option value="vote_count.desc">Nombre de votes</option>
                </select>
            </div>

            {/* Contenus adultes */}
            <div className="border-b pb-2">
                <h3 className="font-medium text-slate-700 mb-1.5">Inclure des contenus adultes</h3>
                <select
                    name="include-adult"
                    id="include-adult"
                    className="w-full py-1.5 px-2 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                    <option value="false">Non</option>
                    <option value="true">Oui</option>
                </select>
            </div>

            {/* Bouton de recherche */}
            <button
                type="submit"
                id="button-filter"
                className="cursor-pointer w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 mt-2 text-sm font-medium"
            >
                Rechercher
            </button>
        </form>
    )
}

export default Form;