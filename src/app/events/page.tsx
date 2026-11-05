import Link from "next/link";
import Image from "next/image";
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

import img1 from "@/assets/ph_61993_242126.jpg";
import img2 from "@/assets/ph_61993_242131.jpg";
import img3 from "@/assets/pict_large.jpg";

const dummyEvents = [
  {
    _id: "1",
    title: "Winter Clothes Distribution - Mirpur",
    eventType: "Donation",
    thumbnail: img1,
    location: "Mirpur 10, Dhaka",
    eventDate: "2024-12-15T10:00:00.000Z",
  },
  {
    _id: "2",
    title: "Blanket Distribution for the Needy",
    eventType: "Donation",
    thumbnail: img2,
    location: "Mohammadpur, Dhaka",
    eventDate: "2024-12-20T09:00:00.000Z",
  },
  {
    _id: "3",
    title: "Winter Food Drive",
    eventType: "Food",
    thumbnail: img3,
    location: "Dhanmondi, Dhaka",
    eventDate: "2024-12-25T11:00:00.000Z",
  },
];

export default function EventsPage() {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">Upcoming Drives</h1>
        <p className="text-muted-foreground mt-2">
          Find a winter relief drive near you and join hands.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyEvents.map((event) => (
          <Card
            key={event._id}
            className="overflow-hidden card-hover flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                className="object-cover"
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
    </section>
  );
}
