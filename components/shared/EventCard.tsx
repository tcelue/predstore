import { EventCardProps } from "@/lib/interfaces";

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
      <div className="flex items-center gap-3">
        <img src={event.image} alt="Event" className="w-12 h-12 rounded-full" />
        <h3 className="text-lg font-bold flex-1">{event.title}</h3>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-gray-600 text-sm">{event.volume}</span>
        <span className="text-lg font-bold text-green-500">{event.probability}%</span>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200">
          Buy Yes
        </button>
        <button className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">
          Buy No
        </button>
      </div>
    </div>
  );
}
