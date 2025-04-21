import Popular from "@/components/popular/Popular";
import Genre from "@/components/genres/Genre";

export const revalidate = 86400;

export default function Home() {
  return (
    <div>
        <Popular />
        <Genre />
    </div>
  );
}
