import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { Input } from "./ui/input";
import { useEffect, useState } from "react";

interface gameInterface {
    chinWord: string;
    pinyin: string;
    answerStatus: "default" | "incorrect" | "correct";
    resetTimer: boolean;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNextQClicked: () => void;
}

const Game = ({
    chinWord,
    pinyin,
    answerStatus,
    resetTimer,
    onSubmit,
    onChange,
    onNextQClicked,
}: gameInterface) => {
    const [remainingSec, setRemainingSec] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingSec((prev) => {
                if (prev <= 0 || answerStatus === "incorrect") {
                    clearInterval(timer);
                    return 0;
                } else {
                    return (prev -= 20);
                }
            });
        }, 1000);

        return () => clearInterval(timer); // only clear on unmount
    }, [answerStatus]);

    useEffect(() => {
        setRemainingSec(100); // reset back to 100
    }, [resetTimer]);

    return (
        <Card className="flex items-center">
            <Progress className="w-1/2" value={remainingSec} />

            {remainingSec <= 0 || answerStatus === "incorrect" ? (
                <div className="flex flex-col justify-between h-30">
                    <CardContent className="flex flex-col items-center">
                        <CardDescription className="text-2xl font-bold">
                            Incorrect...
                        </CardDescription>

                        <CardDescription>
                            Better luck next time :(
                        </CardDescription>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                        <Button
                            className="cursor-pointer"
                            onClick={onNextQClicked}
                        >
                            Play Again
                        </Button>
                        <Button className="cursor-pointer">Dashboard</Button>
                    </CardFooter>
                </div>
            ) : (
                <>
                    <div className="text-center">
                        <h1>{chinWord}</h1>
                        <p>{pinyin}</p>
                    </div>

                    <CardContent>
                        <CardDescription>
                            <label htmlFor="sentence">Write a sentence:</label>
                            <Input
                                type="text"
                                id="sentence"
                                placeholder="Start typing..."
                                className="w-100"
                                onChange={onChange}
                            />
                        </CardDescription>
                    </CardContent>

                    <CardFooter>
                        {answerStatus === "correct" ? (
                            <Button
                                className="cursor-pointer bg-[#e69aab] text-black hover:text-gray-800 hover:bg-[#e88ca1]"
                                onClick={onNextQClicked}
                            >
                                Next Sentence
                            </Button>
                        ) : (
                            <Button
                                className="cursor-pointer"
                                onClick={onSubmit}
                            >
                                Submit Sentence
                            </Button>
                        )}
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default Game;
