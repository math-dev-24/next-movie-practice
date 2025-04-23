"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useCurrentLanguage } from "@/hook/useCurrentLanguage";
import { usePathname } from "next/navigation";

const LanguageSelector = () => {
    // Hooks appelés au niveau supérieur du composant
    const currentLanguage = useCurrentLanguage();
    const currentPath = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(currentLanguage);

    const getUrl = (code: string): string => {
        const pathParts = currentPath.split('/');

        // Vérifier si le premier segment est un code de langue
        if (languages.some(lang => lang.code === pathParts[1])) {
            // Si oui, remplacer le code de langue
            pathParts[1] = code;
        } else {
            // Si non, ajouter le code de langue au début
            pathParts.splice(1, 0, code);
        }

        return pathParts.join('/');
    };

    const languages = [
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
    ];

    // Update selected language when currentLanguage changes
    useEffect(() => {
        setSelected(currentLanguage);
    }, [currentLanguage]);

    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Globe size={16} />
                <span>{languages.find(lang => lang.code === selected)?.label || "English"}</span>
                <svg
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                        {languages.map((language) => (
                            <Link
                                key={language.code}
                                href={getUrl(language.code)} // Utiliser la fonction getUrl ici
                                className={`block px-4 py-2 text-sm ${
                                    selected === language.code
                                        ? "bg-blue-50 text-blue-700 font-medium"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                    setSelected(language.code);
                                    setIsOpen(false);
                                }}
                            >
                                {language.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;