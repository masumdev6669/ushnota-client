"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/Toast";
import { PlusCircle } from "lucide-react";

const EVENT_TYPES = [
  "Winter Clothes Distribution",
  "Blanket Distribution",
  "Food Distribution",
  "Community Meal",
  "Winter Relief Camp",
];

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "Winter Clothes Distribution",
    thumbnail: "",
    location: "",
    eventDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(form.eventDate) <= new Date()) {
      return toast.error("Event date must be in the future");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      toast.success("Event created successfully!");
      router.push("/events");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-2xl shadow-lg border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <PlusCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Create New Event
          </CardTitle>
          <CardDescription>
            Fill in the details below to organize a new drive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input
                  required
                  placeholder="Winter Clothes Distribution"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide details about the event..."
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <select
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={form.eventType}
                  onChange={(e) =>
                    setForm({ ...form, eventType: e.target.value })
                  }
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  required
                  placeholder="Mirpur 10, Dhaka"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Thumbnail Image URL
                </label>
                <Input
                  required
                  placeholder="https://example.com/image.jpg"
                  value={form.thumbnail}
                  onChange={(e) =>
                    setForm({ ...form, thumbnail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Event Date & Time</label>
                <Input
                  type="datetime-local"
                  required
                  value={form.eventDate}
                  onChange={(e) =>
                    setForm({ ...form, eventDate: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Must be a future date.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 mt-6 rounded-full py-6 text-lg"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
