import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseUtils";

export async function GET() {
    try {
        const snapshot = await db.collection("wordbank").get();
        const docIds = snapshot.docs.map((doc) => doc.id);

        if (docIds.length === 0) {
            return NextResponse.json({
                status: "failed",
                msg: "No words in wordbank",
            });
        }

        const randomIdx = docIds[Math.floor(Math.random() * docIds.length)];
        const randomDoc = await db.collection("wordbank").doc(randomIdx).get();

        if (!randomDoc.exists) {
            return NextResponse.json({
                status: "failed",
                msg: "Word not found",
            });
        }

        const word = { ...randomDoc.data(), id: randomDoc.id };

        return NextResponse.json({
            status: "success",
            word,
        });
    } catch (error: any) {
        return NextResponse.json({ status: "failed", msg: error.message });
    }
}
