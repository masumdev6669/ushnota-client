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
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Trash2, Edit } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { toast } from "@/components/Toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EVENT_TYPES = [
  "Winter Clothes Distribution",
  "Blanket Distribution",
  "Food Distribution",
  "Community Meal",
  "Winter Relief Camp",
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    eventDate: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const loadEvents = async () => {
    try {
      const data = await fetchApi("/events/mine");
      setEvents(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetchApi(`/events/${id}`, { method: "DELETE" });
      toast.success("Event deleted successfully");
      setEvents(events.filter((e) => e._id !== id));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete event");
    }
  };

  const handleEditClick = (event: any) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await fetchApi(`/events/${editingEvent._id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      toast.success("Event updated successfully");
      setEditingEvent(null);
      loadEvents();
    } catch (error: any) {
      toast.error(error.message || "Failed to update event");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading events...</div>;

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
                  onClick={() => handleEditClick(event)}
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

      <Dialog
        open={!!editingEvent}
        onOpenChange={(open) => !open && setEditingEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              required
              rows={3}
              className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <Input
              required
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <Input
              required
              placeholder="Thumbnail URL"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            />
            <Input
              type="datetime-local"
              required
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            />
            <Button
              type="submit"
              disabled={updateLoading}
              className="w-full bg-primary"
            >
              {updateLoading ? "Updating..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
