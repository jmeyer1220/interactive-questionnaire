import ArchetypeQuiz from "../components/ArchetypeQuiz";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-28 relative">
<h1 className="text-[300px] absolute inset-y-0 left-0 top-0 w-36 content-center font-bold opacity-15 rotate-90 -z-10">BRAND</h1>
      <ArchetypeQuiz />
<h1 className="text-[300px]  absolute inset-y-0 right-0  top-0 w-36 content-center opacity-15 font-bold rotate-90 -z-10">ARCHETYPE</h1>
    </div>
  );
}
