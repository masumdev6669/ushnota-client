import { HeartHandshake, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
          <HeartHandshake className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold text-primary">About Ushnota</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ushnota is a community-driven platform dedicated to connecting
          compassionate volunteers with those in need during the harsh winter
          months.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p>
            Every winter, thousands of underprivileged people suffer from the
            cold. Our mission is to bridge the gap between those who want to
            help and those who need warmth. We believe that a small act of
            kindness—like donating a blanket or a warm meal—can make a massive
            difference.
          </p>
          <p>
            Through Ushnota, we make organizing and joining winter relief drives
            seamless, transparent, and impactful.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4 items-start bg-card p-6 rounded-xl border shadow-sm">
            <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                We ensure every donation and drive is tracked and verified.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-card p-6 rounded-xl border shadow-sm">
            <Users className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Community First</h3>
              <p className="text-sm text-muted-foreground">
                Built by the community, for the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
