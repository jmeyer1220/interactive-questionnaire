import ArchetypeQuiz from "../components/ArchetypeQuiz";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-28 relative">
      <div class="absolute inset-y-0 left-0 w-36 content-center"><h1 className="text-[300px] absolute font-bold opacity-15 rotate-90">BRAND</h1></div>
      <ArchetypeQuiz />
      <div class="absolute inset-y-0 right-0 w-36 content-center"><h1 className="text-[300px]  absolute opacity-15 font-bold rotate-90">ARCHETYPE</h1></div>

    </div>
  );
}
