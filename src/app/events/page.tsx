"use client";
import { useEffect, useState } from "react";
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
import { fetchApi } from "@/lib/api";

interface EventData {
  _id: string;
  title: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchApi("/events");
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold text-primary">Loading events...</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">Upcoming Drives</h1>
        <p className="text-muted-foreground mt-2">
          Find a winter relief drive near you and join hands.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <h3 className="text-lg font-semibold text-muted-foreground">
            No upcoming events found
          </h3>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Be the first to create a drive.
          </p>
          <Link href="/events/create">
            <Button className="bg-primary rounded-full">Create an Event</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
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
