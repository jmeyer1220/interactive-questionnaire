import ArchetypeQuiz from "../components/ArchetypeQuiz";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-72 relative">
      <div class="absolute inset-y-0 left-0 w-16"><h1 className="text-[300px] font-bold opacity-15 mb-4 rotate-90">BRAND</h1></div>
      <ArchetypeQuiz />
      <div class="absolute inset-y-0 right-0 w-16"><h1 className="text-[300px]  opacity-15font-bold mb-4 rotate-90">ARCHETYPE</h1></div>

    </div>
  );
}
