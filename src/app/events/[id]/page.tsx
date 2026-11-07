"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "@/components/Toast";
import { fetchApi } from "@/lib/api";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joinLoading, setJoinLoading] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchApi(`/events/${id}`);
        setEvent(data);

        const token = localStorage.getItem("token");
        if (token) {
          const status = await fetchApi(`/joins/status/${id}`);
          setJoined(status.joined);
        }
      } catch (error) {
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  const handleJoin = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to join this event");
      return router.push("/login");
    }

    setJoinLoading(true);
    try {
      await fetchApi(`/joins`, {
        method: "POST",
        body: JSON.stringify({ eventId: id }),
      });
      setJoined(true);
      toast.success("Successfully joined the event!");
    } catch (error: any) {
      toast.error(error.message || "Failed to join");
    } finally {
      setJoinLoading(false);
    }
  };

  if (loading)
    return <div className="p-20 text-center">Loading details...</div>;
  if (!event) return <div className="p-20 text-center">Event not found</div>;

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
          <img
            src={event.thumbnail}
            alt={event.title}
            className="object-cover w-full h-full"
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
              disabled={joined || joinLoading}
              className={`rounded-full px-8 py-6 text-lg font-bold ${joined ? "bg-green-600 hover:bg-green-600 text-white cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
            >
              {joinLoading
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
