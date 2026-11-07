"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import { useSession, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Ushnota Logo"
            width={120}
            height={80}
            className="object-contain"
            priority
          />
        </Link>

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

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="h-10 w-10 animate-pulse bg-muted rounded-full"></div>
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer outline-none">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/events/manage")}
                  >
                    Manage Events
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/events/joined")}
                  >
                    Joined Events
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer text-primary font-semibold"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
