"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import WordRow from "@/components/WordRow";

import { useEffect, useState } from "react";
import axios from "axios";

type Word = {
    word: string;
    pinyin: string;
    meaning: string;
    lvl: string;
    id: string;
};

export default function WordBank() {
    const [chinWord, setChinWord] = useState("");
    const [pinyin, setPinyin] = useState("");
    const [meaning, setMeaning] = useState("");
    const [hsk, setHsk] = useState("");
    const [wordsFromDB, setWordsFromDB] = useState<Word[]>([]);
    const [wordPosted, setWordPosted] = useState(false);

    useEffect(() => {
        const getWords = async () => {
            const res = await axios.get(
                "http://127.0.0.1:5000/wordbank/getWords"
            );

            const data = res.data;

            setWordsFromDB(data);
        };

        getWords();
    }, [wordPosted]);

    const deleteWord = async (doc_id: string) => {
        const res = await axios.delete(
            `http://127.0.0.1:5000/wordbank/delete/${doc_id}`
        );

        // update word list
        const data = res.data;

        if (data.status == "success") {
            console.log(data.msg);
            setWordPosted((oldVal) => !oldVal); // triggers the useEffect
        }
    };

    const addWord = async () => {
        const res = await axios.post("http://127.0.0.1:5000/wordbank/add", {
            chinWord,
            pinyin,
            meaning,
            hsk,
        });

        const data = res.data;

        console.log(data);

        if (data.status) {
            // reset
            setChinWord("");
            setPinyin("");
            setMeaning("");
            setHsk("");

            setWordPosted((oldVal) => !oldVal); // triggers the useEffect
        }
    };

    return (
        <div className="px-20 py-10">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1>Word Bank</h1>
                    <div>
                        Total words: {wordsFromDB ? wordsFromDB.length : 0}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Input type="search" placeholder="Search words..." />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="cursor-pointer">
                                <Plus />
                                Add Word
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Word</DialogTitle>
                                <DialogDescription>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <label
                                                htmlFor="word"
                                                className="text-sm font-medium"
                                            >
                                                Chinese Word
                                            </label>
                                            <Input
                                                id="word"
                                                placeholder="你好"
                                                value={chinWord}
                                                onChange={(e) =>
                                                    setChinWord(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <label
                                                htmlFor="pinyin"
                                                className="text-sm font-medium"
                                            >
                                                Pinyin
                                            </label>
                                            <Input
                                                id="pinyin"
                                                placeholder="ni3 hao3"
                                                value={pinyin}
                                                onChange={(e) =>
                                                    setPinyin(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <label
                                                htmlFor="meaning"
                                                className="text-sm font-medium"
                                            >
                                                Meaning
                                            </label>
                                            <Input
                                                id="meaning"
                                                placeholder="Hello"
                                                value={meaning}
                                                onChange={(e) =>
                                                    setMeaning(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <label
                                                htmlFor="level"
                                                className="text-sm font-medium"
                                            >
                                                Difficulty Level
                                            </label>
                                            <Select
                                                onValueChange={(value) =>
                                                    setHsk(value)
                                                }
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="HSK __" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hsk1">
                                                        HSK 1
                                                    </SelectItem>
                                                    <SelectItem value="hsk2">
                                                        HSK 2
                                                    </SelectItem>
                                                    <SelectItem value="hsk3">
                                                        HSK 3
                                                    </SelectItem>
                                                    <SelectItem value="hsk4">
                                                        HSK 4
                                                    </SelectItem>
                                                    <SelectItem value="hsk5">
                                                        HSK 5
                                                    </SelectItem>
                                                    <SelectItem value="hsk6">
                                                        HSK 6
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={addWord}
                                    className="cursor-pointer"
                                >
                                    Add Word
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="border">
                <div
                    id="heading-row"
                    className="grid grid-cols-12 gap-4 p-4 bg-pink-100 font-medium"
                >
                    <div className="col-span-3">Chinese</div>
                    <div className="col-span-3">Pinyin</div>
                    <div className="col-span-3">Meaning</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-1"></div>
                </div>

                <div>
                    {wordsFromDB.length > 0 ? (
                        wordsFromDB.map((word) => (
                            <WordRow
                                key={word.word}
                                chinWord={word.word}
                                pinyin={word.pinyin}
                                meaning={word.meaning}
                                level={word.lvl}
                                onDelete={() => deleteWord(word.id)}
                            />
                        ))
                    ) : (
                        <div className="p-10 text-center">
                            {
                                "No words in the database. Add words and they'll show up here!"
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
