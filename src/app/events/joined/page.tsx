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
import { toast } from "@/components/Toast";

export default function JoinedEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJoinedEvents = async () => {
      try {
        const data = await fetchApi("/joins/mine");
        setEvents(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load joined events");
      } finally {
        setLoading(false);
      }
    };
    loadJoinedEvents();
  }, []);

  if (loading) {
    return (
      <div className="p-20 text-center text-xl font-semibold">
        Loading joined events...
      </div>
    );
  }

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">Joined Events</h1>
        <p className="text-muted-foreground mt-2">
          Events you have registered to volunteer for.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <h3 className="text-lg font-semibold text-muted-foreground">
            No joined events
          </h3>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Explore events and join a cause.
          </p>
          <Link href="/events">
            <Button className="bg-primary rounded-full">Explore Events</Button>
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
