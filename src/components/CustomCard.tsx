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
}

export default function CustomCard({
    title,
    statistic,
    desc,
}: CustomCardTypes) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <div>{title}</div>
                <CardTitle>{statistic}</CardTitle>
            </CardHeader>

            <CardContent>
                <CardDescription>{desc}</CardDescription>
            </CardContent>
        </Card>
    );
}
