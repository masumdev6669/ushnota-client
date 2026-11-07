"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Droplet,
  HeartPulse,
  ShieldCheck,
  MapPin,
  Calendar,
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import gallery1 from "@/assets/ph_61993_242126.jpg";
import gallery2 from "@/assets/ph_61993_242131.jpg";
import gallery3 from "@/assets/pict_large.jpg";

interface EventData {
  _id: string;
  title: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export default function HomePage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const gallery = [gallery1, gallery2, gallery3, gallery2];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchApi("/events/recent");
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-16 md:py-24 lg:py-32 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold bg-background">
            <Droplet className="mr-2 h-4 w-4 text-primary fill-primary" />
            Share the Warmth
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            Share Warmth, <span className="text-primary">Spread Love</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
            Ushnota connects neighbours who want to share warmth. Organise or
            join winter clothes, blanket and food distribution drives in your
            area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/events">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full px-8 text-lg w-full sm:w-auto"
              >
                Explore Drives
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-lg w-full sm:w-auto border-primary text-primary hover:bg-primary/5"
              >
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Ushnota?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              We make the process of organizing and joining winter drives
              seamless and impactful.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: <Droplet className="h-10 w-10 text-primary" />,
                t: "Donate Clothes",
                d: "Organize a winter clothes or blanket distribution drive in your area in minutes.",
              },
              {
                icon: <HeartPulse className="h-10 w-10 text-primary" />,
                t: "Join as Volunteer",
                d: "Discover local drives and register yourself as a helper.",
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                t: "Track Drives",
                d: "Manage your created drives and keep track of the events you've joined.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-4 border p-8 rounded-2xl shadow-sm card-hover bg-card"
              >
                <div className="p-4 bg-primary/10 rounded-full">{f.icon}</div>
                <h3 className="text-xl font-bold">{f.t}</h3>
                <p className="text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                Upcoming Camps
              </h2>
              <p className="text-muted-foreground mt-2">
                Find a winter relief drive near you.
              </p>
            </div>
            <Link href="/events">
              <Button variant="link" className="text-primary hidden sm:flex">
                View All →
              </Button>
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-background">
              <Droplet className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                No upcoming drives
              </h3>
              <p className="text-sm text-muted-foreground/70 mb-4">
                Be the first to create a drive in your area.
              </p>
              <Link href="/events/create">
                <Button className="bg-primary">Create an Event</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <div
                  key={e._id}
                  className="rounded-2xl border bg-card shadow-sm card-hover overflow-hidden flex flex-col"
                >
                  <img
                    src={e.thumbnail}
                    alt={e.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">
                      {e.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <MapPin className="mr-1 h-4 w-4 text-primary" />{" "}
                      {e.location}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary mb-4">
                      <Calendar className="mr-1 h-4 w-4" />{" "}
                      {new Date(e.eventDate).toLocaleDateString()}
                    </div>
                    <Link href={`/events/${e._id}`} className="mt-auto">
                      <Button className="w-full bg-primary rounded-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Moments of Hope
            </h2>
            <p className="text-muted-foreground mt-3">
              Glimpses of our community coming together to save lives.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((imgSrc, i) => (
              <div
                key={i}
                className="relative h-48 w-full rounded-xl overflow-hidden card-hover shadow-sm"
              >
                <Image
                  src={imgSrc}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join Our Caring Community
          </h2>
          <p className="max-w-[600px] text-primary-foreground/80 md:text-lg">
            Get notified about new distribution drives and volunteer calls. No
            spam, just warm updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black border-0 h-12"
            />
            <Button
              type="submit"
              className="bg-black hover:bg-black/80 text-white h-12 px-8 rounded-md"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
