import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WordRowInterface {
    chinWord: string;
    pinyin: string;
    meaning: string;
    level: string;
    onDelete: () => void;
}

const WordRow = ({
    chinWord,
    pinyin,
    meaning,
    level,
    onDelete,
}: WordRowInterface) => {
    return (
        <div
            id="row"
            className="grid grid-cols-12 gap-4 p-4 border-t items-center"
        >
            <div className="col-span-3">{chinWord}</div>
            <div className="col-span-3">{pinyin}</div>
            <div className="col-span-3">{meaning}</div>
            <div className="col-span-2">{level}</div>
            <div className="col-span-1">
                <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={onDelete}
                >
                    <Trash2 />
                </Button>
            </div>
        </div>
    );
};

export default WordRow;
