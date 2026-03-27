import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export type answerStatusType = "default" | "incorrect" | "correct";
interface gameInterface {
    chinWord: string;
    pinyin: string;
    answerStatus: answerStatusType;
    resetTimer: boolean;
    inputSentence: string;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNextQClicked: () => void;
}

const Game = ({
    chinWord,
    pinyin,
    answerStatus,
    resetTimer,
    inputSentence,
    onSubmit,
    onChange,
    onNextQClicked,
}: gameInterface) => {
    const [remainingSec, setRemainingSec] = useState(100);

    useEffect(() => {
        if (answerStatus !== "default") {
            return;
        }

        const timer = setInterval(() => {
            setRemainingSec((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 2.5;
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

                        <Button className="cursor-pointer">
                            <Link href="/">Dashboard</Link>
                        </Button>
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
                                value={inputSentence}
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
