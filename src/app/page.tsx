import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeartHandshake, Shirt, HandHeart, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold bg-background">
            <HeartHandshake className="mr-2 h-4 w-4 text-primary" />
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

      {/* Features Section */}
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
                icon: <Shirt className="h-10 w-10 text-primary" />,
                t: "Donate Clothes",
                d: "Organize a winter clothes or blanket distribution drive in your area in minutes.",
              },
              {
                icon: <HandHeart className="h-10 w-10 text-primary" />,
                t: "Join as Volunteer",
                d: "Discover local drives and register yourself as a helper.",
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
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

      {/* Newsletter Section */}
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
