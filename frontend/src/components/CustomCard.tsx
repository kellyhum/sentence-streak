import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface CustomCardTypes {
    title: string;
    statistic: number;
    desc: string;
    customClassName: string;
}

export default function CustomCard({
    title,
    statistic,
    desc,
    customClassName,
}: CustomCardTypes) {
    return (
        <Card className={`${customClassName} w-[350px]`}>
            <CardHeader>
                <div className="text-sm">{title}</div>
                <CardTitle className="text-2xl">{statistic}</CardTitle>
            </CardHeader>

            <CardContent>
                <CardDescription>{desc}</CardDescription>
            </CardContent>
        </Card>
    );
}
