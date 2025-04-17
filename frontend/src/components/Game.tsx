import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

interface gameInterface {
    chinWord: string;
    pinyin: string;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Game = ({ chinWord, pinyin, onSubmit, onChange }: gameInterface) => {
    return (
        <Card className="flex items-center">
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
                <Button className="cursor-pointer" onClick={onSubmit}>
                    Submit Sentence
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Game;
