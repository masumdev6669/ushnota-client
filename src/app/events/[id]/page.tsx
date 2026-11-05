"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "@/components/Toast";

import img1 from "@/assets/ph_61993_242126.jpg";
import img2 from "@/assets/ph_61993_242131.jpg";
import img3 from "@/assets/pict_large.jpg";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventsData: Record<string, any> = {
    "1": {
      title: "Winter Clothes Distribution - Mirpur",
      eventType: "Donation",
      thumbnail: img1,
      location: "Mirpur 10, Dhaka",
      eventDate: "2024-12-15T10:00:00.000Z",
      description:
        "Join us this winter as we distribute warm clothes and blankets to the underprivileged communities in Mirpur. Your small contribution can bring a smile to someone's face.",
    },
    "2": {
      title: "Blanket Distribution for the Needy",
      eventType: "Donation",
      thumbnail: img2,
      location: "Mohammadpur, Dhaka",
      eventDate: "2024-12-20T09:00:00.000Z",
      description:
        "Help us provide warm blankets to those sleeping on the streets. We are gathering at Mohammadpur to distribute thick blankets to the homeless.",
    },
    "3": {
      title: "Winter Food Drive",
      eventType: "Food",
      thumbnail: img3,
      location: "Dhanmondi, Dhaka",
      eventDate: "2024-12-25T11:00:00.000Z",
      description:
        "A warm meal can make a huge difference in winter. Join our food drive as we prepare and distribute hot meals to the needy in Dhanmondi.",
    },
  };

  const event = eventsData[id as string] || eventsData["1"];

  const handleJoin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setJoined(true);
      toast.success("Successfully joined the event!");
    }, 800);
  };

  return (
    <section className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
      <Link
        href="/events"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
      </Link>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <Badge className="bg-primary/10 text-primary mb-3">
                {event.eventType}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                {event.title}
              </h1>
            </div>
            <Button
              onClick={handleJoin}
              disabled={joined || loading}
              className={`rounded-full px-8 py-6 text-lg font-bold ${joined ? "bg-green-600 hover:bg-green-600 text-white cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
            >
              {loading
                ? "Joining..."
                : joined
                  ? "✅ Already Joined"
                  : "Join Event"}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground border-y py-4">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" /> {event.location}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />{" "}
              {new Date(event.eventDate).toLocaleString()}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">About this Event</h2>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
