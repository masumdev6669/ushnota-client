"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, HeartHandshake, User } from "lucide-react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const router = useRouter();
  const session = { user: null };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Ushnota Logo"
            width={120}
            height={80}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Upcoming Events
          </Link>
          <Link
            href="/about"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Right Side Icons & Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-full px-5 font-bold border-primary text-primary hover:bg-primary/10"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 font-bold">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
