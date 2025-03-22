import CustomCard from "@/components/CustomCard";

export default function Home() {
    let sampleStats = [
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
    return (
        <div>
            <div className="px-20 py-10">
                <h1 className="mb-10">Good afternoon Kelly!</h1>

                <div className="flex gap-2">
                    {sampleStats.map((item) => (
                        <CustomCard
                            key={item.title}
                            title={item.title}
                            statistic={item.statistic}
                            desc={item.desc}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
