import Link from "next/link";
import { HeartHandshake, Mail, MapPin, Phone } from "lucide-react";

const socialClass =
  "flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-primary"
          >
            <HeartHandshake className="h-7 w-7" />
            Ushnota
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ushnota connects neighbours who want to share warmth. Organise or
            join winter clothes, blanket and food distribution drives in your
            area.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-primary">
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link href="/events/create" className="hover:text-primary">
                Create an Event
              </Link>
            </li>
            <li>
              <Link href="/events/joined" className="hover:text-primary">
                Joined Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>House 12, Road 4, Mirpur 10, Dhaka 1216</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <span>+880 1700 000000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <span>hello@ushnota.org</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Get updates on new distribution drives and volunteer calls.
          </p>
          <div className="flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Ushnota on X"
              className={socialClass}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Ushnota on Facebook"
              className={socialClass}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-5 text-center text-sm text-muted-foreground">
        © 2024 Ushnota. Built for communities that look after each other.
      </div>
    </footer>
  );
}
