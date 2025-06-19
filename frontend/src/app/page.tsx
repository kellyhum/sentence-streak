"use client";

import CustomCard from "@/components/CustomCard";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function Home() {
    const sampleStats = [
        {
            title: "Total Words",
            statistic: 42,
            desc: "+2 words added this week!",
        },
        {
            title: "High Score",
            statistic: 4,
            desc: "Consecutive sentences correct :)",
        },
        {
            title: "Games Played",
            statistic: 10,
            desc: "You're on a roll",
        },
        {
            title: "Streak (Days)",
            statistic: 2,
            desc: "Almost Duolingo level :O",
        },
    ];

    const sampleData = [
        { date: "June 14", highScore: 120, gamesPlayed: 5, totalWords: 300 },
        { date: "June 15", highScore: 135, gamesPlayed: 7, totalWords: 310 },
        { date: "June 16", highScore: 140, gamesPlayed: 4, totalWords: 315 },
        { date: "June 17", highScore: 145, gamesPlayed: 6, totalWords: 320 },
        { date: "June 18", highScore: 150, gamesPlayed: 8, totalWords: 330 },
        { date: "June 19", highScore: 155, gamesPlayed: 9, totalWords: 340 },
        {
            date: "June 20",
            highScore: 160,
            gamesPlayed: 10,
            totalWords: 350,
        },
    ];
    return (
        <div className="px-20 py-10">
            <h1 className="mb-10">Welcome back!</h1>

            <div className="flex justify-between mb-8 gap-2">
                {sampleStats.map((item) => (
                    <CustomCard
                        key={item.title}
                        title={item.title}
                        statistic={item.statistic}
                        desc={item.desc}
                        customClassName="hover:cursor-pointer"
                    />
                ))}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart width={400} height={400} data={sampleData}>
                    <defs>
                        <linearGradient id="games" x1="0" y1="0" x2="0" y2="1">
                            {/** at 5% have 0.8 opacity, 95% is transparent */}
                            <stop
                                offset="0%"
                                stopColor="#f18ec6"
                                stopOpacity={0.8}
                            />{" "}
                            <stop
                                offset="99%"
                                stopColor="#f18ec6"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="gamesPlayed"
                        stroke="#f18ec6"
                        fill="url(#games)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
