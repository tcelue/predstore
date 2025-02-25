import Image from "next/image";
import EventsList from "@/components/shared/EventCardList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">热门预测</h1>
        <EventsList />
      </div>
    </main>
  );
}
