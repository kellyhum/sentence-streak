import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { Landmark } from "lucide-react";
import { Swords } from "lucide-react";
import { LogIn } from "lucide-react";

export default function Navbar() {
    return (
        <div className="flex border-b py-2 px-5 justify-between items-center">
            <div>Sentence Streak</div>

            <nav className="flex gap-1">
                <Button variant="ghost" className="cursor-pointer">
                    <House />
                    <Link href="/">Dashboard</Link>
                </Button>

                <Button variant="ghost" className="cursor-pointer">
                    <Landmark />
                    <Link href="/wordbank">Word Bank</Link>
                </Button>

                <Button variant="ghost" className="cursor-pointer">
                    <Swords />
                    <Link href="/practice">Practice</Link>
                </Button>

                <Button variant="ghost" className="cursor-pointer">
                    <LogIn />
                    <Link href="/">Log in</Link>
                </Button>
            </nav>
        </div>
    );
}
