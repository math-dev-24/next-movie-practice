import { NextRequest, NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "./utils/i18n";
import { withAuth } from "next-auth/middleware";

// Middleware de base pour la redirection de locale
function baseMiddleware(request: NextRequest) {
    const newLocaleUrl = getLocaleUrlToRedirect(request);

    if (newLocaleUrl) {
        return NextResponse.redirect(newLocaleUrl);
    }
}

// Exporter le middleware avec authentication
export const middleware = withAuth(
    // Ajouter votre logique de base dans ce callback
    function middleware(request: NextRequest) {
        // Vérifier d'abord les redirections de locale
        const localeRedirect = baseMiddleware(request);
        if (localeRedirect) return localeRedirect;

        // Si aucune redirection de locale n'est nécessaire, continuer normalement
        return NextResponse.next();
    },
    {
        // Configuration pour withAuth (optionnel)
        // Vous pouvez spécifier les pages qui nécessitent une authentification
        callbacks: {
            authorized: ({ req, token }) => {
                // Appliquer l'authentification uniquement aux chemins /user
                if (req.nextUrl.pathname.includes("/user")) {
                    return !!token;
                }
                // Autoriser l'accès aux autres pages sans authentification
                return true;
            }
        }
    }
);

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};