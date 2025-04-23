const dictionaries = {
    en: () => import("@/dictionaries/en.json").then(m => m.default),
    fr: () => import("@/dictionaries/fr.json").then(m => m.default),
}

export const getDictionaries = async (locale: "fr"|'en') => dictionaries[locale]()

