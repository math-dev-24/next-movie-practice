import SignupForm from "@/components/signup-form/SignupForm";
import {Locale} from "@/types/locale";

type Props = {
    params: Promise<{ locale: Locale }>
}


const Signup = async ({ params }: Props) => {

    const { locale } = await params;

    return <SignupForm locale={locale} />;
};

export default Signup;