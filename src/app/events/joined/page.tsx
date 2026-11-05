"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

const joinedEvents = [
  {
    _id: "2",
    title: "Blanket Distribution for the Needy",
    eventType: "Blanket",
    thumbnail:
      "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=600&q=80",
    location: "Mohammadpur, Dhaka",
    eventDate: "2024-12-20T09:00:00.000Z",
  },
  {
    _id: "3",
    title: "Winter Food Drive",
    eventType: "Food",
    thumbnail:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    location: "Dhanmondi, Dhaka",
    eventDate: "2024-12-25T11:00:00.000Z",
  },
];

export default function JoinedEventsPage() {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">Joined Events</h1>
        <p className="text-muted-foreground mt-2">
          Events you have registered to volunteer for.
        </p>
      </div>

      {joinedEvents.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <h3 className="text-lg font-semibold text-muted-foreground">
            No joined events
          </h3>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Explore events and join a cause.
          </p>
          <Link href="/events">
            <Button className="bg-primary">Explore Events</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedEvents.map((event) => (
            <Card
              key={event._id}
              className="overflow-hidden card-hover flex flex-col"
            >
              <div className="relative h-48 w-full">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="p-5 pb-2">
                <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 mb-2">
                  {event.eventType}
                </Badge>
                <CardTitle className="text-lg line-clamp-1">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-grow space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4 text-primary" />{" "}
                  {event.location}
                </div>
                <div className="flex items-center text-sm font-semibold text-primary">
                  <Calendar className="mr-1 h-4 w-4" />{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link href={`/events/${event._id}`} className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
