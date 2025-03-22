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
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function WordBank() {
    return (
        <div className="px-20 py-10">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1>Word Bank</h1>
                    <div>Total words: 1</div>
                </div>

                <div className="flex gap-2">
                    <Input type="search" placeholder="Search words..." />
                    <Dialog>
                        <DialogTrigger>
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
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <label
                                                htmlFor="level"
                                                className="text-sm font-medium"
                                            >
                                                Difficulty Level
                                            </label>
                                            {/** put a dropdown select here */}
                                        </div>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Add Word</Button>
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
                    <div
                        id="row"
                        className="grid grid-cols-12 gap-4 p-4 border-t"
                    >
                        <div className="col-span-3">你好</div>
                        <div className="col-span-3">ni3 hao3</div>
                        <div className="col-span-3">Hello</div>
                        <div className="col-span-2">HSK 1...?</div>
                        <div className="col-span-1">
                            <Button variant="ghost" className="cursor-pointer">
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
