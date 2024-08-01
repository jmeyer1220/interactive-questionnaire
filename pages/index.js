import ArchetypeQuiz from "../components/ArchetypeQuiz";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-72 max-h-dvh relative">
<div class="relative h-32 w-32">
        <div class="absolute inset-y-0 left-0 w-16"><h1 className="text-6xl font-bold mb-4 rotate-90">BRAND</h1></div>

<div class="absolute inset-y-0 right-0 w-16"><h1 className="text-6xl  font-bold mb-4 rotate-90">ARCHETYPE</h1></div>
      <ArchetypeQuiz />
    </div>
  );
}
