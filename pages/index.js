import ArchetypeQuiz from "../components/ArchetypeQuiz";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-28 relative">
<h1 className="text-[300px] absolute inset-y-0 -top-[17%] w-36 content-center font-bold opacity-5 rotate-90 -z-10 -left-[56px]">BRAND</h1>
      <ArchetypeQuiz />
<h1 className="text-[300px]  absolute inset-y-0 right-0  -top-[55%] w-36 content-center opacity-5 font-bold rotate-90 -z-10">ARCHETYPE</h1>
    </div>
  );
}
