"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import Game from "@/components/Game";

export default function Practice() {
    const [readyToPlay, setReadyToPlay] = useState(false);
    const [randomWord, setRandomWord] = useState("");
    const [randomPinyin, setRandomPinyin] = useState("");
    const [inputSentence, setInputSentence] = useState("");
    const [displaySuccessDiv, setDisplaySuccessDiv] = useState(false);
    const [llmMsg, setLLMMsg] = useState("");
    const [resetGameTimer, setResetGameTimer] = useState(false);

    const getARandomWord = async () => {
        const res = await axios.get(
            "http://127.0.0.1:5000/practice/getRandomWord"
        );
        const data = res.data;

        if (data.status == "success") {
            setRandomWord(data.word.word);
            setRandomPinyin(data.word.pinyin);
        } else {
            console.log(data.msg);
        }
    };

    const getNextQuestion = () => {
        setInputSentence("");

        setLLMMsg("");
        setDisplaySuccessDiv(false);

        setResetGameTimer(true);

        getARandomWord();
    };

    const checkAnswer = async () => {
        const res = await axios.post(
            "http://127.0.0.1:5000/practice/checkSentence",
            {
                randomWord,
                inputSentence,
            }
        );
        const data = res.data;

        if (data) {
            // error exception handling later
            setLLMMsg(data);
            setDisplaySuccessDiv(true);
        }
    };

    useEffect(() => {
        getARandomWord();
    }, [readyToPlay]);

    return (
        <div className="px-20 py-10">
            <div className="mb-10">
                <h1>Practice</h1>
                <div>
                    {'Think "Pass the Bomb" except in another language...'}
                </div>
            </div>

            {readyToPlay == false ? (
                <Card className="flex items-center">
                    <h1>How to Play</h1>

                    <CardContent>
                        <CardDescription>
                            <p>1. A Chinese phrase/word will be displayed!</p>
                            <p>
                                2. Write a grammatically correct sentence using
                                the word
                            </p>
                            <p>
                                {
                                    "3. Submit - if your sentence isn't gramatically correct, you'll have to redo it :/"
                                }
                            </p>
                            <p>
                                4. Every correct sentence adds to your streak
                                and resets the timer - try to get the highest
                                score!
                            </p>
                        </CardDescription>
                    </CardContent>

                    <CardFooter>
                        <Button
                            className="cursor-pointer"
                            onClick={() => setReadyToPlay(true)}
                        >
                            Start Game
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Game
                    chinWord={randomWord}
                    pinyin={randomPinyin}
                    answerStatus={
                        llmMsg.includes("Not correct")
                            ? "incorrect"
                            : llmMsg.includes("Grammatically correct!")
                            ? "correct"
                            : "default"
                    }
                    resetTimer={resetGameTimer}
                    onSubmit={checkAnswer}
                    onChange={(e) => setInputSentence(e.target.value)}
                    onNextQClicked={getNextQuestion}
                />
            )}

            {displaySuccessDiv && (
                <div
                    className={`mt-5 p-5 ${
                        llmMsg.includes("Grammatically correct!")
                            ? "bg-green-200"
                            : "bg-red-200"
                    }  rounded-md>{llmMsg}`}
                >
                    {llmMsg}
                </div>
            )}
        </div>
    );
}
