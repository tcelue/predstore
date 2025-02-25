export interface Event {
    id: number;
    title: string;
    probability: number;
    volume: string;
    image: string;
  }
  
  export interface EventCardProps {
    event: Event;
  }
  