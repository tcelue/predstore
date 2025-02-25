import { Event } from "@/lib/interfaces";
import EventCard from "@/components/shared/EventCard";

export default function EventsList() {
  const events: Event[] = [
    {
      id: 1,
      title: "中国GDP增长超过5%?",
      probability: 75,
      volume: "$5M Vol.",
      image: "/event1.WEBP",
    },
    {
      id: 2,
      title: "比特币价格突破10万美元?",
      probability: 60,
      volume: "$3M Vol.",
      image: "/event2.WEBP",
    },
    {
      id: 3,
      title: "香港楼市在明年复苏?",
      probability: 45,
      volume: "$2M Vol.",
      image: "/event3.WEBP",
    },
    {
      id: 4,
      title: "特斯拉股价突破1200美元?",
      probability: 50,
      volume: "$6M Vol.",
      image: "/event4.WEBP",
    },
    {
      id: 5,
      title: "美联储将在下一季度降息?",
      probability: 40,
      volume: "$4M Vol.",
      image: "/event5.WEBP",
    },
    {
      id: 6,
      title: "中国将登月建立科研基地?",
      probability: 65,
      volume: "$7M Vol.",
      image: "/event6.WEBP",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
