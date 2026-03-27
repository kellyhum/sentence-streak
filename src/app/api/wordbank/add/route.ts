import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseUtils";

export async function POST(request: NextRequest) {
    try {
        const { chinWord, pinyin, meaning, hsk } = await request.json();

        const data = {
            word: chinWord,
            pinyin,
            meaning,
            lvl: hsk,
        };

        const custom_id = Math.random().toString(36).substring(2, 8); // shorten the document id
        await db.collection("wordbank").doc(custom_id).set(data);

        return NextResponse.json({
            status: "success",
            msg: `${chinWord} added to database`,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
