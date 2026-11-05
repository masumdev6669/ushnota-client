"use client";
import { useState } from "react";
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
import { MapPin, Calendar, Trash2, Edit } from "lucide-react";
import { toast } from "@/components/Toast";

const initialEvents = [
  {
    _id: "1",
    title: "Winter Clothes Distribution - Mirpur",
    eventType: "Clothes",
    thumbnail:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=80",
    location: "Mirpur 10, Dhaka",
    eventDate: "2024-12-15T10:00:00.000Z",
  },
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event._id !== id));
    toast.success("Event deleted successfully!");
  };

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-primary">Manage Events</h1>
          <p className="text-muted-foreground mt-2">
            Manage the events you have created.
          </p>
        </div>
        <Link href="/events/create">
          <Button className="bg-primary hover:bg-primary/90 rounded-full">
            Create New
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <h3 className="text-lg font-semibold text-muted-foreground">
            No events created yet
          </h3>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Create your first event to get started.
          </p>
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
              <CardFooter className="p-5 pt-0 flex gap-2">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5"
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => handleDelete(event._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
