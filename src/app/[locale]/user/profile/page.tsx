import LogoutButton from "@/components/logout/LogoutButton";
import {Locale} from "@/types/locale";
import {getServerSession} from "next-auth";
import {getLikedMovies, unLikeMovie} from "@/utils/MovieClient";
import MediaCard from "@/components/media-card/MediaCard";
import {Movie} from "@/types/Movie";

type Props = {
    params: Promise<{ locale: Locale }>
}

const Profile = async ({ params } : Props) => {
    const { locale } = await params;
    // @ts-ignore
    const { user: userSession } = await getServerSession();

    const movies = await getLikedMovies(userSession.email, locale);
    
  return (
    <div>
        {
            userSession &&
            <>
                <h1>Bonjour {userSession.email} :</h1>
                <span>Vous avez {movies.length} films aimés</span>
            </>
        }
        <div className="flex overflow-x-auto gap-4">
            {
                movies.length > 0 &&
                movies.map((movie: Movie) => <MediaCard liked={true} key={movie.id} movie={movie} genres={[]} locale={locale} />)
            }
        </div>

        <LogoutButton/>
    </div>
  );
};

export default Profile;