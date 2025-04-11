import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Practice() {
    return (
        <div className="px-20 py-10">
            <div className="mb-10">
                <h1>Practice</h1>
                <div>Think "Pass the Bomb" except in another language...</div>
            </div>

            <Card className="flex items-center">
                <h1>How to Play</h1>

                <CardContent>
                    <CardDescription>
                        <p>1. A Chinese phrase/word will be displayed!</p>
                        <p>
                            2. Write a grammatically correct sentence using the
                            word
                        </p>
                        <p>
                            3. Submit - if your sentence isn't gramatically
                            correct, you'll have to redo it :/
                        </p>
                        <p>
                            4. Every correct sentence adds to your streak and
                            resets the timer - try to get the highest score!
                        </p>
                    </CardDescription>
                </CardContent>

                <CardFooter>
                    <Button className="cursor-pointer">Start Game</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
